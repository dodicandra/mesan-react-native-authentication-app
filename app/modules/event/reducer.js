export const EVENTS_AVAILABLE = 'EVENTS_AVAILABLE';
export const EVENTS_AVAILABLE_PAGING = 'EVENTS_AVAILABLE_PAGING';
export const ADD_EVENT = 'ADD_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

export const initialState = { events: [], totalResults:null, page:null, nextPage: null};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENTS_AVAILABLE:
            let { events } = action.data;

            return {...state, events};

        case EVENTS_AVAILABLE_PAGING: {
            let {result} = action.data;
            let { events, totalResults, page, nextPage } = result;

            events = events.map(item => {
                item.title = item._id;
                delete item._id;
                return item;
            });

            if (page > 1) {
                //clone the current state
                let [...clone] = state.events;

                clone = [...clone, ...events];

                return {...state, events: clone, totalResults, page, nextPage};
            } else {
                return {...state, events, totalResults, page, nextPage};
            }
        }

        case ADD_EVENT:
            let { event } = action.data;

            //clone the current state
            const [...clone] = state.events;

            clone.unshift(event); //add the new event to the top

            return {...state, events: clone};

        case UPDATE_EVENT:{
            let { event } = action.data;

            //clone the current state
            const [...clone] = state.events;

            //check if event already exist
            const index = clone.findIndex((obj) => obj._id === event._id);

            //if the event is in the array, update the event
            if (index !== -1) clone[index] = event;

            return {...state, events: clone};
        }

        case DELETE_EVENT:{
            let { id } = action.data;

            const [...clone] = state.events;

            clone.filter((event) => event.id !== id);

            return {...state, events: clone};
        }

        default:
            return state;
    }
};

export default eventReducer;
