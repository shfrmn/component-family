import classnames from "classnames"
import {TaskList} from "./"
import {useTour} from "../../hooks/useTour"
import {useTasks} from "../../hooks/useTasks"
import style from "./TaskList.module.css"

export default function TaskListTour() {
  const {tourCompleted, tourStep, tourMessage} = useTour()
  const {tasks} = useTasks()
  return (
    <>
      {tasks.length > 0 && (
        <div
          className={classnames(style.tourDialogContainer, {
            [style.tourCompleted]: tourCompleted,
            [style.shifted]: tourStep > 0,
          })}
        >
          <div className={style.tourDialog}>{tourMessage}</div>
        </div>
      )}
      <TaskList.Widget />
    </>
  )
}
