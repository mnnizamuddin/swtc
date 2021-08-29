/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
