import Resource from '@/types/Resource'
import ResourceWithUpdateNotes from '../ResourceWithUpdateNotes'

export default function getChangedFields(
  resource: Resource,
  updatedResource: ResourceWithUpdateNotes
) {
  const changes: Record<
    string,
    { old: string | undefined; new: string | undefined }
  > = {}

  let fieldName: keyof ResourceWithUpdateNotes
  for (fieldName in updatedResource) {
    if (
      fieldName !== 'Anything else to update?' &&
      resource[fieldName] !== updatedResource[fieldName]
    ) {
      changes[fieldName] = {
        old: resource[fieldName] as string,
        new: updatedResource[fieldName] as string,
      }
    } else if (fieldName === 'Anything else to update?') {
      changes[fieldName] = { old: undefined, new: updatedResource[fieldName] }
    }
  }

  return changes
}
