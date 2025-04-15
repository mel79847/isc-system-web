import { UserRequest } from '../models/userInterface';
import apiClient from './apiInstance';
import { ProfessorInterface } from './models/Professor';
import { putUser } from './usersService';

const getMentors = async () => {
  try {
    const response = await apiClient.get(`professor`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los tutores:', error);
    throw error;
  }
};

const createProfessor = async (professor: ProfessorInterface) => {
  try {
    const response = await apiClient.post(`professor`, professor);
    return response.data;
  } catch (error) {
    console.error('Error al crear el tutor:', error);
    throw error;
  }
};
type ProfessorWithId = UserRequest & { id: number };

export const updateProfessor = async (professor: ProfessorWithId) => {
  const response = await putUser(professor.id, professor);
  return response;
};

export { getMentors, createProfessor };
