"use client";

import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "./TaskForm";
import { saveTasks } from "@/utils/localStorageHelpers";
import { useAuth } from "@/app/context/AuthProvider";
import { TaskContext } from "@/app/context/taskContext";
import { Task } from "./Kanbanboard";

export default function NewTask({ close }: { close: () => void }) {
  const { tasks, setTasks } = useContext(TaskContext);

  function handleSubmit(formData: Task) {
    const newTask: Task = {
      id: uuidv4(),
      ...formData,
    };
    setTasks([...tasks, newTask]);
    saveTasks([...tasks, newTask]);

    close();
  }

  return <TaskForm onSubmit={handleSubmit} onCancel={close} />;
}
