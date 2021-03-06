import { StyleInjectorProvider, VirtualStyleInjector } from 'glaze';
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import * as React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const injector = new VirtualStyleInjector();

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = (): ReturnType<typeof ctx.renderPage> =>
      originalRenderPage({
        enhanceApp: (App) => (props): JSX.Element => (
          // eslint-disable-next-line @typescript-eslint/camelcase, no-undef
          <StyleInjectorProvider injector={injector} nonce={__webpack_nonce__}>
            <App {...props} />
          </StyleInjectorProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, styles: injector.getStyleElement() };
  }
}
