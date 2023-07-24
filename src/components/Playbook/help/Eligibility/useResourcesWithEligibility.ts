import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

import Resource from '@/types/Resource'
import ResourcesContext from '@/components/Playbook/help/ResourcesContext'
import ResourceWithEligibility from '@/types/ResourceWithEligibility'
import StepContext from '@/components/StepContext'

const filterForResourcesWithEligibility = (
  resource: Resource
): resource is ResourceWithEligibility => !!resource.Eligibility?.trim()

export default function useResourcesWithEligibility() {
  const router = useRouter()

  const { currentStep, getHrefWithQueryParams } = useContext(StepContext)
  const { isLoading, resources } = useContext(ResourcesContext)

  const resourcesWithEligibility: ResourceWithEligibility[] = resources.filter(
    filterForResourcesWithEligibility
  )

  useEffect(() => {
    if (
      currentStep === 'Eligibility' &&
      !isLoading &&
      resources.length &&
      !resourcesWithEligibility.length
    ) {
      // Use .replace() rather than .push() so that, after the route change, the
      // browser's back button doesn't come back here and immediately push the
      // next route again.
      router.replace(
        getHrefWithQueryParams({
          eligibility: '',
        })
      )
    }
  }, [
    router,
    currentStep,
    getHrefWithQueryParams,
    resources,
    isLoading,
    resourcesWithEligibility,
  ])

  return { isLoading, resources: resourcesWithEligibility }
}
