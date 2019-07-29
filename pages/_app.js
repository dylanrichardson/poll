import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import { LoadingApp, LoadingPage } from '../components';

const PollUI = class extends App {
  constructor(props) {
    super(props);

    this.state = {
      loadingPage: true,
      loadingApp: true
    };
  }

  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }

  routeChangeStart = () => {
    this.setState({ loadingPage: true });
  };

  routeChangeEnd = () => {
    this.setState({ loadingPage: false, loadingApp: false });
  };

  routeChangeError = () => {
    console.error('error loading page');
  };

  async componentDidMount() {
    Router.events.on('routeChangeStart', this.routeChangeStart);
    Router.events.on('routeChangeComplete', this.routeChangeEnd);
    Router.events.on('routeChangeError', this.routeChangeError);

    this.setState({ loadingPage: false, loadingApp: false });
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.routeChangeStart);
    Router.events.off('routeChangeComplete', this.routeChangeEnd);
    Router.events.off('routeChangeError', this.routeChangeError);
  }

  render() {
    const { Component, pageProps } = this.props;
    const { loadingPage, loadingApp } = this.state;

    return (
      <Container>
        <Head>
          <title>Polljob</title>
        </Head>
        {loadingApp ? (
          <LoadingApp />
        ) : loadingPage ? (
          <LoadingPage />
        ) : (
          <Component {...pageProps} />
        )}
      </Container>
    );
  }
};

export default PollUI;
