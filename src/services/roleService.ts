import apiClient from "./apiInstance"

const route = "roles/";

export const getRoles = async ()=>{
  try {
    const response = await apiClient.get(route);
    return response.data
  } catch (error) {
    throw new Error('Failed to get roles: ' + (error as Error).message);
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