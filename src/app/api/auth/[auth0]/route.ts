import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: "https://deep-pharma.com",
      scope: "openid profile email read:admin read:owner read:seller",
    },
  }),
});
