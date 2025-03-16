"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "@/app/context/AuthProvider";
import { updateTask } from "@/utils/localStorageHelpers";
import { useRouter } from "next/navigation";
import KanbanBoard from "@/components/Kanbanboard";

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: ${({ theme }) => theme.spacing.large};
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary || "#333"};
`;

export default function Tasks() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, router, loading]);

  if (!user) {
    return (
      <Container>
        <Title>Loading...</Title>
      </Container>
    );
  }

  return <KanbanBoard updateTaskStatus={updateTask} />;
}
