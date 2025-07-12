import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

const updateSettingSchema = z.object({
  key: z.string(),
  value: z.string(),
  type: z.enum(['string', 'number', 'boolean', 'json']).default('string'),
})

export async function GET(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (key) {
      // Get specific setting
      const setting = await prisma.setting.findUnique({
        where: { key }
      })

      if (!setting) {
        return NextResponse.json(
          { success: false, message: 'Setting not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: setting
      })
    } else {
      // Get all settings
      const settings = await prisma.setting.findMany({
        orderBy: { key: 'asc' }
      })

      return NextResponse.json({
        success: true,
        data: settings
      })
    }

  } catch (error) {
    console.error('Error fetching settings:', error)
    
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    const body = await request.json()
    const validatedData = updateSettingSchema.parse(body)

    // Validate JSON if type is json
    if (validatedData.type === 'json') {
      try {
        JSON.parse(validatedData.value)
      } catch {
        return NextResponse.json(
          { success: false, message: 'Invalid JSON value' },
          { status: 400 }
        )
      }
    }

    // Validate boolean if type is boolean
    if (validatedData.type === 'boolean') {
      if (!['true', 'false'].includes(validatedData.value.toLowerCase())) {
        return NextResponse.json(
          { success: false, message: 'Invalid boolean value' },
          { status: 400 }
        )
      }
    }

    // Validate number if type is number
    if (validatedData.type === 'number') {
      if (isNaN(Number(validatedData.value))) {
        return NextResponse.json(
          { success: false, message: 'Invalid number value' },
          { status: 400 }
        )
      }
    }

    // Create or update setting
    const setting = await prisma.setting.upsert({
      where: { key: validatedData.key },
      update: {
        value: validatedData.value,
        type: validatedData.type,
      },
      create: {
        key: validatedData.key,
        value: validatedData.value,
        type: validatedData.type,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Setting updated successfully',
      data: setting
    })

  } catch (error) {
    console.error('Error updating setting:', error)
    
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
      { success: false, message: 'Failed to update setting' },
      { status: 500 }
    )
  }
} 