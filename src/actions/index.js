import axios from 'axios';

export const rtext = 'rtext';

export function gettext() {
    const url = 'http://www.randomtext.me/api/';
    const request = axios.get(url);
    return {
        type: rtext,
        payload: request
    }
}