import React from 'react';
import { Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import AddIcon from '@material-ui/icons/Add';

import Header from '../components/Header';
import Debt from '../components/Debt'


const useStyles = makeStyles({
    root: {
    },
    button: {
        textAlign: 'center',
        verticalAlign: 'bottom'
    },
});


const MainPage = ({ userLoggedIn }) => {
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    // УБРАТЬ!!
    /* !userLoggedIn && history.push("/login") */

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Grid container direction="column">
                <Grid item >
                    <Header />
                </Grid>

                <Grid item container>
                    <Grid item xs={false} sm={1} />
                    <Grid item container xs={12} sm={10}>
                        <Debt name="Виктор" email="victorezs@mail.ru" sum="1000" date="06.11.2020" />
                        <Debt name="Виктор" email="victorezs@mail.ru" sum="10000" date="02.11.2020" />
                        <Debt name="Виктор" email="victorezs@mail.ru" sum="5000" date="06.12.2020" />
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

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Добавить запись</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default MainPage