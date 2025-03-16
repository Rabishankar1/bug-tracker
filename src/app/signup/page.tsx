"use client";

import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { signupUser } from "@/utils/localStorageHelpers";
import { useAuth } from "@/app/context/AuthProvider";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f9f9f9;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #0070f3;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 112, 243, 0.3);
  }
`;

const Select = styled.select`
  font-size: 1rem;
  border: 1px solid #ccc;
  padding: 12px 40px 12px 12px;
  border-radius: 6px;
  transition: border-color 0.2s ease-in-out;
  background: #fff
    url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 5 5-5H0z' fill='%23666'/%3E%3C/svg%3E")
    no-repeat right 12px center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-size: 10px 5px;

  &:hover {
    border-color: #0070f3;
  }

  &:focus {
    border-color: #0070f3;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 112, 243, 0.3);
  }
`;

const Button = styled.button`
  background: #0070f3;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #005bb5;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  text-align: center;
`;

const StyledLink = styled.a`
  color: #0070f3;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

export const roles = ["Developer", "Manager"];

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const newUser = {
        id: Date.now().toString(),
        username,
        password,
        role,
      };
      signupUser(newUser);
      await login(username, password);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  // Generic change handler for username, password, and role
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
    else if (name === "role") setRole(value);
    if (error) setError("");
  };

  return (
    <Container>
      <Card>
        <Title>Signup</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
          />
          <Select
            name="role"
            value={role}
            onChange={handleInputChange}
            required
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </Select>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Button type="submit">Signup</Button>
        </Form>
        <p style={{ textAlign: "center", marginTop: "16px" }}>
          Already have an account?{" "}
          <StyledLink href="/login">Login here</StyledLink>
        </p>
      </Card>
    </Container>
  );
}
