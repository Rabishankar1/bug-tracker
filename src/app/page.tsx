"use client";
import styled from "styled-components";
import Tasks from "./tasks/page";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 20px;
  align-items: center;
  justify-items: center;
  min-height: 100vh;
  padding-bottom: 5rem;
  gap: 4rem;
  font-family: var(--font-geist-sans);
  background: #f9f9f9;

`;


const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
  grid-row-start: 2;
  align-items: center;

  @media (min-width: 640px) {
    align-items: flex-start;
  }
`;

const Footer = styled.footer`
  grid-row-start: 3;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <Container>
      <Main>
        <Tasks />
      </Main>
      <Footer />
    </Container>
  );
}
