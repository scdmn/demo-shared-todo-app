import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {SmartLinkIcon} from '@smart-link/core';
import {makeAppStyles} from '@smart-link/context';
import {AppBar, Toolbar, Typography, IconButton} from '@smart-link/core/material-ui';
import clsx from 'clsx';

const TodoToolbar = memo(props => {
    const {className, onShowDialog} = props;
    const classes = useStyles(props);

    return (
        <AppBar className={clsx(classes.root, className)} elevation={0}>
            <Toolbar className="justify-between">
                <div>
                    <Typography className="text-15 font-bold">待办列表</Typography>
                </div>
                <div>
                    <IconButton color="inherit" onClick={onShowDialog}>
                        <SmartLinkIcon name="Add" />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
});

TodoToolbar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    onShowDialog: PropTypes.func,
};

const useStyles = makeAppStyles(
    theme => ({
        root: {
            display: 'flex',
            position: 'relative',
        },
    }),
    {name: 'TodoToolbar'},
);

export default TodoToolbar;
