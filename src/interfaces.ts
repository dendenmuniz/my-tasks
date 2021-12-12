
export interface ITaskInterface {
  id: string;
  taskName: string;
  isDone: boolean;
}

export interface ITaskFormInterface {
  tasks: ITaskInterface[];
  handleTaskCreate: (tasks: ITaskInterface) => void;
}

export interface TaskListInterface {
  handleTaskUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleTaskRemove: (id: string) => void;
  handleTaskComplete: (id: string) => void;
  handleTaskBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAllDone: (event: React.MouseEvent<HTMLInputElement>, done: boolean) => void;
  handleFilterTask: (taskToFilter: string) => void;
  tasks: ITaskInterface[]
}

export interface ITask {
  handleTaskUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleTaskRemove: (id: string) => void;
  handleTaskComplete: (id: string) => void;
  handleTaskBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tasks: ITaskInterface;
}