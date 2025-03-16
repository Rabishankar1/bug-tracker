import styled from "styled-components";
import DraggableTask from "./DraggableTask";
import { Task } from "./Kanbanboard";

const ColumnWrapper = styled.div<{ status: string }>`
  background: ${({ status }) => {
    switch (status) {
      case "Open":
        return "#e0f7fa";
      case "In Progress":
        return "#fff9c4";
      case "Pending Approval":
        return "#ffe0b2";
      case "Closed":
        return "#c8e6c9";
      default:
        return "#f4f4f4";
    }
  }};
  padding: 16px;
  border-radius: 8px;
  width: 350px;
  min-height: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ColumnTitle = styled.h2`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface TaskColumnProps {
  status: string;
  tasks: Task[];
  handleDrop: (status: string) => void;
  handleDragStart: (task: Task) => void;
  handleDelete: (taskId: string) => void;
  handleStatusUpdate: (updatedTask: Task) => void;
  setIsEditing: (isEditing: string) => void;
  handleDuplicate: (task: Task) => void;
}

export default function TaskColumn({
  status,
  tasks,
  handleDrop,
  handleDragStart,
  handleDelete,
  handleStatusUpdate,
  setIsEditing,
  handleDuplicate,
}: TaskColumnProps) {
  return (
    <ColumnWrapper
      status={status}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(status)}
    >
      <ColumnTitle>{status}</ColumnTitle>
      <TaskList>
        {tasks.map((task: Task) => (
          <DraggableTask
            key={task.id}
            task={task}
            handleDragStart={handleDragStart}
            handleDelete={handleDelete}
            handleStatusUpdate={handleStatusUpdate}
            setIsEditing={setIsEditing}
            handleDuplicate={handleDuplicate}
          />
        ))}
      </TaskList>
    </ColumnWrapper>
  );
}
