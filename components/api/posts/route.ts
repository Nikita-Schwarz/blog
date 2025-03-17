import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { title, authorId } = await request.json();

    // Создание поста
    const post = await prisma.post.create({
      data: {
        title,
        author: { connect: { id: authorId } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 },
    );
  }
}
