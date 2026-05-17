import type { Config } from 'tailwindcss';

/**
 * Design-Tokens nach PLAN.md §4.
 * Farben/Spacing/Radius werden zusätzlich als CSS-Variablen in app/globals.css
 * deklariert, damit MDX-Inhalte und Drittkomponenten ohne Tailwind darauf
 * zugreifen können.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS-Variablen als RGB-Channels — ermoeglicht Tailwind die
        // slash-Opacity-Syntax (`text-ink/60`) ueber CSS-Variablen.
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        stone: 'rgb(var(--color-stone) / <alpha-value>)',
        graphite: 'rgb(var(--color-graphite) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        'line-soft': 'rgb(var(--color-line-soft) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '700' }],
        caption: ['0.8125rem', { lineHeight: '1.4' }],
        body: ['1.0625rem', { lineHeight: '1.6' }],
        h3: ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.005em', fontWeight: '500' }],
        h2: ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        h1: ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.015em', fontWeight: '700' }],
        display: [
          'clamp(3.5rem, 9vw, 7.5rem)',
          { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
      },
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        none: '0',
        xs: '2px',
      },
      maxWidth: {
        container: '90rem', // 1440px
      },
      transitionTimingFunction: {
        // Easing > Speed: ruhige out-cubic.
        quiet: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      transitionDuration: {
        slow: '600ms',
      },
    },
  },
  plugins: [],
};

export default config;
