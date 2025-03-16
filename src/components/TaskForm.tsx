"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  Title,
  Form,
  Label,
  Input,
  TextArea,
  Select,
  Button,
} from "@/styles/formStyles";
import { useAuth } from "@/app/context/AuthProvider";
import { getElapsedTime } from "@/utils/helpers";
import { getUsers, User } from "@/utils/localStorageHelpers";
import { Task } from "./Kanbanboard";

const typeOptions = ["Bug", "Feature", "Chore"];
const priorityOptions = ["Low", "Medium", "High"];
const statusOptions = ["Open", "In Progress", "Pending Approval", "Closed"];

interface TaskFormProps {
  initialValues?: Task;
  onSubmit: (data: Task) => void;
  onCancel: () => void;
  createdAt?: string;
}

export default function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const { user } = useAuth();
  const isManager = user?.role === "Manager";
  const availableStatusOptions = isManager
    ? statusOptions
    : statusOptions.filter((opt) => opt !== "Closed");
  const allUsers = getUsers();

  const [values, setValues] = useState<Task>({
    title: "",
    description: "",
    type: typeOptions[0],
    priority: priorityOptions[0],
    status: availableStatusOptions[0],
    assignee: allUsers[0].id,
  });

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      ...values,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  const { title, description, type, priority, status, assignee, createdAt } =
    values;
  const handleSetValues = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Title>{initialValues ? "Edit Task" : "Create New Task"}</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => handleSetValues("title", e.target.value)}
          required
        />

        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => handleSetValues("description", e.target.value)}
          required
          rows={3}
        />

        <Label htmlFor="type">Type</Label>
        <Select
          id="type"
          value={type}
          onChange={(e) => handleSetValues("type", e.target.value)}
          required
        >
          {typeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>

        <Label htmlFor="priority">Priority</Label>
        <Select
          id="priority"
          value={priority}
          onChange={(e) => handleSetValues("priority", e.target.value)}
          required
        >
          {priorityOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>

        <Label htmlFor="status">Status</Label>
        <Select
          id="status"
          value={status}
          onChange={(e) => handleSetValues("status", e.target.value)}
          disabled={!isManager && status === "Closed"}
        >
          {availableStatusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>

        <Label htmlFor="status">Assignee</Label>
        <Select
          id="assignee"
          value={assignee}
          onChange={(e) => handleSetValues("assignee", e.target.value)}
        >
          {allUsers.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </Select>

        {createdAt && (
          <>
            <Label>Time Elapsed</Label>
            <span>{getElapsedTime(createdAt)}</span>
          </>
        )}

        <Button type="submit">
          {initialValues ? "Update Task" : "Save Task"}
        </Button>
        <Button className="cancel" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </Form>
    </>
  );
}
