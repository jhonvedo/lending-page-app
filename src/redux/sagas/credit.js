import {CREDIT_SENDED,LOADING_START,LOADING_STOP,CREDIT_RESPONSE,SAVE_CREDIT} from '../const';
import { takeLatest ,put,call} from 'redux-saga/effects';
import {apiCall} from '../../services/api';


export function* sendCredit({payload}){
    try {
        console.log("sending",payload);
        yield put({type:LOADING_START});
        var result = yield call(apiCall,"api/v1/credit",payload,{},"POST"); 
        yield put({type:CREDIT_RESPONSE,payload:result.data});
        yield put({type:SAVE_CREDIT,payload:result.data});
        yield put({type:LOADING_STOP});
        
    } catch (error) {
        yield put({type:LOADING_STOP});
    }
}


export default function* credit(){
    yield takeLatest(CREDIT_SENDED,sendCredit);
}