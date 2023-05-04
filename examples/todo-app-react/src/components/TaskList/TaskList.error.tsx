import {useEffect} from "react"
import {useTasks} from "../../hooks/useTasks"
import style from "./TaskList.module.css"

interface TaskListErrorProps {
  error?: any
  resetErrorBoundary?: () => any
}

export function TaskListError(props: TaskListErrorProps) {
  const {error, resetErrorBoundary} = props
  const {hasError, fixTasks} = useTasks()

  useEffect(() => {
    if (!hasError) {
      resetErrorBoundary?.()
    }
  }, [hasError, resetErrorBoundary])

  return (
    <div style={{maxWidth: "240px"}}>
      <div className={style.errorText}>
        Hi!
        <br />I am a friendly error fallback component. Check{" "}
        <code>TaskList.error.tsx</code> to see how to handle errors and recover
        from them.
        <br />
        <br />
        Here's what just happened:
        <br />
        <code className={style.errorMessage}>{error.message}</code>
        <br />
        <br />
        Click "Try again" to fix the error.
      </div>
      <button
        className={style.errorButton}
        onClick={() => {
          fixTasks()
          resetErrorBoundary?.()
        }}
      >
        Try again
      </button>
    </div>
  )
}
