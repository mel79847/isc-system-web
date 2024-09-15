import apiClient from "./apiInstance"
import jsonClient from "./jsonServerInstance";

const route = "roles/";

export const getRoles = async ()=>{
  try {
    const response = await apiClient.get(route);
    return response.data
  } catch (error) {
    throw new Error('Failed to get roles: ' + (error as Error).message);
  }
}

export const getProfessorRoles = async () => {
  try {
    const response = await jsonClient.get('professorRoles/')
    return response.data
  } catch (error) {
    throw new Error('Failed to get professor roles' + (error as Error).message)
  }
}

export const getStudentRoles = async () => {
  try {
    const response = await jsonClient.get('studentRoles/')
    return response.data
  } catch (error) {
    throw new Error('Failed to get student roles' + (error as Error).message)
  }
}

export const addRole = async (role: {name: string}) => {
  try {
    const response = await apiClient.post(route, role);
    console.log(response)
    return response.data;
  }catch (error) {
    throw new Error('Failed to add role: ' + (error as Error).message);
  }
};

export const editRole = async (id:number, role: {name: string}) => {
  try {
    const response = await apiClient.put(route+id, role);
    return response.data;
  }catch (error) {
    throw new Error('Failed to edit role: ' + (error as Error).message);
  }
};

export const deleteRole = async (id:number) => {
  try {
    const response = await apiClient.delete(route+id);
    return response.data;
  }catch (error) {
    throw new Error('Failed to delete role: ' + (error as Error).message);
  }
};

export const addPermisionToRol = async (role_id: number, permission_id: number) => {
  try {
    const response = await apiClient.post(`${route}permissions/`, {role_id, permission_id});
    return response.data;
  }catch (error) {
    throw new Error('Failed to add a permission: ' + (error as Error).message);
  }
};

export const removePermisionToRol = async (role_id: number, permission_id: number) => {
  try {
    const response = await apiClient.delete(`${route}permissions/`,{data:{role_id,permission_id}});
    return response.data;
  } catch (error) {
    throw new Error('Failed to remove a permission: ' + (error as Error).message);
  }
};
