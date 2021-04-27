import {CREDIT_SENDED} from '../const';


export function sendCredit (payload){
   return {
       type:CREDIT_SENDED,
       payload
   }    
};

