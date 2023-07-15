import Resource from '@/types/Resource'

type ResourceWithUpdateNotes = Resource & {
  'Anything else to update?'?: string
}

export default ResourceWithUpdateNotes
