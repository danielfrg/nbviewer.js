import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

import SiteConfig from "../lib/config";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <link
                        rel="shortcut icon"
                        type="image/png"
                        href="/favicon.png"
                    />
                    <meta
                        httpEquiv="X-UA-Compatible"
                        content="IE=edge,chrome=1"
                    ></meta>

                    {/* <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@400;500&display=swap"
                        rel="stylesheet"
                    /> */}
                    <script
                        src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"
                        integrity="sha256-1fEPhSsRKlFKGfK3eO710tEweHh1fwokU5wFGDHO+vg="
                        crossOrigin="anonymous"
                    ></script>

                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${SiteConfig.trackingID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${SiteConfig.trackingID}', { page_path: window.location.pathname });
            `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
