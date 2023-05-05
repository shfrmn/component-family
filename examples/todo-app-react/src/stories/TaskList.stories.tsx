import type {Meta, StoryObj} from "@storybook/react"
import {createStories} from "@component-family/storybook-react"
import {TaskList} from "../components/TaskList"

const meta = {
  title: "TaskList",
  component: TaskList,
} satisfies Meta<typeof TaskList>

export default meta

type Story = StoryObj<typeof meta>

const stories = createStories(TaskList, {
  args: {
    variants: {
      error: "Error",
      placeholder: "Placeholder",
    },
    tasks: [
      {
        id: 1,
        title: "Water plants",
      },
      {
        id: 2,
        title: "Walk the dog",
      },
    ],
    error: new Error("Demo error message"),
  },
})

export const Placeholder = stories.Placeholder
export const ErrorState = stories.Error
export const Layout = stories.Layout
export const Widget = stories.Widget
export const Tour = stories.Tour
