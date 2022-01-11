import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSidePropsHandler =
  (callback, isPrivate = true) =>
  async (ctx) => {
    let { res } = ctx;
    let { token } = cookies(ctx);
    let redirect = false,
      destination;

    if (isPrivate) {
      if (!token) {
        redirect = true;
        destination = "/login";
      }
    } else {
      if (token) {
        redirect = true;
        destination = "/";
      }
    }

    if (redirect && res) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
          
        },
      };
    }

    if (typeof callback != "function") callback = () => ({ props: {} });
    return await callback(ctx);
  };

export const usePrivacyChecker = (isPrivate = true) => {
  let router = useRouter();
  useEffect(() => {
    let { token } = cookies({ req: {} });
    let redirect = false,
      destination;

    if (isPrivate) {
      if (!token) {
        redirect = true;
        destination = "/login";
      }
    } else {
      if (token) {
        redirect = true;
        destination = "/";
      }
    }

    if (redirect) router.push(destination);
  }, []);
};

// function getServerSidePropsHandler(callback) {
//     return async (ctx) => {
//         return callback(ctx)
//     }
// }
