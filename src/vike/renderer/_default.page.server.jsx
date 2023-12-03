import { renderToString } from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";

import { App } from "./_app";

//see https://vike.dev/render-modes for how to modify render()
async function render(pageContext) {
    const { Page, pageProps } = pageContext;
    if (!Page) {
        throw new Error(
            "My render() hook expects pageContext.Page to be defined",
        );
    }

    const pageHtml = renderToString(
        <App pageContext={pageContext}>
            <Page {...pageProps} />
        </App>
    );

    // See https://vike.dev/head
    const { documentProps } = pageContext.exports;
    const title = (documentProps?.title) || "Vite SSR app";
    const desc =
        (documentProps?.description) || "App using Vite + Vike";

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang=${pageContext.locale}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
        },
    };
}

export { render };
// See https://vike.dev/data-fetching
export const passToClient = ["pageProps", "urlPathname"];
