import {useEffect} from "react"
import {TaskList} from "./"
import {useApi} from "../../hooks/useApi"

export default function TaskListWidget() {
  const {tasks, listTasks} = useApi()
  useEffect(() => {
    listTasks()
  }, [])
  return <TaskList.Layout tasks={tasks} />
}
