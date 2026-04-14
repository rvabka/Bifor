'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 500, suffix: '+', label: 'Osób czeka na premierę', icon: '🔥' },
  { value: 4, suffix: '', label: 'Gry na start', icon: '🎲' },
  { value: 30, suffix: 's', label: 'Do pierwszej rozgrywki', icon: '⚡' },
  { value: 0, suffix: '%', label: 'Rejestracji wymaganej', icon: '🚀' }
];

function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, isVisible]);

  return count;
}

function StatCard({
  value,
  suffix,
  label,
  icon,
  isVisible
}: {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  isVisible: boolean;
}) {
  const count = useCountUp(value, isVisible);

  return (
    <div className="text-center p-6 md:p-8">
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-4xl md:text-5xl font-light text-primary tracking-tight mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-on-surface-variant text-sm font-extralight">{label}</p>
    </div>
  );
}

export default function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="max-w-360 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 rounded-[2.5rem] bg-surface-container border border-white/5 p-4 md:p-6">
          {stats.map(stat => (
            <StatCard key={stat.label} {...stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
