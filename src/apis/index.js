import api from './api.config';

export const listTodo = () => api.get('/todo/listTodo');
export const addTodo = todo => api.post('/todo/addTodo', todo);
export const updateTodo = todo => api.post('/todo/updateTodo', todo);
