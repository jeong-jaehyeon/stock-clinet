export const saveToken = (token: string) => {
    localStorage.setItem('access_token', token);
};

export const loadToken = (): string | null => {
    return localStorage.getItem('access_token');
};

export const clearToken = () => {
    localStorage.removeItem('access_token');
};
