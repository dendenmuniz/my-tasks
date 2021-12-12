import React, { useRef, useState, ChangeEvent, KeyboardEvent } from "react";
import shortid from "shortid";
import { ITaskFormInterface, ITaskInterface } from "../interfaces";

function TaskForm(props: ITaskFormInterface) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState("");

  function handleChangeTask(e: ChangeEvent<HTMLInputElement>) {
    setFormState(e.target.value);
  }

  function handleEnter(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const newTask: ITaskInterface = {
        id: shortid.generate(),
        taskName: formState,
        isDone: false,
      };
      props.handleTaskCreate(newTask);

      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleAddTask() {
      const newTask: ITaskInterface = {
        id: shortid.generate(),
        taskName: formState,
        isDone: false,
      };
      props.handleTaskCreate(newTask);
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
  }

  return (
    <div className="task-form">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter new task"
        onChange={(e) => handleChangeTask(e)}
        onKeyPress={(e) => handleEnter(e)}
      />
      <input type="button" value="Add" onClick={handleAddTask} />
    </div>
  );
}

export default TaskForm;
