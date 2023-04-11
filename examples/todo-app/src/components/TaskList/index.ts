import {lazy} from "react"
import {createFamily} from "../../../../../packages/react-family/src"
import {TaskListError} from "./TaskList.error"
import {TaskListLayout} from "./TaskList.layout"
import {TaskListPlaceholder} from "./TaskList.placeholder"

export const TaskList = createFamily({
  Placeholder: TaskListPlaceholder,
  Error: TaskListError,
  Layout: TaskListLayout,
  Widget: lazy(() => import("./TaskList.widget")),
  Tour: lazy(() => import("./TaskList.tour")),
})
