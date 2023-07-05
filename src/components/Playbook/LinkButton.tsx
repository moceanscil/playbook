import { Button, SxProps } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function LinkButton({
  href = '',
  query,
  children,
  disabled,
  sx,
  startIcon,
  variant,
}: {
  href?: string
  query?: Record<string, string>
  children: ReactNode
  disabled?: boolean
  sx?: SxProps
  startIcon?: ReactNode
  variant?: 'contained'
}) {
  if (query) href += '?' + new URLSearchParams(query)

  return (
    <Button
      variant={variant}
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
