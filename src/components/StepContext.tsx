import { ReactNode, createContext } from 'react'
import { useSearchParams } from 'next/navigation'

const StepContext = createContext<{ currentStep: string; progress: number }>({
  currentStep: 'Start',
  progress: 0,
})
export default StepContext

const STEPS_IN_ORDER = [
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

  const currentStep =
    action === 'neighbor' && county && need && eligibility !== null && resources
      ? 'Report'
      : action === 'neighbor' && county && need && eligibility !== null
      ? 'Resources'
      : action === 'neighbor' && county && need
      ? 'Eligibility'
      : action === 'neighbor' && county
      ? 'AreaOfNeed'
      : action === 'neighbor'
      ? 'County'
      : 'Start'

  const progress = Math.round(
    (STEPS_IN_ORDER.indexOf(currentStep) / (STEPS_IN_ORDER.length - 1)) * 100
  )

  return (
    <StepContext.Provider value={{ currentStep, progress }}>
      {children}
    </StepContext.Provider>
  )
}
