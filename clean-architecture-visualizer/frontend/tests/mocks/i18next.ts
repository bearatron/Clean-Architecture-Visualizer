import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  Trans: ({ children }: { children: React.ReactNode }) => children,
  useTranslation: () => ({
    t: (key: string) => key, 
    i18n: {
      changeLanguage: () => Promise.resolve(),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));