import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps, session }) {
  return (
    <>
      <div className='container mx-auto'>
        <Toaster />
        <Component {...pageProps} />
      </div>
    </>
  )
}
