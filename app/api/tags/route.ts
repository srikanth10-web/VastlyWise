import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth"

const createTagSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const includePosts = searchParams.get('includePosts') === 'true'

    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ]
    } : {}

    const tags = await prisma.tag.findMany({
      where,
      include: includePosts ? {
        posts: {
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
          }
        },
        _count: {
          select: {
            posts: true
          }
        }
      } : {
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({
      success: true,
      data: tags
    })

  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()
    const validatedData = createTagSchema.parse(body)

    // Check if tag already exists
    const existingTag = await prisma.tag.findFirst({
      where: {
        OR: [
          { name: validatedData.name },
          { slug: validatedData.slug }
        ]
      }
    })

    if (existingTag) {
      return NextResponse.json(
        { success: false, message: 'A tag with this name or slug already exists' },
        { status: 400 }
      )
    }

    // Create tag
    const tag = await prisma.tag.create({
      data: {
        name: validatedData.name,
        slug: validatedData.slug,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Tag created successfully',
      data: tag
    })

  } catch (error) {
    console.error('Error creating tag:', error)
    
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
      { success: false, message: 'Failed to create tag' },
      { status: 500 }
    )
  }
} 