import apiClient from "./apiInstance";
import { ProfessorInterface } from "./models/Professor";

const getMentors = async () => {
  try {
    const response = await apiClient.get(`professor`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los tutores:", error);
    throw error;
  }
};

const createProfessor = async (professor: ProfessorInterface) => {
  try {
    const response = await apiClient.post(`professor`, professor);
    return response.data;
  } catch (error) {
    console.error("Error al crear el tutor:", error);
    throw error;
  }
};

export { getMentors, createProfessor };
