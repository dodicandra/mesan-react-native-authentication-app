import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//IMPORT ROUTES
import AuthStack from "./routes/auth";
import HomeStack from "./routes/home";
import EventStack from "./modules/event/routes";

import AuthProvider from "./provider";
import EventProvider from "./modules/event/provider";

import AuthLoading from "./scenes/auth/AuthLoading";

//APP ROUTES STACK
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        Auth: AuthStack,
        App: EventStack
    },
    {initialRouteName: 'Loading'}
);

const Navigator = createAppContainer(AppStack);

export default function Router(props) {
    return (
        <AuthProvider>
        <EventProvider>
            <Navigator/>
        </EventProvider>
        </AuthProvider>
    );
}