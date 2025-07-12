import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { getCurrentUser, requireAuth } from "@/lib/auth"

const updatePostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          }
        },
        categories: true,
        tags: true,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: post
    })

  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()
    const validatedData = updatePostSchema.parse(body)

    // Check if post exists and user has permission
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
      include: { author: true }
    })

    if (!existingPost) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      )
    }

    // Only author or admin can edit
    if (existingPost.authorId !== user.id && !user.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Check if new slug already exists (if slug is being updated)
    if (validatedData.slug && validatedData.slug !== existingPost.slug) {
      const slugExists = await prisma.post.findUnique({
        where: { slug: validatedData.slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { success: false, message: 'A post with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Update post
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        publishedAt: validatedData.status === 'PUBLISHED' && !existingPost.publishedAt 
          ? new Date() 
          : existingPost.publishedAt,
        categories: validatedData.categoryIds ? {
          set: validatedData.categoryIds.map(id => ({ id }))
        } : undefined,
        tags: validatedData.tagIds ? {
          set: validatedData.tagIds.map(id => ({ id }))
        } : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          }
        },
        categories: true,
        tags: true,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    })

  } catch (error) {
    console.error('Error updating post:', error)
    
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
      { success: false, message: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(request)

    // Check if post exists and user has permission
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
      include: { author: true }
    })

    if (!existingPost) {
      return NextResponse.json(
        { success: false, message: 'Post not found' },
        { status: 404 }
      )
    }

    // Only author or admin can delete
    if (existingPost.authorId !== user.id && !user.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Delete post (cascade will handle related data)
    await prisma.post.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting post:', error)
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to delete post' },
      { status: 500 }
    )
  }
} 