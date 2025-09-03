import 'bootstrap/dist/css/bootstrap.min.css'
import Script from 'next/script'

export const metadata = {
  title: 'WPU Movie',
  description: 'Search movies with Next.js + Bootstrap',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://code.jquery.com/jquery-3.3.1.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" />
        <Script src="/js/script.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
