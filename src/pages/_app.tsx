import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType<object> = ({ Component, pageProps: { ...pageProps } }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
