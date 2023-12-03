import { createRoot, hydrateRoot } from "react-dom/client";

import { App } from "./_app";

let root = null;

async function render(pageContext) {
    const { Page, pageProps } = pageContext;

    if (!Page) {
        throw new Error(
            "Client-side render() hook expects pageContext.Page to be defined",
        );
    }
    const container = document.getElementById("react-root");
    if (!container) {
        throw new Error("DOM element #react-root not found");
    }

    const children = (
        <App>
            <Page {...pageProps} />
        </App>
    );

    if (pageContext.isHydration) {
        // We hydrate the first page. (Since we do SSR, the first page is
        // already rendered to HTML and we merely have to hydrate it.)
        root = hydrateRoot(container, children);
    } else {
        if (!root) {
            root = createRoot(container);
        }
        root.render(children);
    }
}

export const clientRouting = true;
export const hydrationCanBeAborted = true;

export { render };
