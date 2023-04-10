import {create} from "zustand"

interface TourStore {
  tourStep: number
  tourCompleted: boolean
  completeStep: () => void
}

const tourMessages = ["Edit task name", "Click 'Save' to update the task"]

const useTourStore = create<TourStore>((set) => ({
  tourStep: 0,
  tourCompleted: false,
  completeStep: () =>
    set(({tourStep}) => ({
      tourStep: tourStep + 1,
      tourCompleted: tourStep === tourMessages.length - 1,
    })),
}))

export function useTour() {
  const {tourStep, tourCompleted, completeStep} = useTourStore()
  const tourMessage = tourMessages.at(tourStep) || tourMessages.at(-1)
  return {
    tourMessage,
    tourStep,
    tourCompleted,
    completeStep,
  }
}
