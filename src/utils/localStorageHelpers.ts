"use client";

const USERS_KEY = "users";
const TASKS_KEY = "tasks";

export function validateCredentials(username: string, password: string) {
  if (!username || username.trim().length < 3) {
    throw new Error("Username must be at least 3 characters long.");
  }
  if (!password || password.trim().length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }
}

export function getUsers() {
  if (typeof window !== "undefined") {
    const usersString = localStorage.getItem(USERS_KEY);
    return usersString ? JSON.parse(usersString) : [];
  }
  return [];
}

export function validateUser(username: string, password: string) {
  validateCredentials(username, password);
  const users = getUsers();
  const user = users.find(
    (u: any) => u.username === username && u.password === password
  );
  if (!user) {
    throw new Error("Invalid username or password.");
  }
  return user;
}

export function signupUser(newUser: any) {
  validateCredentials(newUser.username, newUser.password);
  const users = getUsers();
  if (users.some((u: any) => u.username === newUser.username)) {
    throw new Error("Username already exists");
  }
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getTasks() {
  if (typeof window !== "undefined") {
    const tasksString = localStorage.getItem(TASKS_KEY);
    return tasksString ? JSON.parse(tasksString) : [];
  }
  return [];
}

export function saveTasks(tasks: any[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
}

export function addTask(task: any) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  return tasks;
}

export function updateTask(updatedTask: any) {
  const tasks = getTasks();
  const index = tasks.findIndex((t: any) => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasks(tasks);
    return tasks;
  }
}

export function deleteTask(taskId: string) {
  const tasks = getTasks().filter((t: any) => t.id !== taskId);
  saveTasks(tasks);
}
