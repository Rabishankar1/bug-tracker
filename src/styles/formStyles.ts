import styled from "styled-components";

export const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.primary || "#333"};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

export const Input = styled.input`
  font-size: 0.9rem;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
  transition: 0.2s ease-in-out;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || "#007BFF"};
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
  &:disabled {
    background: #f0f0f0;
    color: #666;
  }
`;

export const TextArea = styled.textarea`
  font-size: 0.9rem;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 6px;
  resize: none;
  transition: 0.2s ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || "#007BFF"};
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

export const Select = styled.select`
  font-size: 0.9rem;
  border: 1px solid #ccc;
  padding: 10px 40px 10px 12px;
  border-radius: 6px;
  transition: 0.2s ease-in-out;
  background: #fff
    url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 5 5-5H0z' fill='%23666'/%3E%3C/svg%3E")
    no-repeat right 12px center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-size: 10px 5px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary || "#007BFF"};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || "#007BFF"};
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    outline: none;
  }

  &:disabled {
    background: #f0f0f0;
    color: #666;
  }
`;
export const Button = styled.button`
  font-size: 0.95rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary || "#007BFF"};
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.2s ease-in-out;
  text-transform: uppercase;
  &.cancel {
    background: #e53e3e;
  }
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover || "#0056b3"};
    &.cancel {
      background: #e53e3e;
    }
  }
`;
