import { Button, SxProps } from '@mui/material'
import Link from 'next/link'

export default function LinkButton({
  query,
  children,
  disabled,
  sx,
}: {
  query: Record<string, string>
  children: string
  disabled?: boolean
  sx?: SxProps
}) {
  const href = '?' + new URLSearchParams(query).toString()

  return (
    <Button
      variant="contained"
      sx={sx}
      disabled={disabled}
      LinkComponent={Link}
      href={href}
    >
      {children}
    </Button>
  )
}
