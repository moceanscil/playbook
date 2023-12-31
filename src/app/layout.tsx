'use client'

import {
  AppBar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  lighten,
  SxProps,
  ThemeProvider,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/700.css'

import logo from './logo.png'
import { LOGO_COLOR_PRIMARY, LOGO_COLOR_SECONDARY } from '@/constants'
import PlaybookProgress from '@/components/PlaybookProgress'
import { StepContextProvider } from '@/components/StepContext'

const theme = createTheme({
  palette: {
    primary: { main: LOGO_COLOR_PRIMARY, contrastText: 'white' },
    secondary: { main: LOGO_COLOR_SECONDARY },
    text: { primary: '#225580' },
  },
  typography: {
    fontFamily: 'Montserrat',
    h1: {
      fontSize: '1.25rem',
      lineHeight: 1.6,
    },
    h2: {
      fontSize: '1rem',
      fontWeight: 'bold',
      lineHeight: 1.5,
    },
  },
})

const bodyStyle = {
  height: '100%',
  backgroundColor: lighten(LOGO_COLOR_PRIMARY, 0.9),
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column' as const,
}

const logoStyle = {
  height: 'auto',
  width: '100%',
  maxWidth: 230,
}

const styles: Record<string, SxProps> = {
  appBar: {
    backgroundColor: 'white',
    textAlign: 'center',
  },
  container: {
    minHeight: '100%',
    display: 'grid',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },
  scrollContainer: {
    overflow: 'auto',
    height: '100%',
    pt: 4,
    pb: 2,
  },
}

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
      <body style={bodyStyle}>
        <ThemeProvider theme={theme}>
          <StepContextProvider>
            <CssBaseline />

            <AppBar position="sticky" sx={styles.appBar}>
              <Link href="/">
                <Image
                  src={logo}
                  alt="The MOCEANS CIL logo"
                  style={logoStyle}
                  priority
                />
              </Link>

              <PlaybookProgress />
            </AppBar>

            <Box sx={styles.scrollContainer}>
              <Container maxWidth="md" component="main" sx={styles.container}>
                {children}
              </Container>
            </Box>
          </StepContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
