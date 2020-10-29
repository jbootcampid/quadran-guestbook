import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { create } from './api-guest.js'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function NewGuest() {
  const classes = useStyles();
  const [redirectToGuest, setRedirectToGuest] = useState(false)
  const[values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber:''
  })

  const clickSubmit = () => {
    
    const guest = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      email: values.email || undefined,
      phoneNumber: values.phoneNumber || undefined
    }
    
    console.log(guest)

    create(guest).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', open: true })
        setRedirectToGuest(true)
      }
    })

  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  if (redirectToGuest) {
    return <Redirect to='/guests' />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange('name')}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                value={values.lastName}
                label="Last Name"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={values.email}
                onChange={handleChange('name')}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange('name')}
                label="Phone Number"
                name="phoneNumber"
              />
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={clickSubmit} 
            className={classes.submit}
          >
            Submit
          </Button>
          
        </form>
      </div>

    </Container>
  );
}