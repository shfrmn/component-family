import {create} from "zustand"

interface TourStore {
  tourStep: number
  tourCompleted: boolean
  tourMessage: string | undefined
  completeStep: () => void
}

const tourMessages = ["Edit task name", "Click 'Save' to update the task"]

export const useTour = create<TourStore>((set) => ({
  tourStep: 0,
  tourCompleted: false,
  tourMessage: tourMessages[0],
  completeStep: () =>
    set(({tourStep}) => ({
      tourStep: tourStep + 1,
      tourCompleted: tourStep === tourMessages.length - 1,
      tourMessage: tourMessages.at(tourStep + 1) || tourMessages.at(-1),
    })),
}))
