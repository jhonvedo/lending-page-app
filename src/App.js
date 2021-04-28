import { Grid } from '@material-ui/core';
import './App.css';
import { CreditForm } from './component/CreditForm/index';
import { CreditResponseList } from './component/CreditResponseList/index';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
 root:{
   padding : '15px 40px 0px 40px',
   height:'100%',
   width: '100%',
   margin: 0
 },
 card:{
   borderRadius:'9px',
   boxShadow:'0px 0px 10px 0px rgb(0 0 0 / 18%)',
   backgroundColor:'white',
   margin:'8px',
  minHeight:'280px'
 }
}));

function App() {
  const classes = useStyles();
  return (

    <Grid 
    container 
    spacing={4}    
    className={classes.root}>
      <Grid item xs={12} sm={4} className={classes.card}>
        <CreditForm title="Apply for credit" />
      </Grid>
      <Grid item xs={12} sm={7} className={classes.card}>
        <CreditResponseList title="These are your requests"/>
      </Grid>
    </Grid>
  );
}

export default App;
