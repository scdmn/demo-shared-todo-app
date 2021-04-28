import {immutableHelper} from '@smart-link/context';
import todoDb from './todo.db';

export const listTodo = mock => {
    mock.onGet('/todo/listTodo').reply(200, todoDb.data);
};

export const addTodo = mock => {
    mock.onPost('/todo/addTodo').reply(request => {
        const todo = JSON.parse(request.data);
        todoDb.data = [...todoDb.data, {...todo}];
        console.log('addTodo success', todoDb.data);
        return [200, {}];
    });
};

export const updateTodo = mock => {
    mock.onPost('/todo/updateTodo').reply(request => {
        const todo = JSON.parse(request.data);
        todoDb.data = immutableHelper.updateArray(todoDb.data, todo);
        console.log('updateTodo success', todoDb.data);
        return [200, {}];
    });
};
