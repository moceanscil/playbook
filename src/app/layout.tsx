'use client'

import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material'
import Image from 'next/image'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import logo from './logo.png'

const LOGO_COLOR = 'rgb(77, 169, 197)'

const theme = createTheme({
  palette: {
    primary: { main: LOGO_COLOR, contrastText: 'white' },
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
            <Box sx={{ textAlign: 'center', flexGrow: 0 }}>
              <Image
                src={logo}
                alt="The MOCEANS CIL logo"
                style={{ height: 'auto', width: '100%', maxWidth: 460 }}
                priority
              />
            </Box>

            {children}
          </Container>
          <CssBaseline />
        </ThemeProvider>
      </body>
    </html>
  )
}
