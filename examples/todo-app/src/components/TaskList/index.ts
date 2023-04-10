import {lazy} from "react"
import {createFamily} from "../../../../../packages/react-family/src"
import {TaskListLayout} from "./TaskList.layout"
import {TaskListTour} from "./TaskList.tour"
import {TaskListPlaceholder} from "./TaskList.placeholder"

export const TaskList = createFamily({
  Layout: TaskListLayout,
  Widget: lazy(() => import("./TaskList.widget")),
  Tour: TaskListTour,
  Placeholder: TaskListPlaceholder,
})
