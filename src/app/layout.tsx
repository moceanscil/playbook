'use client'

import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/700.css'

import logo from './logo.png'

const LOGO_COLOR_PRIMARY = 'rgb(77, 169, 197)'
const LOGO_COLOR_SECONDARY = 'rgb(249, 200, 59)'

const theme = createTheme({
  palette: {
    primary: { main: LOGO_COLOR_PRIMARY, contrastText: 'white' },
    secondary: { main: LOGO_COLOR_SECONDARY },
    text: { primary: '#225580' },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body style={{ height: '100%' }}>
        <ThemeProvider theme={theme}>
          <Container
            maxWidth="md"
            component="main"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Box sx={{ textAlign: 'center', flexGrow: 0, pt: 4 }}>
              <Link href="/">
                <Image
                  src={logo}
                  alt="The MOCEANS CIL logo"
                  style={{ height: 'auto', width: '100%', maxWidth: 230 }}
                  priority
                />
              </Link>
            </Box>

            {children}
          </Container>
          <CssBaseline />
        </ThemeProvider>
      </body>
    </html>
  )
}
