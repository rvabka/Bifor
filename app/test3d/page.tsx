import Character3D from '../components/Character3D';

export default function Test3DPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-primary">
        Test modelu 3D
      </p>
      <h1 className="mb-8 text-center text-2xl font-light text-on-surface">
        Przeciągnij, żeby obrócić. Sam też się kręci.
      </h1>

      <div className="relative h-[70vh] w-full max-w-xl">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 blur-3xl"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 45%, rgba(255,178,0,0.18), transparent 70%)'
          }}
        />
        <Character3D src="/models/boy1.glb" autoRotate controls />
      </div>

      <p className="mt-8 max-w-md text-center text-sm font-light text-on-surface-variant">
        To realny model 3D wygenerowany z Twojego artu postaci. Jeśli front
        wygląda dobrze, na stronie pokażę go z ujęcia od przodu (boki/tył chowamy).
      </p>
    </main>
  );
}
