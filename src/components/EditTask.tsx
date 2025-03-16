"use client";

import React, { useState, useEffect, useContext } from "react";
import TaskForm from "./TaskForm";
import { TaskContext } from "@/app/context/taskContext";
import { updateTask } from "@/utils/localStorageHelpers";
import { Task } from "./Kanbanboard";

export default function EditTask({
  taskId,
  close,
}: {
  taskId: string;
  close: () => void;
}) {
  const { tasks, setTasks } = useContext(TaskContext);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    type: "Bug",
    priority: "Low",
    status: "Open",
    assignee: "",
    createdAt: "",
  });

  useEffect(() => {
    const task = tasks.find((task: Task) => task.id === taskId);
    if (task) {
      setInitialValues(task);
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
      ...formData,
      id: taskId,
      createdAt: initialValues.createdAt,
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
      createdAt={initialValues.createdAt}
    />
  );
}
