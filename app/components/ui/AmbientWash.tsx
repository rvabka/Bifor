/* Subpages get a painted wash instead of the home page's live shader. The
   motion is only legible behind a hero, and a full-screen WebGL quad costs
   ~300 KB of JavaScript plus a GPU frame budget on pages that are mostly
   text. Same palette, none of the price. */
export default function AmbientWash() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="sticky top-0 h-svh"
        style={{
          background: [
            'radial-gradient(38% 34% at 12% 8%, rgba(245,158,11,0.16), transparent 68%)',
            'radial-gradient(34% 30% at 82% 4%, rgba(168,85,247,0.15), transparent 70%)',
            'radial-gradient(30% 26% at 68% 34%, rgba(59,130,246,0.12), transparent 72%)',
            'radial-gradient(34% 30% at 22% 46%, rgba(34,197,94,0.10), transparent 72%)',
            'radial-gradient(30% 28% at 90% 58%, rgba(6,182,212,0.10), transparent 74%)'
          ].join(',')
        }}
      />
    </div>
  );
}
