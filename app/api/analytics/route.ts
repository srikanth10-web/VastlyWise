import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

const trackEventSchema = z.object({
  page: z.string(),
  action: z.string(),
  metadata: z.record(z.any()).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const page = searchParams.get('page')
    const action = searchParams.get('action')

    // Build where clause
    const where: any = {}
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }
    if (page) where.page = page
    if (action) where.action = action

    // Get analytics data
    const [analytics, totalEvents, pageStats, actionStats] = await Promise.all([
      prisma.analytics.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      }),
      prisma.analytics.count({ where }),
      prisma.analytics.groupBy({
        by: ['page'],
        where,
        _count: {
          page: true
        },
        orderBy: {
          _count: {
            page: 'desc'
          }
        }
      }),
      prisma.analytics.groupBy({
        by: ['action'],
        where,
        _count: {
          action: true
        },
        orderBy: {
          _count: {
            action: 'desc'
          }
        }
      })
    ])

    // Calculate summary statistics
    const summary = {
      totalEvents,
      uniquePages: pageStats.length,
      uniqueActions: actionStats.length,
      topPages: pageStats.slice(0, 5),
      topActions: actionStats.slice(0, 5),
    }

    return NextResponse.json({
      success: true,
      data: {
        analytics,
        summary
      }
    })

  } catch (error) {
    console.error('Error fetching analytics:', error)
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()
    const validatedData = trackEventSchema.parse(body)

    // Create analytics entry
    const analytics = await prisma.analytics.create({
      data: {
        userId: user.id,
        page: validatedData.page,
        action: validatedData.action,
        metadata: validatedData.metadata ? JSON.stringify(validatedData.metadata) : null,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully',
      data: analytics
    })

  } catch (error) {
    console.error('Error tracking event:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed', 
          errors: error.errors.reduce((acc, err) => {
            acc[err.path[0]] = err.message
            return acc
          }, {} as Record<string, string>)
        },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to track event' },
      { status: 500 }
    )
  }
} 