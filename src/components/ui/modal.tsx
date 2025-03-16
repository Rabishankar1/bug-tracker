import React, { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: white;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
  }
`;

const OpenModalButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ModalProps {
  opened: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ opened, closeModal, children }: ModalProps) {
  return (
    <ModalContainer $show={opened} onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        {children}
      </ModalContent>
    </ModalContainer>
  );
}
