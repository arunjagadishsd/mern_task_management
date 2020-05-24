import MomentUtils from '@date-io/moment'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import FlagIcon from '@material-ui/icons/Flag'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import ListIcon from '@material-ui/icons/List'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  icon: {
    margin: '0 0.5rem',
    color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
}))

const Form = () => {
  const [textField, setTextField] = useState('')
  const [dueField, setDueField] = useState(new Date())

  const handleChange = (e) => {
    setTextField(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { text: textField, due_date: dueField }
    await fetch('http://localhost:3001/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })

    // setTextField('')
  }

  const classes = useStyles()

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <TextField
            id='outlined-full-width'
            name='textField'
            placeholder='e.g. Read every day @goals #learning'
            onChange={handleChange}
            value={textField}
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={2}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              margin='normal'
              value={dueField}
              onChange={setDueField}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <div className='form-row'>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <Button variant='contained' color='primary' type='submit'>
              Submit
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button color='secondary' variant='contained'>
              Cancel
            </Button>
          </Grid>
          <Grid xs={10} className={classes.iconContainer}>
            <div>
              <ListIcon className={classes.icon} />
              <LocalOfferIcon className={classes.icon} />
              <FlagIcon className={classes.icon} />
            </div>
          </Grid>
        </Grid>
      </div>
    </form>

    // <form onSubmit={handleSubmit} className=" my-3">
    //   <div className="form-row">
    //     <div className="col">
    //       <input
    //         type="text"
    //         onChange={handleChange}
    //         value={textField}
    //         id="text"
    //         name="textField"
    //         className="form-control "
    //       />
    //     </div>
    //     <div className="col-auto">
    //       <input
    //         id="date"
    //         type="date"
    //         onChange={handleDateChange}
    //         value={dueField}
    //         name="dateField"
    //         className="form-control"
    //       />
    //     </div>
    //     <div className="col-auto">
    //       <button type="submit" className="btn btn-primary ml-2">
    //         Submit
    //       </button>
    //     </div>
    //   </div>
    //   <div className="form-row">
    //     <div className="col-9 classes.iconContainer" style={{ textAlign: 'right' }} >
    //       <ListIcon/>
    //       <LocalOfferIcon/>
    //       <FlagIcon/>
    //     </div>
    //   </div>
    //   {/*
    //   <label htmlFor='text'>Due</label>
    //    */}
    // </form>
  )
}

export default Form
