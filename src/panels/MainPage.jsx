import React from 'react';
import { 
    Button, 
    Grid
    } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { getData } from '../data/localStorage';

import AddIcon from '@material-ui/icons/Add';

import DialogToAdd from '../components/DialogToAdd'
import Header from '../components/Header';
import Debt from '../components/Debt'



const useStyles = makeStyles({
    content: {

    },
    button: {
        textAlign: 'center',
        position: 'sticky',
        top: 'auto',
        bottom: 0,
    },
    header: {
        position: 'sticky',
        top: '0'

    }
});


const MainPage = ({ userLoggedIn, setUserLoggedIn }) => {
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState(false);

    var listOfNotes = getData('notes')
    if (listOfNotes == null) 
        listOfNotes = []


    // УБРАТЬ!!
    /* !userLoggedIn && history.push("/login") */

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const tryAdd = () => {

    }

    const updateParent = () => {
        setUpdate(!update)
    }

    return (
        <div>
            <Grid container direction="column">
                <Grid item className={classes.header}>
                    <Header setUserLoggedIn={setUserLoggedIn} pageId={'main'}/>
                </Grid>

                <Grid item container >
                    <Grid item xs={false} sm={1} />
                    <Grid item container xs={12} sm={10} className={classes.content}>
                        {
                            listOfNotes.map((note, i) => (
                                <Debt key={i} id={note.ID} name={note.NAME} sum={note.SUM} email={note.EMAIL} date={note.DATE} updateParent={updateParent}/>
                            ))
                        }
                    </Grid>
                    <Grid item xs={false} sm={1} />
                </Grid>

                <Grid item className={classes.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={handleClickOpen}
                    >
                        Добавить запись
                    </Button>
                </Grid>
            </Grid>

            <DialogToAdd handleClose={handleClose} open={open} />
        </div>
    )

}

export default MainPage