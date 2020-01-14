import axios from 'axios';

import { API_URL } from '../../constants';

//API End Point
export const EVENT = `${API_URL}/event`;

export async function getEvents(){
    try{
        let res = await axios.get(EVENT);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function getEventsWithPaging(page=1){
    try{
        const url = `${EVENT}?page=${page}`;
        console.log(url)
        let res = await axios.get(url);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function addEvent(data){
    try{
        let res = await axios.post(EVENT, data);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function getEvent(eventId){
    try{
        let res = await axios.get(`${EVENT}/${eventId}`);

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export async function editEvent(eventId, data) {
    try{
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        const form_data = new FormData();
        for ( let key in data )
            form_data.append(key, data[key]);

        let res = await axios.put(`${EVENT}/${eventId}`, form_data, options);
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export async function deleteEvent(eventId) {
    try {
        let res = await axios.delete(`${EVENT}/${eventId}`);

        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function search(query, cancelToken){
    try{
        const url = `${EVENT}&q=${query.toLowerCase()}&group=false`;
        let res = await axios.get(url, {
            cancelToken: cancelToken.token,
        });

        return res.data;

    }catch (error) {
        let err = new Error(error.message);
        err.isCancel = (axios.isCancel(error));

        throw err;
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}