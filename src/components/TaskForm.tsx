"use client";

import React, { useState, useEffect, FormEvent } from "react";
import styled from "styled-components";
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

const typeOptions = ["Bug", "Feature", "Chore"];
const priorityOptions = ["Low", "Medium", "High"];
const statusOptions = ["Open", "In Progress", "Pending Approval", "Closed"];

interface TaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialType?: string;
  initialPriority?: string;
  initialStatus?: string;
  assignee?: string;
  onSubmit: (data: {
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    assignee: string;
  }) => void;
  onCancel: () => void;
}

export default function TaskForm({
  initialTitle = "",
  initialDescription = "",
  initialType = "Bug",
  initialPriority = "Low",
  initialStatus = "Open",
  assignee = "",
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const { user } = useAuth();
  const isManager = user?.role === "Manager";
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [type, setType] = useState(initialType);
  const [priority, setPriority] = useState(initialPriority);
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setType(initialType);
    setPriority(initialPriority);
    setStatus(initialStatus);
  }, [
    initialTitle,
    initialDescription,
    initialType,
    initialPriority,
    initialStatus,
  ]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ title, description, type, priority, status, assignee });
  }


  // const availableStatusOptions = isManager
  //   ? statusOptions
  //   : statusOptions.filter((opt) => opt !== "Closed");

  return (
    <>
      <Title>{initialTitle ? "Edit Task" : "Create New Task"}</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
        />

        <Label htmlFor="type">Type</Label>
        <Select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
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
          onChange={(e) => setPriority(e.target.value)}
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
          onChange={(e) => setStatus(e.target.value)}
          disabled={!isManager && status === "Closed"}
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>

        <Button type="submit">
          {initialTitle ? "Update Task" : "Save Task"}
        </Button>
        <Button className="cancel" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </Form>
    </>
  );
}
