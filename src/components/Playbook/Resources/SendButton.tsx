import { Send } from '@mui/icons-material'

import LinkButton from '../LinkButton'
import Resource from '@/types/Resource'

const getResourceTextSummary = (resource: Resource): string => {
  let summary =
    resource['Name of Resource'].toLocaleUpperCase() +
    '\n' +
    resource['Program Summary']
  if (resource['Website Link']) summary += '\n' + resource['Website Link']
  if (resource.Phone) summary += '\n' + resource.Phone
  if (resource.Address) summary += '\n' + resource.Address

  return summary
}

const getEmailBody = (resourceIds: string[], resources: Resource[]): string =>
  resourceIds
    .map(resourceId => {
      const resource = resources.find(({ id }) => resourceId === id) as Resource
      return getResourceTextSummary(resource)
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
