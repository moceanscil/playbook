import { Send } from '@mui/icons-material'

import LinkButton from '../LinkButton'
import Resource from '@/types/Resource'

const getEmailBody = (resourceIds: string[], resources: Resource[]): string =>
  resourceIds
    .map(resourceId => {
      const resource = resources.find(({ id }) => resourceId === id) as Resource
      return `- ${resource.name} (${resource.url})\n${resource.description}`
    })
    .join('\n\n')

export default function SendButton({
  selectedResourceIds,
  resources,
}: {
  selectedResourceIds: string[]
  resources: Resource[]
}) {
  const emailBody = getEmailBody(selectedResourceIds, resources)

  return (
    <LinkButton
      disabled={!selectedResourceIds.length}
      href="mailto:"
      query={{ subject: 'Some helpful resources for you', body: emailBody }}
      startIcon={<Send />}
      variant="contained"
    >
      Send
    </LinkButton>
  )
}
