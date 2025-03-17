// app/components/section-editor.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

type Section = {
  type: 'text' | 'image' | 'post-link';
  content: string;
  meta?: any;
};

export function SectionEditor({
  onSave,
  isSaving,
}: {
  onSave: (sections: Section[]) => Promise<void>;
  isSaving: boolean;
}) {
  const [sections, setSections] = useState<Section[]>([]);
  const [newContent, setNewContent] = useState('');
  const [selectedType, setSelectedType] = useState<Section['type']>('text');
  const [validationError, setValidationError] = useState('');

  const validateSection = (): boolean => {
    if (!newContent.trim()) {
      setValidationError('Поле не может быть пустым');
      return false;
    }

    if (selectedType === 'image' && !isValidUrl(newContent)) {
      setValidationError('Некорректный URL изображения');
      return false;
    }

    setValidationError('');
    return true;
  };

  const addSection = () => {
    if (!validateSection()) return;

    setSections((prev) => [
      ...prev,
      {
        type: selectedType,
        content: newContent,
        meta: selectedType === 'post-link' ? { postId: newContent } : undefined,
      },
    ]);
    setNewContent('');
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as Section['type'])}
          className="w-full rounded-md border p-2 sm:w-40"
        >
          <option value="text">📝 Текст</option>
          <option value="image">🖼️ Изображение</option>
          <option value="post-link">🔗 Ссылка на пост</option>
        </select>

        <div className="flex-1">
          <Input
            placeholder={getInputPlaceholder(selectedType)}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className={validationError ? 'border-red-500' : ''}
          />
          {validationError && (
            <p className="mt-1 text-sm text-red-500">{validationError}</p>
          )}
        </div>

        <Button onClick={addSection} className="w-full sm:w-auto">
          Добавить секцию
        </Button>
      </div>

      {/* Превью секций */}
      <div className="space-y-4 rounded-lg border p-4">
        {sections.map((section, index) => (
          <SectionPreview
            key={index}
            section={section}
            onRemove={() =>
              setSections((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>

      <Button
        onClick={() => onSave(sections)}
        disabled={isSaving || sections.length === 0}
        className="w-full"
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Сохранение...
          </>
        ) : (
          'Опубликовать пост'
        )}
      </Button>
    </div>
  );
}

function getInputPlaceholder(type: Section['type']) {
  switch (type) {
    case 'text':
      return 'Введите текст...';
    case 'image':
      return 'Введите URL изображения...';
    case 'post-link':
      return 'Введите ID поста...';
    default:
      return 'Введите содержимое...';
  }
}

function SectionPreview({
  section,
  onRemove,
}: {
  section: Section;
  onRemove: () => void;
}) {
  return (
    <div className="group hover:bg-accent/50 relative rounded-lg border p-4">
      <div className="mb-2 flex items-start justify-between">
        <span className="text-muted-foreground text-sm">
          {section.type === 'text' && 'Текстовый блок'}
          {section.type === 'image' && 'Изображение'}
          {section.type === 'post-link' && 'Ссылка на пост'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100"
        >
          Удалить
        </Button>
      </div>

      {section.type === 'text' && (
        <p className="whitespace-pre-wrap">{section.content}</p>
      )}

      {section.type === 'image' && (
        <div className="relative aspect-video">
          <img
            src={section.content}
            alt="Превью"
            className="rounded-lg object-cover"
          />
          {section.meta?.caption && (
            <p className="text-muted-foreground mt-2 text-sm">
              {section.meta.caption}
            </p>
          )}
        </div>
      )}

      {section.type === 'post-link' && (
        <div className="font-medium text-blue-600">
          Ссылка на пост: #{section.meta?.postId}
        </div>
      )}
    </div>
  );
}
