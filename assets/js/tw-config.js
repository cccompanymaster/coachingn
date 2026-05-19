/* Tailwind CDN config — shared across all pages */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        bg: '#FAF6F1', bg2: '#F5EDE5',
        surface: '#FFFFFF', 'surface-2': '#F2E6DD', 'surface-3': '#EAD9C9',
        line: '#E8DED2', line2: '#D9CCBC',
        ink: '#2A1F1A', soft: '#4A3A30', mute: '#8B7B6E',
        brand: '#B68A6E', 'brand-2': '#8B6B54', 'brand-3': '#6B4F3D',
        'brand-soft': '#E8D8CC', 'brand-deep': '#3D2A1F',
      },
      fontFamily: {
        sans: ['Pretendard','Inter','ui-sans-serif','system-ui','sans-serif'],
        mono: ['IBM Plex Mono','ui-monospace','monospace'],
        serif: ['Cormorant Garamond','ui-serif','Georgia','serif'],
      },
      maxWidth: { content: '1200px' },
      letterSpacing: { tight2: '-0.02em', tight3: '-0.035em' },
    },
  },
};
