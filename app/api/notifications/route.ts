import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAuth, requireAdmin } from "@/lib/auth"

const createNotificationSchema = z.object({
  userId: z.string(),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  type: z.enum(['INFO', 'SUCCESS', 'WARNING', 'ERROR']).default('INFO'),
})

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    const type = searchParams.get('type')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = { userId: user.id }
    if (unreadOnly) where.isRead = false
    if (type) where.type = type

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { userId: user.id, isRead: false } })
    ])

    return NextResponse.json({
      success: true,
      data: notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      unreadCount
    })

  } catch (error) {
    console.error('Error fetching notifications:', error)
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    const body = await request.json()
    const validatedData = createNotificationSchema.parse(body)

    // Verify user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: validatedData.userId }
    })

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    // Create notification
    const notification = await prisma.notification.create({
      data: {
        userId: validatedData.userId,
        title: validatedData.title,
        message: validatedData.message,
        type: validatedData.type,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Notification created successfully',
      data: notification
    })

  } catch (error) {
    console.error('Error creating notification:', error)
    
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

    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create notification' },
      { status: 500 }
    )
  }
} 