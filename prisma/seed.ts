import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await hash(process.env.ADMIN_PASSWORD || 'admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      passwordHash: adminPassword,
      isAdmin: true,
    },
  })

  // Create regular user
  const userPassword = await hash(process.env.USER_PASSWORD || 'user123', 12)
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      username: 'user',
      firstName: 'Regular',
      lastName: 'User',
      passwordHash: userPassword,
      isAdmin: false,
    },
  })

  // Create sample categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'technology' },
      update: {},
      create: {
        name: 'Technology',
        slug: 'technology',
        description: 'Technology related posts',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'business' },
      update: {},
      create: {
        name: 'Business',
        slug: 'business',
        description: 'Business related posts',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'lifestyle' },
      update: {},
      create: {
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Lifestyle related posts',
      },
    }),
  ])

  // Create sample tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'javascript' },
      update: {},
      create: {
        name: 'JavaScript',
        slug: 'javascript',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'react' },
      update: {},
      create: {
        name: 'React',
        slug: 'react',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'nextjs' },
      update: {},
      create: {
        name: 'Next.js',
        slug: 'nextjs',
      },
    }),
  ])

  // Create sample posts
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: 'welcome-to-vastlywise' },
      update: {},
      create: {
        title: 'Welcome to VastlyWise',
        content: 'This is your first post in the VastlyWise platform. Start creating amazing content!',
        slug: 'welcome-to-vastlywise',
        status: 'PUBLISHED',
        authorId: adminUser.id,
        publishedAt: new Date(),
      },
    }),
    prisma.post.upsert({
      where: { slug: 'getting-started-with-nextjs' },
      update: {},
      create: {
        title: 'Getting Started with Next.js',
        content: 'Next.js is a powerful React framework that makes building full-stack applications simple and efficient.',
        slug: 'getting-started-with-nextjs',
        status: 'PUBLISHED',
        authorId: adminUser.id,
        publishedAt: new Date(),
      },
    }),
  ])

  // Create sample settings
  const settings = await Promise.all([
    prisma.setting.upsert({
      where: { key: 'site_name' },
      update: {},
      create: {
        key: 'site_name',
        value: 'VastlyWise',
        type: 'string',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'site_description' },
      update: {},
      create: {
        key: 'site_description',
        value: 'A powerful admin platform for managing your content and business',
        type: 'string',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'maintenance_mode' },
      update: {},
      create: {
        key: 'maintenance_mode',
        value: 'false',
        type: 'boolean',
      },
    }),
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Created admin user: ${adminUser.email}`)
  console.log(`👤 Created regular user: ${regularUser.email}`)
  console.log(`📂 Created ${categories.length} categories`)
  console.log(`🏷️  Created ${tags.length} tags`)
  console.log(`📝 Created ${posts.length} posts`)
  console.log(`⚙️  Created ${settings.length} settings`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 