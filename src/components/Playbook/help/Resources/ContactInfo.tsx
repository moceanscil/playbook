import { Box, Link, SxProps } from '@mui/material'
import { Link as LinkIcon, LocationOn, Mail, Phone } from '@mui/icons-material'

import Resource from '@/types/Resource'

const styles: Record<string, SxProps> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    mt: 1,
    gap: 1,
  },

  item: {
    display: 'flex',
    gridTemplateColumns: 'min-content 1fr',
    gap: 1,
  },

  websiteLink: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flexShrink: 1,
  },
}

export default function ContactInfo({ resource }: { resource: Resource }) {
  return (
    <Box sx={styles.root}>
      {resource['Website Link'] && (
        <Link
          href={resource['Website Link']}
          target="_blank"
          rel="noreferrer"
          sx={styles.item}
        >
          <LinkIcon fontSize="small" />

          <Box sx={styles.websiteLink}>{resource['Website Link']}</Box>
        </Link>
      )}

      {resource.Phone && (
        <Link href={`tel:${resource.Phone}`} sx={styles.item}>
          <Phone fontSize="small" />
          {resource.Phone}
        </Link>
      )}

      {resource['Email Address'] && (
        <Link
          href={`mailto:${resource['Email Address']}`}
          target="_blank"
          rel="noreferrer"
          sx={styles.item}
        >
          <Mail fontSize="small" />
          {resource['Email Address']}
        </Link>
      )}

      {resource.Address && (
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${resource.Address}`}
          target="_blank"
          rel="noreferrer"
          sx={styles.item}
        >
          <LocationOn fontSize="small" />
          {resource.Address}
        </Link>
      )}
    </Box>
  )
}
