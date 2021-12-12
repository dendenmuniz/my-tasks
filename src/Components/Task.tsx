import React, { ChangeEvent, useEffect, useState } from "react";
import { ITask } from "../interfaces";

function Task(props: ITask) {
  const [extraClass, setExtraClass] = useState(false);

  useEffect(() => {
    if (props.tasks.isDone) {
      setExtraClass(true);
    } else {
      setExtraClass(false);
    }
  }, [props.tasks.isDone]);
  
  return (
    <div className="task-item">
      <div onClick={() => props.handleTaskComplete(props.tasks.id)}>
        {props.tasks.isDone ? (
          <span className="task-item-checked">✔</span>
        ) : (
          <span className="task-item-unchecked" />
        )}
      </div>

      <div className="task-item-input-wrapper">
        <input
          className={extraClass ? "task-item-input-done" : ""}
          value={props.tasks.taskName}
          onBlur={props.handleTaskBlur}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            props.handleTaskUpdate(e, props.tasks.id)
          }
        />
      </div>

      <div
        className="item-remove"
        onClick={() => props.handleTaskRemove(props.tasks.id)}
      >
        ⨯
      </div>
    </div>
  );
}

export default Task;
