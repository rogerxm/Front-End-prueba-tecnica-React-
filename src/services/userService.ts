import type { User } from "../types/user";

const API_URL = "https://jsonplaceholder.typicode.com";

// Obtiene todos los usuarios de la API
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error(`Error al cargar los usuarios: ${response.statusText}`);
    }
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtiene un usuario por su ID
export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(
        `Error al cargar el usuario ${id}: ${response.statusText}`
      );
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
