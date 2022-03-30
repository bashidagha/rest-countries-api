import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return(
<>
  <NextNProgress />
  <Navbar />
 <Component {...pageProps} />
</>
)
}

export default MyApp
