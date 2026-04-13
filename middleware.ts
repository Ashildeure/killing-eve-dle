import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};