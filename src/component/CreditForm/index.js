import React, { useState, useEffect } from 'react';
import View from './view';
import { sendCredit } from '../../redux/actions/credit';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';



export function CreditForm(props) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);
  const lastCredit = useSelector(state => state.lastCredit);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (lastCredit.result !== undefined)
      setOpen(true);
  }, [lastCredit])

  const handleClose = () => {
    setOpen(false);
  };

  const handlerOnSend = (event) => {
    dispatch(sendCredit(event));
  }
  const currencyFormat = (num) => {
    if (num === undefined)
      num = 0;

    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const generateAlertByResult = (result) => {
    switch (result) {
      case "Approved":
        return (<Alert severity="success"><b>{result}</b>, Congratulation!</Alert>);
      case "Undecided":
        return (<Alert severity="warning"><b>{result}</b></Alert>);
      case "Declined":
        return (<Alert severity="error"><b>{result}</b></Alert>);

      default:
        return (<Alert severity="info"><b>{result}</b></Alert>);
    }
  }

  return (
    <div {...props}>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Credit APP"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hi <b>{lastCredit.info.businessName}</b> <br />
            You have requested a credit for amount by <b>{currencyFormat(lastCredit.info.requiredAmount)}</b> <br />
            and it have been ...
          </DialogContentText>
          {generateAlertByResult(lastCredit.result)}


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Thanks
          </Button>
        </DialogActions>
      </Dialog>
      <View title={props.title} loading={loading} onSendForm={handlerOnSend} />


    </div>

  )
}

