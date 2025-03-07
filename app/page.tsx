import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function Page() {
  return (
    <article className="container mx-auto">
      <div className="border-primary mb-4 flex items-end justify-between border-b-2 pb-2">
        <h1 className="text-base font-bold">Первый пост</h1>
        <time className="text-muted-foreground text-sm" dateTime="2023-08-20">
          20.08.2023
        </time>
      </div>
      <div>
        <p className="text-sm/loose font-medium text-balance">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. A nam autem
          error animi eos commodi voluptatum sapiente expedita! Labore sunt
          maxime quasi modi tempora adipisci molestias. Numquam ratione maiores
          earum quae quasi aspernatur aliquid itaque, saepe soluta minus ullam
          eaque magnam inventore facere sint impedit repellendus pariatur
          <br />
          deserunt dicta? Sequi facilis animi ipsa quo consectetur reprehenderit
          sunt aperiam, voluptates, amet placeat cum id totam deleniti? Libero
          voluptates ipsum reiciendis repudiandae qui error cumque nulla
          perspiciatis itaque omnis, beatae aspernatur. Quidem voluptates
          tempora veritatis soluta culpa unde repudiandae. Unde, maxime nobis
          <br />
        </p>
        <div className="my-3 w-full">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
            <Image
              src={'/gallery/2.jpg'}
              fill
              alt="test"
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <Link href={'/'} className={buttonVariants({ variant: 'ghost' })}>
          Click here
        </Link>
      </div>
    </article>
  );
}
