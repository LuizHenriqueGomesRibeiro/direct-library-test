import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const customizedPageProps = {
    user: { name: 'luiz', id: 'dljkhw813jbfdqw8g2v213'},
    ...pageProps
  }

  return <Component {...customizedPageProps} />;
}