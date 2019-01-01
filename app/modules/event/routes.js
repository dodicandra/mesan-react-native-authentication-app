import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import EventProvider from "./provider";

//IMPORT SCENES
import EventListScreen from "./scenes/EventList";
// import AddEventScreen from "./scenes/AddEvent";
// import EditEventScreen from "./scenes/EditEvent";

import {headerStyle, headerTitleStyle} from '../../theme'

const EventsStack = createStackNavigator(
    {
        EventList: EventListScreen,
        // AddEvent: AddEventScreen,
        // EditEvent: EditEventScreen
    },
    {
        initialRouteName: 'EventList',
        mode: 'modal',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export {EventProvider, EventsStack};