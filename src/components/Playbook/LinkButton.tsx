import { Button, SxProps } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function LinkButton({
  query,
  children,
  disabled,
  sx,
  startIcon,
  variant,
}: {
  query: Record<string, string>
  children: ReactNode
  disabled?: boolean
  sx?: SxProps
  startIcon?: ReactNode
  variant?: 'contained'
}) {
  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      size="large"
      sx={sx}
      disabled={disabled}
      LinkComponent={Link}
      href={`?${new URLSearchParams(query)}`}
    >
      {children}
    </Button>
  )
}
