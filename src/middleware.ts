import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { middleware } from './lib/rolesmiddleware';

export default withMiddlewareAuthRequired(middleware);

export const config = {
  matcher: '/forms/:path*',
};
