import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { datadogRum } from '@datadog/browser-rum';

console.log(process.env.NEXT_PUBLIC_DatadogAppId);

function MyApp({ Component, pageProps }: AppProps) {

datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID!,
    clientToken: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID!,
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'datadoghq.eu',
    service: 'vihu-ttt',
    env: process.env.NEXT_PUBLIC_NODE_ENV!,
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    defaultPrivacyLevel: 'mask-user-input',
});

  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🕹</text></svg>"
        />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;