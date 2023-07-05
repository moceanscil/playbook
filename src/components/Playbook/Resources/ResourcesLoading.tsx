import {
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemText,
  Skeleton,
  SxProps,
  lighten,
} from '@mui/material'

import { LOGO_COLOR_PRIMARY } from '@/constants'

const styles: Record<string, SxProps> = {
  primarySkeleton: {
    bgColor: lighten(LOGO_COLOR_PRIMARY, 0.9),
  },
  secondarySkeleton: {
    bgcolor: lighten('rgba(0, 0, 0, 0.6)', 0.9),
    opacity: 0.3,
  },
}

export default function ResourcesLoading() {
  const skeletons = Array(3).fill(null)

  return (
    <>
      {skeletons.map((_, index) => (
        <ListItem
          key={index}
          secondaryAction={<Checkbox edge="end" disabled />}
        >
          <ListItemText
            primary={
              <>
                <Skeleton sx={styles.primarySkeleton} />
                <Skeleton sx={styles.primarySkeleton} />
              </>
            }
            secondary={
              <>
                <Skeleton sx={styles.secondarySkeleton} />
                <Skeleton sx={styles.secondarySkeleton} />
                <Skeleton sx={styles.secondarySkeleton} />
              </>
            }
          />
        </ListItem>
      ))}
    </>
  )
}
