import { PrismaClient } from '@prisma/client';

enum CategoryUUID {
  FIRST= '39614113-7ad5-45b6-8093-06455437e1e2',
  SECOND = 'efd775e2-df55-4e0e-a308-58249f5ea202'
}

enum PostUUID {
  FIRST = '6d308040-96a2-4162-bea6-2338e9976540',
  SECOND = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd'
}

enum UserUUID {
  FIRST = '658170cbb954e9f5b905ccf4',
  SECOND = '6581762309c030b503e30512'
}

function getCategories() {
  return [
    { id: CategoryUUID.FIRST, title: 'Книги' },
    { id: CategoryUUID.SECOND, title: 'Компьютеры' },
  ];
}

function getPosts() {
  return [
    {
      id: PostUUID.FIRST,
      title: 'Худеющий',
      userId: UserUUID.FIRST,
      content: 'Недавно прочитал страшный роман «Худеющий».',
      description: 'На мой взгляд, это один из самых страшных романов Стивена Кинга.',
      categories: {
        connect: [{ id: CategoryUUID.FIRST }],
      },
    },
    {
      id: PostUUID.SECOND,
      title: 'Вы не знаете JavaScript',
      userId: UserUUID.FIRST,
      content: 'Полезная книга по JavaScript',
      description: 'Секреты и тайные знания по JavaScript.',
      categories: {
        connect: [
          { id: CategoryUUID.FIRST },
          { id: CategoryUUID.SECOND },
        ]
      },
      comments: [
          {
            message: 'Это действительно отличная книга!',
            userId: UserUUID.FIRST,
          },
          {
            message: 'Надо будет обязательно перечитать. Слишком много информации.',
            userId: UserUUID.SECOND,
          }
      ]
    }
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockCategories = getCategories();
  for (const category of mockCategories) {
    await prismaClient.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        title: category.title
      }
    });
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.description,
        categories: post.categories,
        userId: post.userId,
        comments: post.comments ? {
          create: post.comments
        } : undefined
      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
