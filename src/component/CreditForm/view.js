import { TextField, Button, Grid, Typography } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import style from './style';
import CircularProgress from '@material-ui/core/CircularProgress';



function GetView(
    classes,
    title,
    handlerSendClick,
    businessNameModel,
    handlerBusinessNameChange,
    taxModel,
    handlerTaxIdChange,
    requiredAmountModel,
    handlerRequiredAmountChange
    ){
    return (
        <div>
            <Typography component="h4">{title}</Typography>
            <hr />
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        className={classes.input}
                        error={businessNameModel.error !== ''}
                        id="BusinessName"
                        value={businessNameModel.value}
                        label={businessNameModel.label + " *"}
                        onChange={handlerBusinessNameChange}
                        helperText={businessNameModel.error}
                        variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        className={classes.input}
                        error={taxModel.error !== ''}
                        id="TaxId"
                        value={taxModel.value}
                        label={taxModel.label + " *"}
                        onChange={handlerTaxIdChange}
                        helperText={taxModel.error}
                        variant="outlined" />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        className={classes.input}
                        error={requiredAmountModel.error !== ''}
                        id="RequiredAmount"
                        value={requiredAmountModel.value}
                        label={requiredAmountModel.label + " *"}
                        onChange={handlerRequiredAmountChange}
                        helperText={requiredAmountModel.error}
                        variant="outlined" />

                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size='large'
                        onClick={handlerSendClick}>
                        apply
            </Button>
                </Grid>
            </Grid>

        </div>
    );

}

function GetLoading(classes){
    return (<div className={classes.progressRoot}>
        <CircularProgress />               
    </div>);
}

export default function ({ onSendForm, title, loading }) {
    const classes = style();
    const [taxModel, setTaxModel] = useState({ label: 'Tax Id', value: '', error: '' });
    const [businessNameModel, setBusinessNameModel] = useState({ label: 'Business Name', value: '', error: '' });
    const [requiredAmountModel, setRequiredAmountModel] = useState({ label: 'Required Amount', value: '', error: '' });

    useEffect(() => {
        if(loading==false){
            setTaxModel({...taxModel,value:''});
            setBusinessNameModel({...businessNameModel,value:''});
            setRequiredAmountModel({...requiredAmountModel,value:''});
        }
    }, [loading])


    const fieldIsValid = (model, setModel) => {
        var isEmpty = model.value === '' || model.value === undefined;
        var errorMessage = isEmpty ? `${model.label} is required` : '';
        setModel({ ...model, error: errorMessage });
        return !isEmpty;
    }
    const handlerSendClick = () => {
        var taxIsValid = fieldIsValid(taxModel, setTaxModel);
        var businessNameValid = fieldIsValid(businessNameModel, setBusinessNameModel);
        var requiredAmointValid = fieldIsValid(requiredAmountModel, setRequiredAmountModel);

        if (taxIsValid && businessNameValid && requiredAmointValid) {
            onSendForm({
                taxId: taxModel.value,
                businessName: businessNameModel.value,
                requiredAmount: parseInt(requiredAmountModel.value)
            });
        }

    }

    const handlerTaxIdChange = event => setTaxModel({ ...taxModel, value: event.target.value });
    const handlerBusinessNameChange = event => setBusinessNameModel({ ...businessNameModel, value: event.target.value });
    const handlerRequiredAmountChange = event => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            setRequiredAmountModel({ ...requiredAmountModel, value: onlyNums });
        } else if (onlyNums.length === 10) {
            const number = onlyNums.replace(
                /(\d{3})(\d{3})(\d{4})/,
                '($1) $2-$3'
            );
            setRequiredAmountModel({ ...requiredAmountModel, value: number });
        }

    }
    console.log(loading);
    if(loading){
        return GetLoading(classes);
    }else{
            return GetView(
                classes,
                title,
                handlerSendClick,
                businessNameModel,
                handlerBusinessNameChange,
                taxModel,
                handlerTaxIdChange,
                requiredAmountModel,
                handlerRequiredAmountChange
                );
    }

    
}

