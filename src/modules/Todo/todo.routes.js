import React from 'react';
import Todo from './Todo';

const routes = [
    {
        path: ['/', '/todo'],
        sorted: 1,
        component: () => <Todo />,
    },
];

export default routes;
