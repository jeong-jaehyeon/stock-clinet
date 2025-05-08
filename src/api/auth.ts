import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/auth';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
}

export const login = async (payload: LoginPayload) => {
    const res = await axios.post(`${API_BASE_URL}/login`, payload);
    return res.data.data; // { token, user }
};

export const register = async (payload: RegisterPayload) => {
    const res = await axios.post(`${API_BASE_URL}/register`, payload);
    return res.data.data; // { id, email }
};
