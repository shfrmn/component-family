import {lazy} from "react"
import {createFamily} from "../../../../../packages/react-family/src"
import {TaskLayout} from "./Task.layout"
import {TaskPlaceholder} from "./Task.placeholder"

export const Task = createFamily({
  Placeholder: TaskPlaceholder,
  Layout: TaskLayout,
  Tour: lazy(() => import("./Task.tour")),
  Widget: lazy(() => import("./Task.widget")),
})
