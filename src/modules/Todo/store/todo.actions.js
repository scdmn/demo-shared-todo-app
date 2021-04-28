import {appKey} from '@smart-link/app-info';
import {batch} from 'react-redux';
import {messageActions} from '@smart-link/core';
import {immutableHelper} from '@smart-link/context';
import {actions} from './todo.slice';
import * as Apis from '../../../apis';

let todoId = 1;

export const listTodo = () => async dispatch => {
    const list = await Apis.listTodo();
    dispatch(actions.setData(list));
};

export const showDialog = event => dispatch => {
    dispatch(actions.setOpen(true));
};

export const closeDialog = () => dispatch => {
    batch(() => {
        dispatch(actions.setActiveTodo(null));
        dispatch(actions.setOpen(false));
    });
};

export const showDetail = todo => dispatch => {
    batch(() => {
        dispatch(actions.setActiveTodo(todo));
        dispatch(actions.setOpen(true));
    });
};

export const addOrUpdateTodo = todo => async (dispatch, getState) => {
    const {
        [appKey]: {
            todo: {data},
        },
    } = getState();

    let newData;
    if (todo.id) {
        newData = immutableHelper.updateArray(data, todo);
        await Apis.updateTodo(todo);
    } else {
        const newTodo = {...todo, id: `${todoId++}`};
        await Apis.addTodo(newTodo);
        newData = [...data, newTodo];
    }

    batch(() => {
        dispatch(actions.setData(newData));
        dispatch(actions.setActiveTodo(null));
        dispatch(actions.setOpen(false));
        dispatch(messageActions.tipsSuccess('待办提交成功'));
    });
};

export const removeTodo = todo => (dispatch, getState) => {
    const {
        [appKey]: {
            todo: {data},
        },
    } = getState();

    const newData = immutableHelper.removeItem(data, todo);
    dispatch(actions.setData(newData));
};

export const todoDone = todo => (dispatch, getState) => {
    const {
        [appKey]: {
            todo: {data},
        },
    } = getState();

    const newData = immutableHelper.updateArray(data, {...todo, done: true});
    dispatch(actions.setData(newData));
};
