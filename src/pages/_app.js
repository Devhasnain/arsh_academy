import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps, session }) {
  return (
    <>
      <SessionProvider session={session}>
        <div className='container mx-auto'>
          <Toaster />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  )
}
