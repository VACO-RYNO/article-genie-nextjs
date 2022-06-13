import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </Head>
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
