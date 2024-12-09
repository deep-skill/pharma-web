import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUDIENCE,
      scope: 'openid profile email',
    },
    returnTo: 'http://localhost:3000/home',
  }),
  onError(req, res, error) {
    res.writeHead(302, {
      Location: 'http://localhost:3000/',
    });
    res.end();
  },
});
