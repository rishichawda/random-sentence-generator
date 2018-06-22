import { rtext } from '../actions';

export default function (state = [], action) { 
    switch(action.type) {
        case rtext:  
            return [ action.payload.data, ...state ]
        default: 
            return state;
    }
 }