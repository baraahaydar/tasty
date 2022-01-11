import "../styles/globals.css";

import LayoutDefault from "../components/layout/LayoutDefault";
import LayoutWithoutHeader from "../components/layout/LayoutWithoutHeader";
import LayoutWithHeaderFooter from "../components/layout/LayoutWithHeaderFooter";
import { useContext } from "react";

import SessionContext from "../components/session/SessionContext";
import SessionProvider from "../components/session/SessionProvider";
import Entry from "../components/Entry";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  let Layout = null;

  const r = useRouter();
  switch (Component.layout) {
    case "default":
      Layout = LayoutDefault;
      break;
    case "withoutheader":
      Layout = LayoutWithoutHeader;
      break;
    case "withheaderfooter":
      Layout = LayoutWithHeaderFooter;
      break;
  }
  const data = useContext(SessionContext);
  return (
    <SessionProvider>
      {r.route == "/" || r.route == "/categories" ? (
        <>
          <Entry />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}
