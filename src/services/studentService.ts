import { StudentForm } from '../models/studentInterface';
import apiClient from './apiInstance';

export const getStudents = async () => {
  const response = await apiClient.get('/student');
  return response.data;
};

export const getInterns = async () => {
  const response = await apiClient.get('/interns');
  return response.data;
};

export const getStudentsForGraduation = async () => {
  const response = await apiClient.get('/student/graduation');
  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await apiClient.delete(`/student/${id}`);
  return response.data;
};

// TODO: Create the student interface
export const createStudent = async (student: StudentForm) => {
  const response = await apiClient.post('/student', student);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await apiClient.get(`/student/${id}`);
  return response.data.data;
};

// export const getUserById = async (id: number, userType: 'student' | 'intern') => {
//   const response = await apiClient.get(`/${userType}/${id}`);
//   return response.data.data;
// };
// export const getStudentById = (id: number) => getUserById(id, 'student');
// export const getInternById = (id: number) => getUserById(id, 'intern');


export const updateStudent = async (student: StudentForm) => {
  const response = await apiClient.put(`/student/${student.id}`, student);
  return response.data;
};
