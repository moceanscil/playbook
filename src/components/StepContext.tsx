import { ReactNode, createContext } from 'react'
import { useSearchParams } from 'next/navigation'

import Step from '@/types/Step'

const StepContext = createContext<{ currentStep: Step; progress: number }>({
  currentStep: 'Start',
  progress: 0,
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

  let currentStep: Step = 'Start'
  if (searchParams.get('action') === 'neighbor') currentStep = 'County'
  if (searchParams.get('county')) currentStep = 'AreaOfNeed'
  if (searchParams.get('need')) currentStep = 'Eligibility'
  if (searchParams.get('eligibility') !== null) currentStep = 'Resources'
  if (searchParams.get('resources')) currentStep = 'Report'

  const progress = Math.round(
    (STEPS_IN_ORDER.indexOf(currentStep) / (STEPS_IN_ORDER.length - 1)) * 100
  )

  return (
    <StepContext.Provider value={{ currentStep, progress }}>
      {children}
    </StepContext.Provider>
  )
}
