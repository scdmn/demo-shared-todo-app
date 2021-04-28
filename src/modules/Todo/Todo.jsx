import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {makeAppStyles, useDispatches, useEnhancedEffect} from '@smart-link/context';
import clsx from 'clsx';
import TodoToolbar from './components/TodoToolbar';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import {todoActions, todoSelector} from './store';

const Todo = memo(props => {
    const {className} = props;
    const classes = useStyles(props);

    const {data, open, activeTodo} = todoSelector.todo();
    const {listTodo, addOrUpdateTodo, closeDialog, removeTodo, todoDone, showDetail, showDialog} = useDispatches(
        todoActions,
    );

    useEnhancedEffect(() => {
        listTodo();
    }, []);

    return (
        <div className={clsx(classes.root, className)}>
            <TodoToolbar onShowDialog={showDialog} />
            <TodoList data={data} onClickTodo={showDetail} onRemove={removeTodo} onDone={todoDone} />
            <TodoForm activeTodo={activeTodo} open={open} onClose={closeDialog} onSubmit={addOrUpdateTodo} />
        </div>
    );
});

Todo.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
};

const useStyles = makeAppStyles(
    theme => ({
        root: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
        },
        content: {
            display: 'flex',
            flex: 1,
            fontSize: '3rem',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }),
    {name: 'Todo'},
);

export default Todo;
