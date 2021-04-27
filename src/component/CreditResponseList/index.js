import React from 'react';
import View from './view';
import {useSelector} from 'react-redux';


export function CreditResponseList(props){
    const credits = useSelector(state => state.credits);
    
    return (
        <div {...props}>
            <View title={props.title} data={credits}/>
        </div>
    )
}

