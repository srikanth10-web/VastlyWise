import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // days

    const daysAgo = new Date()
    daysAgo.setDate(daysAgo.getDate() - parseInt(period))

    // Get basic counts
    const [
      totalUsers,
      totalPosts,
      totalCategories,
      totalTags,
      totalUploads,
      totalNotifications,
      recentPosts,
      recentUsers,
      recentAnalytics,
      postStats,
      userStats,
      topCategories,
      topTags
    ] = await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
      prisma.category.count(),
      prisma.tag.count(),
      prisma.fileUpload.count(),
      prisma.notification.count({ where: { userId: user.id, isRead: false } }),
      
      // Recent posts
      prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              username: true,
              firstName: true,
              lastName: true,
            }
          }
        }
      }),
      
      // Recent users
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        }
      }),
      
      // Recent analytics
      prisma.analytics.findMany({
        where: {
          createdAt: { gte: daysAgo }
        },
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              username: true,
              firstName: true,
              lastName: true,
            }
          }
        }
      }),
      
      // Post statistics
      prisma.post.groupBy({
        by: ['status'],
        _count: {
          status: true
        }
      }),
      
      // User statistics (new users in period)
      prisma.user.count({
        where: {
          createdAt: { gte: daysAgo }
        }
      }),
      
      // Top categories by post count
      prisma.category.findMany({
        take: 5,
        include: {
          _count: {
            select: {
              posts: true
            }
          }
        },
        orderBy: {
          posts: {
            _count: 'desc'
          }
        }
      }),
      
      // Top tags by post count
      prisma.tag.findMany({
        take: 5,
        include: {
          _count: {
            select: {
              posts: true
            }
          }
        },
        orderBy: {
          posts: {
            _count: 'desc'
          }
        }
      })
    ])

    // Calculate analytics summary
    const analyticsSummary = {
      totalEvents: recentAnalytics.length,
      uniquePages: new Set(recentAnalytics.map((a: any) => a.page)).size,
      uniqueActions: new Set(recentAnalytics.map((a: any) => a.action)).size,
      topPages: recentAnalytics.reduce((acc: Record<string, number>, event: any) => {
        acc[event.page] = (acc[event.page] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      topActions: recentAnalytics.reduce((acc: Record<string, number>, event: any) => {
        acc[event.action] = (acc[event.action] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }

    // Convert post stats to object
    const postStatusStats = postStats.reduce((acc: Record<string, number>, stat: any) => {
      acc[stat.status.toLowerCase()] = stat._count.status
      return acc
    }, {} as Record<string, number>)

    const dashboardData = {
      overview: {
        totalUsers,
        totalPosts,
        totalCategories,
        totalTags,
        totalUploads,
        unreadNotifications: totalNotifications,
        newUsersInPeriod: userStats,
      },
      recent: {
        posts: recentPosts,
        users: recentUsers,
        analytics: recentAnalytics,
      },
      statistics: {
        postStatus: postStatusStats,
        analytics: analyticsSummary,
        topCategories: topCategories.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          postCount: cat._count.posts
        })),
        topTags: topTags.map((tag: any) => ({
          id: tag.id,
          name: tag.name,
          postCount: tag._count.posts
        }))
      }
    }

    return NextResponse.json({
      success: true,
      data: dashboardData
    })

  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
} 