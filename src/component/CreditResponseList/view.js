import React from 'react';
import style from './style';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import CancelIcon from '@material-ui/icons/Cancel';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Typography } from '@material-ui/core';

export default function ({ data,title }) {
    const classes = style();

    const currencyFormat=(num)=> {
        return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

    const calculateIcon = (result) => {
        switch (result) {
            case "Approved":
                return (<CheckCircleIcon style={{ color: '008000' }} />);
            case "Undecided":
                return (<WarningIcon color="action" />);
            case "Declined":
                return (<CancelIcon color="secondary" />);

            default:
                return (<FileCopyIcon />);
        }

    }

    return (
        <div>
            
            <Typography component="h4">{title}</Typography>
            <hr/>
            <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">Result</TableCell>
                        <TableCell align="left">Business Name</TableCell>
                        <TableCell align="right">Tax Id</TableCell>
                        <TableCell align="right">Required Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell align="left">{calculateIcon(row.result)}</TableCell>
                            <TableCell align="left">{row.result}</TableCell>
                            <TableCell align="left">{row.info.businessName}</TableCell>
                            <TableCell align="right">{row.info.taxId}</TableCell>
                            <TableCell align="right">{currencyFormat(row.info.requiredAmount)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    
        </div>
    );
}

