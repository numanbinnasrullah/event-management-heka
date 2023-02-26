import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from '@/components/Mynavbar';

import { Provider } from 'react-redux'
import store from '../redux/store'

export default function App({ Component, pageProps }: AppProps) {

  

  return(
    <>
    <Provider store={store}>
    <MyNavbar />
    <Component {...pageProps} />
    </Provider>
    </>
  ) 
}
