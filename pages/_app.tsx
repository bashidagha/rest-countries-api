import '../styles/globals.css'
import '../styles/globals_black.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import NextNProgress from "nextjs-progressbar";
import {DarkenProvider} from '../context/state'
import { useDark } from "../context/state";

function MyApp({ Component, pageProps }: AppProps) {


  return(
<>
<DarkenProvider>
      <div style={{height:"100%"}}>
          <NextNProgress />
          <Navbar />
          <Component {...pageProps} />
     </div>
  </DarkenProvider>
</>
)
}

export default MyApp
