import Image from 'next/image';

export default function Page() {
  return (
    <article className="container">
      <div className="border-primary mb-3 flex items-end justify-between border-b-2 pb-1">
        <h1 className="text-xl font-bold">Первый пост</h1>
        <time className="text-muted-foreground" dateTime="2023-08-20">
          20.08.2023
        </time>
      </div>
      <div>
        <p className="text-base leading-7 font-medium">
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
        <Image
          src={'/gallery/2.jpg'}
          width={976}
          height={549}
          alt="test"
          className="my-3 w-full"
        />
      </div>
    </article>
  );
}
