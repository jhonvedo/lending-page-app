import {CREDIT_RESPONSE,SAVE_CREDIT,LOADING_START,LOADING_STOP} from '../const';

const initialState = {
    credits:[],
    loading:false,
    lastCredit:{
        info:{}
    }
};

export function credit (state = initialState,action){
    
    switch (action.type) {
        case CREDIT_RESPONSE:
            return {
                ...state,lastCredit:action.payload
            }
        case SAVE_CREDIT:  
            return {
                ...state,
                credits: [...state.credits, action.payload]
            }        
        case LOADING_START:
            return {
                ...state,loading:true
            }   
        case LOADING_STOP:
            return {
                ...state,loading:false
            }      
        default:
            return {...state}
    }
}