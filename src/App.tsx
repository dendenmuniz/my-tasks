import React, { FC, useState, ChangeEvent, useEffect } from "react";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";
import { ITaskInterface } from "./interfaces";
import "./App.css";

const App: FC = () => {
  const [taskList, setTaskList] = useState<ITaskInterface[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/tasks")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data as ITaskInterface[];
        setTaskList(data);
      });
  }, []);

  //Create new task
  function handleTaskCreate(tasks: ITaskInterface) {
    const newTasksState: ITaskInterface[] = [...taskList];
    newTasksState.push(tasks);
    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tasks),
    });
    setTaskList(newTasksState);
  }

  //Update task
  function handleTaskUpdate(event: ChangeEvent<HTMLInputElement>, id: string) {
    const newTasksState: ITaskInterface[] = [...taskList];
    newTasksState.find((task: ITaskInterface) => task.id === id)!.taskName =
      event.target.value;
    const taskUpdated: ITaskInterface = newTasksState.find(
      (task: ITaskInterface) => task.id === id!
    )!;
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskName: taskUpdated.taskName,
        isDone: taskUpdated.isDone,
      }),
    });
    setTaskList(newTasksState);
  }

  //Delete task
  function handleTaskRemove(id: string) {
    const newTasksState: ITaskInterface[] = taskList.filter(
      (task: ITaskInterface) => task.id !== id
    );
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setTaskList(newTasksState);
  }

  //Mark task as done/undone
  function handleTaskComplete(id: string) {
    const newTasksState: ITaskInterface[] = [...taskList];
    newTasksState.find((task: ITaskInterface) => task.id === id)!.isDone =
      !newTasksState.find((task: ITaskInterface) => task.id === id)!.isDone;
    const taskUpdated: ITaskInterface = newTasksState.find(
      (task: ITaskInterface) => task.id === id!
    )!;
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskName: taskUpdated.taskName,
        isDone: taskUpdated.isDone,
      }),
    });
    setTaskList(newTasksState);
  }

  function handleTaskBlur(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 0) {
      e.target.classList.add("task-input-error");
    } else {
      e.target.classList.remove("task-input-error");
    }
  }

  //Mark all tasks as done/undone
  function markDoneAllTask(
    e: React.MouseEvent<HTMLInputElement>,
    allDone: boolean
  ) {
    let newTasksState: ITaskInterface[];
    if (allDone) {
      newTasksState = taskList.map((task: ITaskInterface) => {
        task.isDone = true;
        return task;
      });
    } else {
      newTasksState = taskList.map((task: ITaskInterface) => {
        task.isDone = false;
        return task;
      });
    }
    newTasksState.map((task: ITaskInterface) => {
      fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskName: task.taskName,
          isDone: task.isDone,
        }),
      });
    });
    setTaskList(newTasksState);
  }

  //filter and sort tasks
  function filterTask(taskToFilter: string) {
    let newTasksState: ITaskInterface[];
    if (taskToFilter.toUpperCase() === "DONE") {
      setTaskList((task) => [
        ...task.sort(function (x, y) {
          return x.isDone === true ? -1 : y.isDone === true ? 1 : 0;
        }),
      ]);
    } else if (taskToFilter.toUpperCase() === "NOT DONE") {
      setTaskList((task) => [
        ...task.sort(function (x, y) {
          return x.isDone === false ? -1 : y.isDone === false ? 1 : 0;
        }),
      ]);
    } else {
      setTaskList((task) => [
        ...task.sort(function (x, y) {
          return x.taskName === taskToFilter
            ? -1
            : y.taskName === taskToFilter
            ? 1
            : 0;
        }),
      ]);
    }
  }

  return (
    <div className="task-list-app">
      <div className="header">
        <h1>My Tasks - Todo List</h1>
      </div>
      <TaskForm tasks={taskList} handleTaskCreate={handleTaskCreate} />

      <TaskList
        tasks={taskList}
        handleTaskUpdate={handleTaskUpdate}
        handleTaskRemove={handleTaskRemove}
        handleTaskComplete={handleTaskComplete}
        handleTaskBlur={handleTaskBlur}
        handleAllDone={markDoneAllTask}
        handleFilterTask={filterTask}
      />
    </div>
  );
};

export default App;
