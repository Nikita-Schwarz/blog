// app/posts/new/page.tsx
'use client';

import { SectionEditor } from '@/components/section-editor';
import { createPost } from '@/components/actions/post';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewPostPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (
    sections: Array<{
      type: string;
      content: string;
      meta?: any;
    }>,
  ) => {
    try {
      setIsSaving(true);

      const post = await createPost({
        title: 'Новый пост', // Можно добавить поле для заголовка
        sections: sections.map((s, index) => ({
          ...s,
          order: index + 1,
        })),
        authorId: 'user-123', // Получать из сессии/авторизации
      });

      router.push(`/posts/${post.id}`);
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Не удалось сохранить пост');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Создать новый пост</h1>
      <SectionEditor onSave={handleSave} isSaving={isSaving} />
    </div>
  );
}
