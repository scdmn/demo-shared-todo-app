import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {makeAppStyles, useEnhancedEffect} from '@smart-link/context';
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Toolbar,
    Typography,
    InputBase,
} from '@smart-link/core/material-ui';
import clsx from 'clsx';
import {useForm} from 'react-hook-form';
import {SmartLinkInput, SmartLinkTextarea} from '@smart-link/core';

const TodoForm = memo(props => {
    const {className, activeTodo, open = false, onClose, onSubmit} = props;
    const classes = useStyles(props);

    const {errors, handleSubmit, register} = useForm();

    return (
        <Dialog className={clsx(classes.root, className)} open={open} onClose={onClose}>
            <AppBar position="relative" elevation={0}>
                <Toolbar variant="dense">
                    <Typography className="text-15 font-bold ">{activeTodo ? '编辑待办' : '新增待办'}</Typography>
                </Toolbar>
            </AppBar>
            <DialogContent classes={{root: 'p-8 w-sm'}}>
                <form className="m-24">
                    <InputBase
                        type="hidden"
                        name="id"
                        className="hidden"
                        inputRef={register()}
                        defaultValue={activeTodo ? activeTodo.id : null}
                    />
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl className="flex flex-col">
                                <FormLabel className="mb-8 w-full">标题</FormLabel>
                                <SmartLinkInput
                                    autoFocus
                                    fullWidth
                                    defaultValue={activeTodo ? activeTodo.title : null}
                                    name="title"
                                    error={!!errors.title}
                                    inputRef={register({
                                        required: {value: true, message: '需要填写标题！'},
                                        maxLength: 64,
                                    })}
                                    clearable
                                />
                                {errors.title ? (
                                    <FormHelperText className="pl-0">{errors.title.message}</FormHelperText>
                                ) : (
                                    <FormHelperText className="pl-0"> </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl className="flex flex-col mt-10">
                                <FormLabel className="mb-8 w-full">内容</FormLabel>
                                <SmartLinkTextarea
                                    name="content"
                                    defaultValue={activeTodo ? activeTodo.content : null}
                                    error={!!errors.content}
                                    ref={register({required: {value: true, message: '需要填写内容！'}})}
                                    rows={5}
                                    fullWidth
                                />
                                {errors.content ? (
                                    <FormHelperText className="pl-0">{errors.content.message}</FormHelperText>
                                ) : (
                                    <FormHelperText className="pl-0"> </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions className="justify-end p-8">
                <div className="px-16">
                    <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                        保存
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
});

TodoForm.propTypes = {
    activeTodo: PropTypes.object,
    className: PropTypes.string,
    classes: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
};

const useStyles = makeAppStyles(
    theme => ({
        root: {},
    }),
    {name: 'TodoForm'},
);

export default TodoForm;
