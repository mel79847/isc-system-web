import { User } from "../models/userInterface";
import jsonClient from "./jsonServerInstance"


export const getUsers = async () => {
    try {
        const response = await jsonClient.get("users/")
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch users');
        }
    } catch (error) {
        throw new Error('Failed to fetch users ' + (error as Error).message);
    }
}

export const deleteUser = async (id: number) => {
    try {
        const response = await jsonClient.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete user ' + (error as Error).message);
    }
}

export const postUser = async (user: User) => {
    try{
        const response = await jsonClient.post(`/users`, user);
        return response.data;
    } catch(error) {
        throw new Error('Failed to post user ' + (error as Error).message);
    }
}


export const putUser = async (id:number, user: User) => {
    try{
        const response = await jsonClient.put(`/users/${id}`, user);
        return response.data;
    } catch(error) {
        throw new Error('Failed to put user ' + (error as Error).message);
    }
}

export const getUserById = async (id: number) => {
    try {
        const response = await jsonClient.get(`/users/${id}`)
        return response.data
    } catch (error) {
        throw new Error('Failed to get user by id' + (error as Error).message);        
    }
}

export const createUserWIthRoles = async(student: User) => {
    const response = await jsonClient.post('/users', student)
    return response.data
  }