import { useEffect, useMemo, useState } from 'react';

type ThemeMode = 'auto' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'cv-theme-mode';
const MODE_CYCLE: ThemeMode[] = ['auto', 'dark', 'light'];

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'auto' || value === 'light' || value === 'dark';
}

function resolveTheme(mode: ThemeMode, prefersDark: boolean): ResolvedTheme {
  if (mode === 'auto') {
    return prefersDark ? 'dark' : 'light';
  }

  return mode;
}

const modeLabel: Record<ThemeMode, string> = {
  auto: 'Auto',
  dark: 'Dark',
  light: 'Light',
};

const resolvedLabel: Record<ResolvedTheme, string> = {
  dark: 'On dark',
  light: 'On light',
};

function ThemeIcon({ mode }: { mode: ThemeMode }) {
  if (mode === 'light') {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (mode === 'dark') {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 14.3A8.5 8.5 0 1 1 9.7 4a7 7 0 1 0 10.3 10.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 7.5a6 6 0 0 1 9.6-4.8A6.5 6.5 0 1 0 21.3 12H22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 7h5M19.5 4.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('auto');
  const [resolved, setResolved] = useState<ResolvedTheme>('dark');

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const stored = localStorage.getItem(STORAGE_KEY);
    const initialMode: ThemeMode = isThemeMode(stored) ? stored : 'auto';

    const applyMode = (nextMode: ThemeMode) => {
      const currentResolved = resolveTheme(nextMode, media.matches);
      document.documentElement.dataset.themeMode = nextMode;
      document.documentElement.dataset.theme = currentResolved;
      setResolved(currentResolved);
    };

    setMode(initialMode);
    applyMode(initialMode);

    const onMediaChange = () => {
      const currentMode = (document.documentElement.dataset.themeMode as ThemeMode | undefined) ?? 'auto';
      if (currentMode === 'auto') {
        applyMode('auto');
      }
    };

    media.addEventListener('change', onMediaChange);

    return () => {
      media.removeEventListener('change', onMediaChange);
    };
  }, []);

  const nextMode = useMemo(() => {
    const currentIndex = MODE_CYCLE.indexOf(mode);
    const nextIndex = (currentIndex + 1) % MODE_CYCLE.length;
    return MODE_CYCLE[nextIndex];
  }, [mode]);

  const handleToggle = () => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const currentIndex = MODE_CYCLE.indexOf(mode);
    const upcoming = MODE_CYCLE[(currentIndex + 1) % MODE_CYCLE.length];
    const currentResolved = resolveTheme(upcoming, media.matches);

    setMode(upcoming);
    setResolved(currentResolved);
    document.documentElement.dataset.themeMode = upcoming;
    document.documentElement.dataset.theme = currentResolved;
    localStorage.setItem(STORAGE_KEY, upcoming);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Theme mode ${modeLabel[mode]}. Next: ${modeLabel[nextMode]}.`}
      title={`Theme: ${modeLabel[mode]} · Next: ${modeLabel[nextMode]}`}
      className="theme-toggle-surface fixed top-5 right-5 z-[10001] inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-primary transition-all duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <ThemeIcon mode={mode} />
      <span>{modeLabel[mode]}</span>
      <span className="rounded-full border border-foreground/20 px-2 py-0.5 text-[9px] tracking-[0.14em] text-text-muted">
        {resolvedLabel[resolved]}
      </span>
    </button>
  );
}