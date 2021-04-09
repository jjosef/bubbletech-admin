import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { Alert } from '../components/alert';
import { useForm } from '../components/form';
import { useAuth } from '../services/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6)
  },
  paper: {
    width: '300px',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px'
  },
  form: {
    width: '100%',
    '& .MuiTextField-root': {
      width: '100%',
      marginBottom: '10px'
    }
  }
}));

const initialValues = {
  email: '',
  password: ''
};

export function LoginPage(props) {
  const [loginErrors, setLoginErrors] = useState({})
  const classes = useStyles();
  const auth = useAuth();

  const onSubmit = ({ values, errors}) => {
    setLoginErrors({});
    auth.login(values.email, values.password).then((user) => {
      console.log(`Logged in as`, user.email, user.uid);
    }).catch((err) => {
      console.log(err);
      setLoginErrors(err);
    })
  }

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm({ initialValues, onSubmit });

  return auth.user ? (
      <Navigate to="/admin" replace />
    ) : (
      <Container className={classes.root} maxWidth={false}>
        <Paper className={classes.paper} elevation={3}>
          <form noValidate className={classes.form} onSubmit={handleSubmit}>
            <h4>Sign in to Bubbletech</h4>
            { loginErrors.message && (
              <Alert severity="error">{loginErrors.message}</Alert>
            )}
            <div>
              <TextField 
                id="email-address"
                label="Email Address"
                type="email"
                variant="outlined"
                name="email"
                autoComplete="login email"
                onChange={handleChange}
                value={values.email} 
              />
            </div>
            <div>
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                autoComplete="login current-password"
                onChange={handleChange}
                value={values.password}
              />
            </div>
            <Button variant="contained" color="primary" type="submit">Sign In</Button>
          </form>
        </Paper>
      </Container>
    )
}