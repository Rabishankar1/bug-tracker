import styled from "styled-components";
import { Task } from "./Kanbanboard";
import { useAuth } from "../app/context/AuthProvider";

interface TaskContainerProps {
  priority: string;
  disabled?: boolean;
}

const TaskContainer = styled.div<TaskContainerProps>`
  background: #ffffff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  border-left: 8px solid
    ${({ priority }) => {
      switch (priority) {
        case "High":
          return "#e53e3e";
        case "Medium":
          return "#fddb92";
        case "Low":
          return "#6495ed";
        default:
          return "#ccc";
      }
    }};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  h2 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #333;
  }
`;

const InlineField = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const FieldContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 6px;
`;

const FieldLabel = styled.span`
  font-weight: 600;
  color: #333;
  min-width: 70px;
`;

const FieldValue = styled.span`
  font-size: 0.95rem;
  color: #555;
`;

const PrioritySelect = styled.select`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 0.95rem;
  color: #555;
  min-width: 100px;
  background: #fff
    url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 5 5-5H0z' fill='%23666'/%3E%3C/svg%3E")
    no-repeat right 8px center;
  background-size: 10px 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const Button = styled.button`
  font-size: 0.85rem;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.1s ease;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  background: #0070f3;
  color: #fff;

  &.delete {
    background: #e53e3e;
  }

  &.secondary {
    background: #6c757d;
  }
`;

interface DraggableTaskProps {
  task: Task;
  handleDragStart: (task: Task) => void;
  handleDelete: (taskId: string) => void;
  handleStatusUpdate: (updatedTask: Task) => void;
  setIsEditing: (isEditing: string) => void;
  handleDuplicate: (task: Task) => void;
}

export default function DraggableTask({
  task,
  handleDragStart,
  handleDelete,
  handleStatusUpdate,
  setIsEditing,
  handleDuplicate,
}: DraggableTaskProps) {
  const { user } = useAuth();
  const isManager = user?.role === "Manager";


  const disabledForDrag = !isManager && task.status === "Closed";

  const updateTaskPriority = (newPriority: string) => {
    handleStatusUpdate({ ...task, priority: newPriority });
  };

  return (
    <TaskContainer
      priority={task.priority}
      disabled={disabledForDrag}
      draggable={!disabledForDrag}
      onDragStart={() => handleDragStart(task)}
    >
      <h2>{task.title}</h2>
      <FieldContainer>
        <FieldLabel>Type:</FieldLabel>
        <FieldValue>{task.type}</FieldValue>
      </FieldContainer>

      <InlineField>
        <FieldLabel>Priority:</FieldLabel>
        <PrioritySelect
          value={task.priority}
          onChange={(e) => updateTaskPriority(e.target.value)}
        >
          {["High", "Medium", "Low"].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </PrioritySelect>
      </InlineField>

      <FieldContainer>
        <FieldLabel>Status:</FieldLabel>
        <FieldValue>{task.status}</FieldValue>
      </FieldContainer>

      <FieldContainer>
        <FieldLabel>Description:</FieldLabel>
        <FieldValue>{task.description}</FieldValue>
      </FieldContainer>

      <ButtonContainer>
        <Button onClick={() => setIsEditing(task.id)}>Edit</Button>
        <Button onClick={() => handleDuplicate(task)}>Duplicate</Button>
        {task.status === "Closed" && isManager && (
          <Button
            className="secondary"
            onClick={() => handleStatusUpdate({ ...task, status: "Open" })}
          >
            Reopen
          </Button>
        )}
        {isManager && (
          <Button className="delete" onClick={() => handleDelete(task.id)}>
            Delete
          </Button>
        )}
      </ButtonContainer>
    </TaskContainer>
  );
}
