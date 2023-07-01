export const metadata = {
  title: 'NeighborAide Playbook',
  description: 'A playbook for social workers to access important resources.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
