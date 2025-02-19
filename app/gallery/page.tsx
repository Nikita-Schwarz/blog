import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Галерея',
  description: 'Все фото из походов',
};

export default function Page() {
  const data: { title: string; images: Array<string> }[] = [
    {
      title: 'Группа 1',
      images: [
        '/gallery/1.jpg',
        '/gallery/2.jpg',
        '/gallery/3.jpg',
        '/gallery/4.jpg',
      ],
    },
    {
      title: 'Группа 2',
      images: ['/gallery/1.jpg', '/gallery/2.jpg', '/gallery/3.jpg'],
    },
    {
      title: 'Группа 3',
      images: [
        '/gallery/1.jpg',
        '/gallery/2.jpg',
        '/gallery/3.jpg',
        '/gallery/4.jpg',
        '/gallery/5.jpg',
        '/gallery/6.jpg',
        '/gallery/7.jpg',
      ],
    },
    {
      title: 'Группа 4',
      images: [
        '/gallery/8.jpg',
        '/gallery/9.jpg',
        '/gallery/10.jpg',
        '/gallery/11.jpg',
        '/gallery/12.jpg',
        '/gallery/13.jpg',
        '/gallery/14.jpg',
      ],
    },
    {
      title: 'Группа 5',
      images: [
        '/gallery/15.jpg',
        '/gallery/16.jpg',
        '/gallery/17.jpg',
        '/gallery/18.jpg',
        '/gallery/19.jpg',
        '/gallery/20.jpg',
        '/gallery/21.jpg',
      ],
    },
  ];

  return (
    <div className="mx-auto">
      <h1 className="mb-8 text-center text-4xl font-bold">Галерея</h1>

      {data.map((group, index) => (
        <div key={index} className="mb-10">
          <h2 className="mb-2 text-2xl font-bold">{group.title}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {group.images.map((src, index) => (
              <div key={index} className="overflow-hidden rounded-md">
                <Image
                  src={src}
                  alt={`Фото ${index + 1}`}
                  width={300}
                  height={200}
                  className="h-48 w-full bg-secondary object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
