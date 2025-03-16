"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import TaskColumn from "./TaskColumn";
import TaskFilters from "./TaskFilters";
import Modal from "./ui/modal";
import NewTask from "./NewTask";
import { TaskContext } from "@/app/context/taskContext";
import { deleteTask, getTasks, saveTasks } from "@/utils/localStorageHelpers";
import { useAuth } from "../app/context/AuthProvider";
import EditTask from "./EditTask";

const BoardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ColumnsContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NewTaskLink = styled.a`
  display: block;
  background: #28a745;
  color: white;
  text-align: center;
  padding: 10px 16px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.2s ease-in-out;
  margin-bottom: 16px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    margin: 0 auto 16px auto;
  }
`;

export interface Task {
  id: string;
  title: string;
  type: string;
  priority: string;
  assignee: string;
  status: string;
  description: string;
  timerStart: number;
  timeSpent: number;
}

interface KanbanBoardProps {
  updateTaskStatus: (task: Task) => void;
}

export default function KanbanBoard({ updateTaskStatus }: KanbanBoardProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleDragStart = (task: Task) => setDraggedTask(task);

  const handleDrop = (status: string) => {
    if (status === "Closed" && user?.role !== "Manager") {
      return alert("You do not have permission to close tasks!");
    }
    if (draggedTask) {
      const updatedTask = { ...draggedTask, status };
      const updatedTasks = tasks.map((task) =>
        task.id === draggedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
      updateTaskStatus(updatedTask);
      setDraggedTask(null);
    }
  };

  const handleDelete = (taskId: string) => {
    if (user?.role === "Manager" || user?.role === "Developer") {
      deleteTask(taskId);
      setTasks(getTasks());
    } else {
      alert("You do not have permission to delete tasks!");
    }
  };

  const handleStatusUpdate = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    updateTaskStatus(updatedTask);
  };

  const handleDuplicate = (task: Task) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      title: task.title + " (Copy)",
    };
    setTasks([...tasks, newTask]);
    saveTasks([...tasks, newTask]);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;
    const matchesStatus =
      filterStatus === "All" || task.status === filterStatus;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesPriority && matchesStatus && matchesSearch;
  });

  const boardStatuses = ["Open", "In Progress", "Pending Approval", "Closed"];

  return (
    <BoardContainer>
      <NewTaskLink onClick={() => setModalOpen(true)}>
        + Create New Task
      </NewTaskLink>
      <TaskFilters
        filterPriority={filterPriority}
        filterStatus={filterStatus}
        onPriorityChange={setFilterPriority}
        onStatusChange={setFilterStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <TaskContext.Provider value={{ tasks, setTasks }}>
        <Modal opened={modalOpen} closeModal={() => setModalOpen(false)}>
          <NewTask close={() => setModalOpen(false)} />
        </Modal>
        <Modal opened={!!isEditing} closeModal={() => setIsEditing(null)}>
          <EditTask taskId={isEditing || ""} close={() => setIsEditing(null)} />
        </Modal>
        <ColumnsContainer>
          {boardStatuses.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={filteredTasks.filter((task) => task.status === status)}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart}
              handleDelete={handleDelete}
              handleStatusUpdate={handleStatusUpdate}
              setIsEditing={setIsEditing}
              handleDuplicate={handleDuplicate} // <-- New prop added here
            />
          ))}
        </ColumnsContainer>
      </TaskContext.Provider>
    </BoardContainer>
  );
}
