import React, { useState } from 'react'
import { 
  Typography, 
  Button, 
  Container, 
  makeStyles, 
  TextField,
  RadioGroup,
  Radio, 
  FormControlLabel,
  FormControl,
  FormLabel
} from '@material-ui/core'
import { KeyboardArrowRight, Send } from '@material-ui/icons'
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Create() {

  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('money');


  const handleSubmit = (e) => {
    e.preventDefault();

    if(title === ''){
      setTitleError(true);
    }else{
      setTitleError(false);
    }
    if(details === ''){
      setDetailsError(true);
    }else{
      setDetailsError(false);
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({title, details, category})
      })
      .then(() => history.push('/'))
    }
  }


  return (
    <Container>
      <Typography
        variant='h6'
        color='textSecondary'
        component='h2'
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label='Details'
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e)=>setCategory(e.target.value)}>
            <FormControlLabel control={<Radio/>} label='Money' value='money'/>
            <FormControlLabel control={<Radio/>} label='Todos' value='todos'/>
            <FormControlLabel control={<Radio/>} label='Reminders' value='reminders'/>
            <FormControlLabel control={<Radio/>} label='Work' value='work'/>
          </RadioGroup>
        </FormControl>
        
        <Button
          type='submit'
          color='secondary'
          variant='contained'
          endIcon={<KeyboardArrowRight />}
        >
          Submit
        </Button>
      </form>

    </Container>
  )
}
