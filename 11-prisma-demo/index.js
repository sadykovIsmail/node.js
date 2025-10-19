import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Create a user
  const user = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
    },
  });
  console.log('Created user:', user);

  // 2️⃣ Create a post for that user
  const post = await prisma.post.create({
    data: {
      title: 'My first SQL post',
      content: 'Learning Prisma with PostgreSQL!',
      authorId: user.id,
    },
  });
  console.log('Created post:', post);

  // 3️⃣ Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  });
  console.log('All users with posts:', allUsers);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
