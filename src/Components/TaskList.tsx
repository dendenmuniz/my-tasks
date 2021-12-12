import React, { ChangeEvent, KeyboardEvent, useRef, useState, MouseEvent, useEffect } from "react";
import Task from "./Task";
import { TaskListInterface, ITaskInterface } from "../interfaces";

function TaskList(props: TaskListInterface) {
  let buttonRef = useRef<HTMLElement>(document.getElementById("allDone")!);
  const [buttonText, setButtonText] = useState<string>("");
  const [formState, setFormState] = useState("");

  useEffect(() => {
    if (props.tasks.length > 0) {
      setButtonText("All Done");
    } else if (props.tasks.length > 0 && props.tasks.every(task => task.isDone)) {
      setButtonText("Undo All");
    } else {
      setButtonText("All Done");
    }
  }, []);

  function handleTaskToSearch(e: ChangeEvent<HTMLInputElement>) {
    setFormState(e.target.value);
  }

  function handleSearch(e: KeyboardEvent) {
    if (e.key === "Enter") {
      props.handleFilterTask(formState);
    }
  }

  function handleAllDone(e: MouseEvent<HTMLInputElement>) {
    if (buttonText === "All Done") {
    props.handleAllDone(e, true);
    setButtonText("All Undone");
    } else {
      props.handleAllDone(e, false);
      setButtonText("All Done");
    }
  }

  return (
    <div className="task-list">
      <ul>
        <li className="task-form">
          <input
            type="text"
            placeholder="Search task"
            onChange={(e) => handleTaskToSearch(e)}
            onKeyPress={(e) => handleSearch(e)}
          />
          <input type="button" id="allDone" value={buttonText} onClick={(e) => {handleAllDone(e)}} />
        </li>
      </ul>
      <ul>
        {props.tasks.map((tasks: ITaskInterface) => (
          <li key={tasks.id}>
            <Task
              tasks={tasks}
              handleTaskUpdate={props.handleTaskUpdate}
              handleTaskRemove={props.handleTaskRemove}
              handleTaskComplete={props.handleTaskComplete}
              handleTaskBlur={props.handleTaskBlur}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
