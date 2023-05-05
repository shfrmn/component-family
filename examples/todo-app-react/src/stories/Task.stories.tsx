import {Meta, StoryObj} from "@storybook/react"
import {createStories} from "@component-family/storybook-react"
import {Task} from "../components/Task"

const meta = {
  title: "Task",
  component: Task,
} satisfies Meta<typeof Task>

export default meta

type Story = StoryObj<typeof meta>

const stories = createStories(Task, {
  args: {
    variants: {error: "Error"},
    task: {
      id: 1,
      title: "Water plants",
    },
    error: new Error("Demo error message"),
  },
})

export const Placeholder = stories.Placeholder
export const ErrorState = stories.Error

export const Layout = stories.Layout

export const LayoutWithDisabledButton: Story = {
  ...stories.Layout,
  args: {
    ...stories.Layout.args,
    isButtonEnabled: false,
  },
}

export const Widget = stories.Widget
