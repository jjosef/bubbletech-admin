import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));

export function Alert(props) {
  const classes = useStyles();
  return <MuiAlert className={classes.root} elevation={6} variant="filled" {...props} />;
}