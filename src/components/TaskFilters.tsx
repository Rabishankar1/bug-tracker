import React from "react";
import styled from "styled-components";

const FiltersContainer = styled.div`
  margin-bottom: 16px;
  text-align: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

const priorityOptions = ["All", "High", "Medium", "Low"];
const statusOptions = [
  "All",
  "Open",
  "In Progress",
  "Pending Approval",
  "Closed",
];

interface TaskFiltersProps {
  filterPriority: string;
  filterStatus: string;
  searchQuery: string;
  onPriorityChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export default function TaskFilters({
  filterPriority,
  filterStatus,
  searchQuery,
  onPriorityChange,
  onStatusChange,
  onSearchChange,
}: TaskFiltersProps) {
  return (
    <FiltersContainer>
      <FilterGroup>
        <Label htmlFor="priorityFilter">Priority:</Label>
        <Select
          id="priorityFilter"
          value={filterPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          {priorityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FilterGroup>
      <FilterGroup>
        <Label htmlFor="statusFilter">Status:</Label>
        <Select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FilterGroup>
      <FilterGroup>
        <Label htmlFor="searchInput">Search:</Label>
        <Input
          id="searchInput"
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </FilterGroup>
    </FiltersContainer>
  );
}
