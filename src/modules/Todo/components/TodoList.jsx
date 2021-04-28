import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {makeAppStyles} from '@smart-link/context';
import clsx from 'clsx';
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from '@smart-link/core/material-ui';
import {SmartLinkIcon} from '@smart-link/core';

const TodoList = memo(props => {
    const {className, data = [], onClickTodo, onDone, onRemove} = props;
    const classes = useStyles(props);
    return (
        <List className={clsx(classes.root, className)}>
            {data.map(item => (
                <ListItem
                    button
                    key={item.id}
                    className={clsx({[classes.done]: item.done}, 'h-64')}
                    onClick={() => {
                        onClickTodo && onClickTodo(item);
                    }}
                >
                    <ListItemText className="pl-8" primary={item.title} secondary={item.content} />
                    <ListItemSecondaryAction className="pr-20">
                        {!item.done && (
                            <IconButton
                                edge="end"
                                className="mr-12"
                                onClick={() => {
                                    onDone && onDone(item);
                                }}
                            >
                                <SmartLinkIcon name="Done" />
                            </IconButton>
                        )}
                        <IconButton
                            edge="end"
                            onClick={() => {
                                onRemove && onRemove(item);
                            }}
                        >
                            <SmartLinkIcon name="Delete" />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
});

TodoList.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    data: PropTypes.array,
    onClickTodo: PropTypes.func,
    onDone: PropTypes.func,
    onRemove: PropTypes.func,
};

const useStyles = makeAppStyles(
    theme => ({
        root: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
        },
        done: {
            textDecoration: 'line-through!important',
        },
    }),
    {name: 'TodoList'},
);

export default TodoList;
