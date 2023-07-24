import { Button, SxProps } from '@mui/material'
import Link from 'next/link'
import { ReactNode, useContext } from 'react'

import StepContext from '../StepContext'

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
  const { getHrefWithQueryParams } = useContext(StepContext)

  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      size="large"
      sx={sx}
      disabled={disabled}
      LinkComponent={Link}
      href={getHrefWithQueryParams(query)}
    >
      {children}
    </Button>
  )
}
