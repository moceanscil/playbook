import { Button, SxProps } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

const toStringWithMailFriendlySpaces = (params: URLSearchParams) =>
  params.toString().replaceAll('+', '%20')

export default function LinkButton({
  href = '',
  query,
  children,
  disabled,
  sx,
  startIcon,
}: {
  href?: string
  query?: Record<string, string>
  children: ReactNode
  disabled?: boolean
  sx?: SxProps
  startIcon?: ReactNode
}) {
  if (query)
    href += '?' + toStringWithMailFriendlySpaces(new URLSearchParams(query))

  return (
    <Button
      startIcon={startIcon}
      size="large"
      sx={sx}
      disabled={disabled}
      LinkComponent={Link}
      href={href}
    >
      {children}
    </Button>
  )
}
