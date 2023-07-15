import { SxProps } from '@mui/material'

/**
 * Little utility to make TypeScript happy when merging a passed-in sx prop with
 * existing sx props.
 *
 * @example
 * ```TSX
 * export default function MyComponent({
 *   sx,
 *   children,
 * }: {
 *   sx: SxProps
 *   children: ReactNode
 * }) {
 *   return (
 *     <Box sx={getMergedSx(sx, { width: '50%' })}>{children}</Box>
 *   )
 * }
 * ```
 *
 * @see https://mui.com/system/getting-started/the-sx-prop/#passing-the-sx-prop
 */
export default function getMergedSx(
  ...sxs: Array<SxProps | undefined>
): SxProps | undefined {
  return sxs.reduce(
    (prev, curr) => [
      ...(Array.isArray(prev) ? prev : [prev]),
      ...(Array.isArray(curr) ? curr : [curr]),
    ],
    []
  )
}
