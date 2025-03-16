"use client";

import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskForm from "./TaskForm";
import { addTask } from "@/utils/localStorageHelpers";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthProvider";
import { TaskContext } from "@/app/context/taskContext";

export default function NewTask({ close }: { close: () => void }) {
  const { user } = useAuth();
  const router = useRouter();
  const { tasks, setTasks } = useContext(TaskContext);

  const assignee = user?.username || "";

  function handleSubmit(formData: {
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    assignee: string;
  }) {
    const newTask = {
      id: uuidv4(),
      ...formData,
      assignee,
      createdAt: new Date().toISOString(),
      timeSpent: 0,
      timerStart: null,
    };
    const updatedTasks = addTask(newTask);
    if (updatedTasks) {
      setTasks(updatedTasks);
    }
    close();
  }

  return <TaskForm assignee={assignee} onSubmit={handleSubmit} onCancel={close} />;
}
