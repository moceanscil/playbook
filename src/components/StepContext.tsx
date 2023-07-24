import { ReactNode, createContext } from 'react'
import { useSearchParams } from 'next/navigation'

import Action from '@/types/Action'
import Step from '@/types/Step'

const StepContext = createContext<{
  currentStep: Step

  /**
   * A decimal from 0 to 1, indicating the user's progress through the Playbook.
   */
  progress: number

  /**
   * A helper for getting an href attribute for a link (or `router.push()`
   * call). Pass it the query param that you want to add/update in the URL, and
   * it will merge that into all the other existing query params, so that you
   * don't have to manually add all the different steps' query params every time
   * you want to create a link.
   */
  getHrefWithQueryParams: (params: Record<string, string>) => string
}>({
  currentStep: 'Start',
  progress: 0,
  getHrefWithQueryParams: () => '',
})
export default StepContext

const STEPS_IN_ORDER_BY_ACTION: Record<Action, Step[]> = {
  help: ['Start', 'County', 'AreaOfNeed', 'Eligibility', 'Resources', 'Report'],
  update: ['Start', 'Update'],
}

const isValidAction = (action: string | null): action is Action =>
  action === 'help' || action === 'update'

export function StepContextProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()

  const action = searchParams.get('action')
  if (action && !isValidAction(action)) throw new Error('invalid_action')

  const county = searchParams.get('county')
  const need = searchParams.get('need')
  const eligibility = searchParams.get('eligibility')
  const resources = searchParams.get('resources')

  let currentStep: Step = 'Start'
  if (action === 'help') currentStep = 'County'
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

  let progress: number
  if (isValidAction(action)) {
    const currentStepIndex =
      STEPS_IN_ORDER_BY_ACTION[action].indexOf(currentStep)
    const lastStepIndex = STEPS_IN_ORDER_BY_ACTION[action].length - 1

    progress = Math.round((currentStepIndex / lastStepIndex) * 100)
  } else {
    progress = 0
  }

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
