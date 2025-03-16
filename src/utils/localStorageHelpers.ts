"use client";

import { Task } from "@/components/Kanbanboard";

interface User {
  id: string;
  username: string;
  password: string;
  role: string;
}

const USERS_KEY = "users";
const TASKS_KEY = "tasks";

export function validateCredentials(username: string, password: string): void {
  if (!username || username.trim().length < 3) {
    throw new Error("Username must be at least 3 characters long.");
  }
  if (!password || password.trim().length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }
}

export function getUsers(): User[] {
  if (typeof window !== "undefined") {
    const usersString = localStorage.getItem(USERS_KEY);
    return usersString ? (JSON.parse(usersString) as User[]) : [];
  }
  return [];
}

export function validateUser(username: string, password: string): User {
  validateCredentials(username, password);
  const users = getUsers();
  const user = users.find(
    (u: User) => u.username === username && u.password === password
  );
  if (!user) {
    throw new Error("Invalid username or password.");
  }
  return user;
}

export function signupUser(newUser: User): void {
  validateCredentials(newUser.username, newUser.password);
  const users = getUsers();
  if (users.some((u: User) => u.username === newUser.username)) {
    throw new Error("Username already exists");
  }
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getTasks(): Task[] {
  if (typeof window !== "undefined") {
    const tasksString = localStorage.getItem(TASKS_KEY);
    return tasksString ? (JSON.parse(tasksString) as Task[]) : [];
  }
  return [];
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
}

export function addTask(task: Task): Task[] {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  return tasks;
}

export function updateTask(updatedTask: Task): Task[] | undefined {
  const tasks = getTasks();
  const index = tasks.findIndex((t: Task) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasks(tasks);
    return tasks;
  }
}

export function deleteTask(taskId: string): void {
  const tasks = getTasks().filter((t: Task) => t.id !== taskId);
  saveTasks(tasks);
}
