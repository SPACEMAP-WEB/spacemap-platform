import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate, dehydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { GlobalStyle } from '../app.styled'
import React from 'react'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import { NextComponentType } from 'next'
import AppIndex from '.'
import { Provider } from 'react-redux'
import { store } from 'src/app.store/config/configureStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      notifyOnChangeProps: 'tracked',
      cacheTime: 1,
    },
  },
})

const AppContainer: NextComponentType<AppContext, AppInitialProps, AppProps> = (
  props: AppProps
) => {
  const { pageProps } = props

  return (
    <>
      <Head>
        <title> SPACEMAP:42</title>
      </Head>
      <GlobalStyle />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Hydrate state={pageProps.dehydratedState}>
            <AppIndex />
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  )
}

AppContainer.getInitialProps = async ({ Component, ctx }: AppContext) => {
  return {
    pageProps: {
      dehydratedState: dehydrate(queryClient),
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    },
  }
}

export default AppContainer
