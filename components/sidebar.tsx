import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function Sidebar() {
  return (
    <aside className="border-border bg-background fixed top-0 bottom-0 left-0 hidden w-52 overflow-hidden border-r-2 lg:block">
      <div className="mx-auto my-0 mt-4 flex w-40 flex-col justify-center">
        <Suspense fallback={<Skeleton />}>
          <div className="border-primary bg-secondary overflow-hidden rounded-full border-2">
            <Image
              src={'/avatar.jpg'}
              priority={true}
              width={200}
              height={200}
              alt="Avatar"
              className="w-full object-cover"
            />
          </div>
        </Suspense>
        <div className="border-primary mb-4 border-b-2 py-4 text-center">
          <h1 className="mb-2 text-base font-bold">Никита Чёрный</h1>
          <p className="text-muted-foreground text-sm">Личный блог</p>
        </div>
        <p className="text-center text-sm/relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, illo,
          ipsam ab asperiores quae at nostrum fuga accusamus optio ipsa, cumque
          aperiam! Alias commodi illum deleniti est illo harum exercitationem.
        </p>
      </div>
    </aside>
  );
}
