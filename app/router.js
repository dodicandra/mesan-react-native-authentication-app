import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'react-native-elements';

//IMPORT ROUTES
import AuthStack from "./routes/auth";
import {EventProvider, EventsStack} from "./modules/event/routes";
import SearchScreen from "./modules/event/scenes/Search";

import AuthProvider from "./provider";
import AuthLoading from "./scenes/auth/AuthLoading";

const TabNavigator = createBottomTabNavigator(
    {
        Events: EventsStack,
        Search: SearchScreen
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName, iconType = 'ionicon';
                if (routeName === 'Events') {
                    iconName = `md-list-box`;
                } else if (routeName === 'Search') {
                    iconName = `md-quote`;
                } else if (routeName === 'Sales') {
                    iconName = `bank`;
                    iconType = `font-awesome`;
                }

                return <Icon type={iconType} name={iconName} size={22} color={tintColor}/>
            }
        }),

        tabBarOptions: {
            activeTintColor: "#0a163d",
            inactiveTintColor: 'gray',
        },
    });


//APP ROUTES STACK
const AppStack = createSwitchNavigator(
    {
        Loading: AuthLoading,
        Auth: AuthStack,
        App: TabNavigator
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