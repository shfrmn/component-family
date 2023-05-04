import {lazy} from "react"
import {createFamily} from "@component-family/react"
import {TaskError} from "./Task.error"
import {TaskLayout} from "./Task.layout"
import {TaskPlaceholder} from "./Task.placeholder"

export const Task = createFamily({
  Placeholder: TaskPlaceholder,
  Error: TaskError,
  Layout: TaskLayout,
  Tour: lazy(() => import("./Task.tour")),
  Widget: lazy(() => import("./Task.widget")),
})
