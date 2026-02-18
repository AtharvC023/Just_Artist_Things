import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Art Things - Premium Art Supply Curator",
}

export default function RootPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=/landing" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `window.location.href='/landing'` }} />
      </body>
    </html>
  )
}
