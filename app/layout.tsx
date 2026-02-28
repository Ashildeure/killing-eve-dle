import "./globals.css"
export const metadata = {
  title: "Killing Eve .dle",
  description: "Guess the Killing Eve character of the day"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-white min-h-screen tracking-wide font-light">
        {children}
      </body>
    </html>
  )
}