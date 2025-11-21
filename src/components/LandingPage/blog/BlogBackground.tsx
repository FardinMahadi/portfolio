"use client";

export function BlogBackground() {
  return (
    <>
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-secondary) 30%, transparent), transparent 70%)",
        }}
      />
    </>
  );
}
