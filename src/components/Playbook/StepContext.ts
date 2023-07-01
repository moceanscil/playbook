import { createContext } from 'react'

const StepContext = createContext<{ currentStep: string }>({
  currentStep: 'Start',
})
export default StepContext
