import { ReactNode, createContext } from 'react'
import { useSearchParams } from 'next/navigation'

import Step from '@/types/Step'

const StepContext = createContext<{
  currentStep: Step
  progress: number
  getHrefWithQueryParams: (params: Record<string, string>) => string
}>({
  currentStep: 'Start',
  progress: 0,
  getHrefWithQueryParams: () => '',
})
export default StepContext

const STEPS_IN_ORDER: Step[] = [
  'Start',
  'County',
  'AreaOfNeed',
  'Eligibility',
  'Resources',
  'Report',
]

export function StepContextProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()

  const action = searchParams.get('action')
  const county = searchParams.get('county')
  const need = searchParams.get('need')
  const eligibility = searchParams.get('eligibility')
  const resources = searchParams.get('resources')

  let currentStep: Step = 'Start'
  if (action === 'neighbor') currentStep = 'County'
  if (county) currentStep = 'AreaOfNeed'
  if (need) currentStep = 'Eligibility'
  if (eligibility !== null) currentStep = 'Resources'
  if (resources) currentStep = 'Report'

  const getHrefWithQueryParams = (params: Record<string, string>) => {
    const paramsToMerge: Record<string, string> = {}
    if (action) paramsToMerge.action = action
    if (county) paramsToMerge.county = county
    if (need) paramsToMerge.need = need
    if (eligibility !== null) paramsToMerge.eligibility = eligibility
    if (resources) paramsToMerge.resources = resources

    return (
      '/?' +
      new URLSearchParams({
        ...paramsToMerge,
        ...params,
      })
    )
  }

  const progress = Math.round(
    (STEPS_IN_ORDER.indexOf(currentStep) / (STEPS_IN_ORDER.length - 1)) * 100
  )

  return (
    <StepContext.Provider
      value={{
        currentStep,
        progress,
        getHrefWithQueryParams,
      }}
    >
      {children}
    </StepContext.Provider>
  )
}
