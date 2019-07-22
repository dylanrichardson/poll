import Document, { Head, Main, NextScript } from 'next/document';
// import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  //   static getInitialProps({ renderPage }) {
  //     // Step 1: Create an instance of ServerStyleSheet
  //     const sheet = new ServerStyleSheet();

  //     // Step 2: Retrieve styles from components in the page
  //     const page = renderPage(App => props =>
  //       sheet.collectStyles(<App {...props} />)
  //     );

  //     // Step 3: Extract the styles as <style> tags
  //     const styleTags = sheet.getStyleElement();

  //     // Step 4: Pass styleTags as a prop
  //     return { ...page, styleTags };
  //   }

  render() {
    return (
      <html>
        <Head>
          {/* Device Config */}
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta
            name="viewport"
            content="user-scalable=no, width=device-width, initial-scale=1.0"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />

          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
