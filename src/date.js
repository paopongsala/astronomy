import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import './date.css'

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


export default function DatePickers(props) {
  const classes = useStyles();

  const handleDateChange = (event) => {
    console.log(event.target.value)
    props.setDate(event.target.value);
  };


  console.log(props.date)
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Date"
        type="date"
        value={props.date}
        onChange={handleDateChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
