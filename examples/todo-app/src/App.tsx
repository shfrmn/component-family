import {TaskList} from "./components/TaskList"

const appContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  maxWidth: "100vw",
  overflow: "hidden",
}

function App() {
  return (
    <div style={appContainerStyle}>
      <div>
        <h2>Layout</h2>
        <TaskList.Layout
          variants={{
            error: "Error",
          }}
          tasks={[
            {id: 1, title: "Water plants"},
            {id: 2, title: "Feed pets"},
          ]}
          onSave={() => {
            alert("Consider it saved!")
          }}
        />
      </div>
      <div>
        <h2>Widget</h2>
        <TaskList.Widget
          variants={{
            fallback: ["Layout"],
            placeholder: "Placeholder",
            error: "Error",
          }}
        />
      </div>
      <div>
        <h2>Tour</h2>
        <TaskList.Tour
          variants={{
            fallback: ["Widget", "Layout"],
            placeholder: "Placeholder",
            error: "Error",
          }}
        />
      </div>
    </div>
  )
}

export default App
