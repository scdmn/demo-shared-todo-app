import React, {useContext} from 'react';
import {renderRoutes} from 'react-router-config';
import {SmartLinkRouteContext} from '@smart-link/context';
import {withSmartLinkApp} from '@smart-link/core';
import config from '@smart-link/auto-config';

const App = () => {
    const {routes} = useContext(SmartLinkRouteContext);
    return renderRoutes(routes);
};

export default withSmartLinkApp(config)(App);
