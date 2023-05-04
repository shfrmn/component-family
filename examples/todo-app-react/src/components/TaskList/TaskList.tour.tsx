import classnames from "classnames"
import {TaskList} from "./"
import {useTour} from "../../hooks/useTour"
import style from "./TaskList.module.css"

export default function TaskListTour() {
  const {tourCompleted, tourStep, tourMessage} = useTour()
  return (
    <>
      <div
        className={classnames(style.tourDialogContainer, {
          [style.tourCompleted]: tourCompleted,
          [style.shifted]: tourStep > 0,
        })}
      >
        <div className={style.tourDialog}>{tourMessage}</div>
      </div>
      <TaskList.Widget />
    </>
  )
}
