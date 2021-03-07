import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default function DatePickers() {
  const classes = useStyles();
  const [date, setDate] = React.useState('')

  var handleDateChange = (event) => {
    console.log(event.target.value)
    setDate(event.target.value);
    console.log(date)
  };


  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Date"
        type="date"
        value={date}
        
        onChange={handleDateChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
