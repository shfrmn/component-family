import {useEffect} from "react"
import {TaskList} from "./"
import {useTasks} from "../../hooks/useTasks"
import style from "./TaskList.module.css"

export default function TaskListWidget() {
  const {tasks, hasError, listTasks, breakTasks} = useTasks()

  useEffect(() => {
    listTasks()
  }, [])

  return (
    <>
      <TaskList.Layout tasks={tasks} />
      {!hasError && tasks.length > 0 && (
        <button className={style.errorButton} onClick={() => breakTasks()}>
          Simulate error
        </button>
      )}
    </>
  )
}
