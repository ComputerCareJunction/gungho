import { useEffect, useMemo, useRef, useState } from 'react';

export type HomeStatItem = {
  number: string;
  label: string;
};

function parseStatNumber(display: string): { target: number; suffix: string } {
  const m = display.trim().match(/^(\d+)(.*)$/);
  if (!m) return { target: 0, suffix: display };
  return { target: Number(m[1]), suffix: m[2] ?? '' };
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export default function HomeAnimatedStats({ items, className }: { items: HomeStatItem[]; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(() => items.map(() => 0));

  const itemsKey = items.map((i) => `${i.number}\t${i.label}`).join('\n');
  const parsed = useMemo(() => items.map((i) => parseStatNumber(i.number)), [itemsKey]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCounts(parsed.map((p) => p.target));
      return;
    }

    const durationMs = 1700;
    const start = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = easeOutCubic(t);
      setCounts(parsed.map((p) => Math.round(p.target * eased)));
      if (t < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [visible, parsed]);

  return (
    <div ref={rootRef} className={className}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-x-12">
        {items.map((stat, index) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold tabular-nums text-primary sm:text-4xl" aria-live={visible ? 'polite' : 'off'}>
              {counts[index]}
              {parsed[index]?.suffix ?? ''}
            </div>
            <div className="mt-2 text-sm text-slate-600 sm:text-base">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
