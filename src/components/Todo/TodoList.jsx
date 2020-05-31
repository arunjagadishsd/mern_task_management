import React, { useState } from 'react'
import TodoListItem from './TodoListItem'
import TodoForm from './TodoForm'
import WarningMessage from '../WarningMessage'
import CONSTANTS from '../../constants'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Container, ListItem, List, ListItemIcon, Checkbox, ListItemText, IconButton, ListItemSecondaryAction, Divider } from "@material-ui/core";
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));



const TodoList = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [items, setItems] = useState([])
  const [warningMessage, setWarningMessage] = useState({
    warningMessageOpen: false,
    warningMessageText: ''
  })

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1)
    {
      newChecked.push(value);
    } else
    {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);
    setChecked(newChecked);
  };

  const getItems = () => {
    let promiseList = fetch(CONSTANTS.ENDPOINT.LIST).then((response) => {
      if (!response.ok)
      {
        throw Error(response.statusText)
      }
      return response.json()
    })
    return promiseList
  }

  const deleteItem = (item) => {
    fetch(`${ CONSTANTS.ENDPOINT.LIST }/${ item._id }`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok)
        {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((result) => {
        setItems(items.filter((item) => item._id !== result._id))
      })
      .catch((error) => {
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${ CONSTANTS.ERROR_MESSAGE.LIST_DELETE } ${ error }`
        })
      })
  }

  const addItem = (textField) => {
    // Warning Pop Up if the user submits an empty message
    if (!textField)
    {
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE
      })
      return
    }

    fetch(CONSTANTS.ENDPOINT.LIST, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: textField
      })
    })
      .then((response) => {
        if (!response.ok)
        {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((itemAdded) => {
        setItems([itemAdded, ...items])
      })
      .catch((error) =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${ CONSTANTS.ERROR_MESSAGE.LIST_ADD } ${ error }`
        })
      )
  }

  const closeWarningMessage = () => {
    setWarningMessage({
      warningMessageOpen: false,
      warningMessageText: ''
    })
  }

  React.useEffect(() => {
    getItems()
      .then((list) => {
        setItems(list)
      })
      .catch((error) => ({
        warningMessageOpen: true,
        warningMessageText: `${ CONSTANTS.ERROR_MESSAGE.LIST_GET } ${ error }`
      }))
  }, [])

  return (
    <React.Fragment>
      <CssBaseline>
        <Container>
          <div className='row justify-content-center py-5'>
            <h3>Todo List</h3>
          </div>
          <div className='row'>
            <div className='col-12 p-0 mb-4'>
              <TodoForm addItem={addItem} setWarningMessage={setWarningMessage} />
            </div>
            <List className={classes.root}>
              {items.map((value) => {
                const labelId = `checkbox-list-label-${ value._id }`;

                return (
                  <React.Fragment key={value._id}>
                    <ListItem dense button onClick={handleToggle(value)}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={value.text} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Delete">
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton edge="end" aria-label="Delete">
                          <DeleteForeverRoundedIcon color="secondary" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                )
              })}
            </List>

            <WarningMessage
              open={warningMessage.warningMessageOpen}
              text={warningMessage.warningMessageText}
              onWarningClose={closeWarningMessage}
            />
          </div>
        </Container>
      </CssBaseline>
    </React.Fragment>
  )
}

export default TodoList
