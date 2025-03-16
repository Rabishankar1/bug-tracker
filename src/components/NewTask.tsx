"use client";

import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "./TaskForm";
import { addTask } from "@/utils/localStorageHelpers";
import { useAuth } from "@/app/context/AuthProvider";
import { TaskContext } from "@/app/context/taskContext";
import { Task } from "./Kanbanboard";

export default function NewTask({ close }: { close: () => void }) {
  const { user } = useAuth();
  const { setTasks } = useContext(TaskContext);

  const assignee = user?.username || "";

  function handleSubmit(formData: {
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    assignee: string;
  }) {
    const newTask: Task = {
      id: uuidv4(),
      ...formData,
      assignee,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedTasks = addTask(newTask);
    if (updatedTasks) {
      setTasks(updatedTasks);
    }
    close();
  }

  return (
    <TaskForm assignee={assignee} onSubmit={handleSubmit} onCancel={close} />
  );
}
