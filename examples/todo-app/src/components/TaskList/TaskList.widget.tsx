import {useEffect} from "react"
import {useApi} from "../../hooks/useApi"
import {TaskListLayout} from "./TaskList.layout"

export default function TaskListWidget() {
  const {tasks, listTasks} = useApi()
  useEffect(() => {
    listTasks()
  }, [])
  return <TaskListLayout tasks={tasks} />
}
