"use client";
import { Task } from "@/components/Kanbanboard";
import { createContext } from "react";

export const TaskContext = createContext<{
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}>({
  tasks: [],
  setTasks: () => {},
});
