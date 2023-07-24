import Resource from './Resource'

type ResourceWithEligibility = Resource & {
  Eligibility: string
}

export default ResourceWithEligibility
