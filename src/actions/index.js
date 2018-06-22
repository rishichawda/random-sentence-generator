import axios from 'axios';

export const rtext = 'rtext';
const url = 'https://www.randomtext.me/api/';

export function gettext() {
    const request = axios.get(url);
    return {
        type: rtext,
        payload: request
    }
}