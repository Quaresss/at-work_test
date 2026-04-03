import type { User } from '../types/user';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new Error('Ошибка загрузки пользователей');
  const data: User[] = await response.json();
  return data.slice(0, 6);
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) throw new Error('Ошибка загрузки пользователя');
  return response.json();
};
