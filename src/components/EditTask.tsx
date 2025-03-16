"use client";

import React, { useState, useEffect, useContext } from "react";
import TaskForm from "./TaskForm";
import { useAuth } from "@/app/context/AuthProvider";
import { TaskContext } from "@/app/context/taskContext";
import { updateTask } from "@/utils/localStorageHelpers";

export default function EditTask({
  taskId,
  close,
}: {
  taskId: string;
  close: () => void;
}) {
  const { tasks, setTasks } = useContext(TaskContext);
  const { user } = useAuth();

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    type: "Bug",
    priority: "Low",
    status: "Open",
    assignee: "",
  });

  useEffect(() => {
    const taskToEdit = tasks.find((task: any) => task.id === taskId);
    if (taskToEdit) {
      setInitialValues({
        title: taskToEdit.title,
        description: taskToEdit.description,
        type: taskToEdit.type || "Bug",
        priority: taskToEdit.priority,
        status: taskToEdit.status,
        assignee: taskToEdit.assignee,
      });
    }
  }, [taskId, tasks]);

  async function handleSubmit(formData: {
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    assignee: string;
  }) {
    const updatedTask = {
      id: taskId,
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    const updatedTasks = updateTask(updatedTask);
    if (updatedTasks) {
      setTasks(updatedTasks);
    }
    close();
  }

  return (
    <TaskForm
      key={taskId}
      initialTitle={initialValues.title}
      initialDescription={initialValues.description}
      initialType={initialValues.type}
      initialPriority={initialValues.priority}
      initialStatus={initialValues.status}
      assignee={initialValues.assignee}
      onSubmit={handleSubmit}
      onCancel={close}
    />
  );
}
