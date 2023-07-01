import { Button, SxProps } from '@mui/material'
import Link from 'next/link'
import { UrlObject } from 'url'

export default function LinkButton({
  href,
  children,
  disabled,
  sx,
}: {
  href: UrlObject
  children: string
  disabled?: boolean
  sx?: SxProps
}) {
  return (
    <Button
      variant="contained"
      sx={sx}
      disabled={disabled}
      LinkComponent={Link}
      // There are incorrect typings when using a next/link with an MUI
      // button, so we unfortunately have to tell TypeScript to ignore this.
      // @ts-ignore
      href={href}
    >
      {children}
    </Button>
  )
}
