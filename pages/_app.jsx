import 'styles/globals.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'next-auth/client';
import Head from 'next/head';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4285f4',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Google Docs</title>
      <meta
        name="description"
        content="A google docs clone made with next.js"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ThemeProvider theme={theme}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
    </>
  );
}

export default MyApp;
