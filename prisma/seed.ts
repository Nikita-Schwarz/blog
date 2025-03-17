import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      id: '1',
      nickname: 'nikitaschwarz',
      fullname: 'Никита Чёрный',
      email: 'nkt.schwarz@gmail.com',
      password_hash:
        '$2a$12$JT.7LTb/WRuYYIm1EDAPzekNCGwFgOmaJO13Yroh2HaFols9R.wyC',
      avatar_url: '/avatar.jpg',
      posts: {
        create: {
          id: '1',
          title: 'Hallo zusammen',
          start_date: new Date(2024, 12, 1),
          end_date: new Date(2024, 12, 2),
          status: 'published',
          likes_count: 1,
          sections: {
            createMany: {
              data: [
                {
                  id: '1',
                  type: 'text',
                  content:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                  order: 1,
                },
                {
                  id: '2',
                  type: 'image',
                  content: '/gallery/1.jpg',
                  order: 2,
                },
                {
                  id: '3',
                  type: 'text',
                  content:
                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                  order: 3,
                },
              ],
              skipDuplicates: true,
            },
          },
          comments: {
            create: {
              id: '1',
              user_id: '1',
              content: 'Мооооощно',
            },
          },
          likes: {
            create: {
              user_id: '1',
            },
          },
          favorites: {
            create: {
              user_id: '1',
            },
          },
        },
      },
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
