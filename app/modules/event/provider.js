import React, {useMemo, useReducer, useContext} from 'react';

import reducer, {initialState, EVENTS_AVAILABLE, EVENTS_AVAILABLE_PAGING,ADD_EVENT, UPDATE_EVENT, DELETE_EVENT} from './reducer';
import AuthProvider from "../../provider";

const EventContext = React.createContext();

//Create Event Provider
function EventProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    //HELPERS/ACTION CREATORS
    const addEvents = (events) => dispatch({type: EVENTS_AVAILABLE, data: {events}});
    const addEventsWithPaging = (result) => dispatch({type: EVENTS_AVAILABLE_PAGING, data: {result}});
    const createEvent = (event) => dispatch({type: ADD_EVENT, data: {event}});
    const updateEvent = (event) => dispatch({type: UPDATE_EVENT, data: {event}});
    const deleteEvent = (id) => dispatch({type: DELETE_EVENT, data: {id}});

    const value = useMemo(() => {
        return {state, addEvents, addEventsWithPaging, createEvent, updateEvent, deleteEvent};
    }, [inventoryState]);

    return (
        <EventContext.Provider value={value}>
            {props.children}
        </EventContext.Provider>
    );
}

const useEvent = () => useContext(EventContext);
export { EventContext, useEvent };
export default EventProvider;