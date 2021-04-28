import React from 'react';
import {expose, useAppSelector, useDispatches, useEnhancedEffect} from '@smart-link/context';
import config from '@smart-link/auto-config';
import {Typography} from '@smart-link/core/esm/material-ui';
import TodoList from '../modules/Todo/components/TodoList';
import {todoActions} from '../modules/Todo/store';

const TodoListExpose = props => {
    const {title} = props;
    const {data} = useAppSelector(({todo}) => todo);
    const {removeTodo, todoDone, showDetail, listTodo} = useDispatches(todoActions);
    useEnhancedEffect(() => {
        listTodo();
    }, []);
    return (
        <div className="flex flex-1 flex-col">
            <Typography className="text-15 font-bold m-16">{title}</Typography>
            <TodoList data={data} onClickTodo={showDetail} onRemove={removeTodo} onDone={todoDone} />
        </div>
    );
};

export default expose(config)(TodoListExpose);
