import {createAppSlice} from '@smart-link/context';
import {appKey} from '@smart-link/app-info';

const initialState = {
    activeTodo: null,
    data: [],
    open: false,
};

const todoSlice = createAppSlice({
    appKey,
    name: 'todo',
    initialState,
});

export const {reducer, selector, actions} = todoSlice;
