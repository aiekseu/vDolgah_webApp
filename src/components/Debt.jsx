import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardActions, CardContent, TextField, Typography, IconButton, Button } from '@material-ui/core';
import { getData, storeData } from '../data/localStorage';
import { useSnackbar, SnackbarProvider } from 'notistack';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: '8px'
    },
    name: {

    },
    sum: {
        fontStyle: 'italic'

    },
    date: {
        textAlign: 'right'
    },
    email: {
        marginBottom: 0,
        paddingBottom: 0
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        fontSize: '16px',
        paddingBottom: '10px',
        paddingTop: '0px',
        paddingLeft: '0px',
        paddingRight: '0px'
    },
    edit: {
        maxWidth: '160px',
        marginRight: '8px',
        marginLeft: '8px',
    },
    iconDiv: {
        width: '100%',
        display: 'flex',
        alignItems: 'inherit',
        justifyContent: 'inherit'
    }
});

export default function Debt({ id, name, sum, email, date, updateParent }) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [isEditable, setIsEditable] = useState(false);

    let name_tf = useRef(null);
    let sum_tf = useRef(null);
    let email_tf = useRef(null);
    let date_tf = useRef(null);

    const tryDelete = () => {
        let currentNotes = getData('notes')
        let pos = -1
        for (let i = 0; i < currentNotes.length; i++) {
            if (currentNotes[i].ID === id && currentNotes[i].NAME === name && currentNotes[i].SUM === sum && currentNotes[i].EMAIL === email)
                pos = i
        }
        if (pos !== -1)
            currentNotes.splice(pos, 1);

        storeData('notes', currentNotes)
        updateParent()
        enqueueSnackbar('Запись удалена', {variant: 'warning'})
    }


    const tryEdit = () => {
        setIsEditable(!isEditable)
    }

    const trySave = () => {
        let currentNotes = getData('notes')
        let pos = 0
        let new_name = name_tf.current.value;
        let new_sum = sum_tf.current.value;
        let new_email = email_tf.current.value;
        let new_date = date_tf.current.value;

        for (let i = 0; i < currentNotes.length; i++) {
            if (currentNotes[i].ID === id && currentNotes[i].NAME === name && currentNotes[i].SUM === sum && currentNotes[i].EMAIL === email)
                pos = i
        }

        currentNotes[pos].NAME = new_name
        currentNotes[pos].EMAIL = new_email
        currentNotes[pos].SUM = new_sum
        currentNotes[pos].DATE = new_date
        storeData('notes', currentNotes)

        setIsEditable(!isEditable)
        updateParent()
        enqueueSnackbar('Запись сохранена', {variant: 'success'})
    }


    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card className={classes.root} variant="outlined">
                <Grid container direction='column'>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {id === 'tome' ? 'Мне должен' : 'Я должен'}
                        </Typography>
                    </Grid>

                    <Grid item container direction='row' justify="space-between">
                        <Grid item >
                            <CardContent>
                                {
                                    !isEditable
                                        ? <Typography className={classes.name} variant="h5" component="h6">
                                            {name}
                                        </Typography>
                                        : <TextField
                                            className={classes.edit}
                                            required
                                            autoFocus
                                            defaultValue={name}
                                            margin="dense"
                                            id="name"
                                            label="Введите имя"
                                            type="text"
                                            inputRef={name_tf}
                                        />
                                }
                                {
                                    !isEditable
                                        ? <Typography variant="body2" color="textSecondary" component="h2" className={classes.email}>
                                            {email}
                                        </Typography>
                                        : <TextField
                                            className={classes.edit}
                                            required
                                            defaultValue={sum}
                                            margin="dense"
                                            id="sum"
                                            label="Введите сумму"
                                            type="number"
                                            fullWidth
                                            inputRef={sum_tf}
                                        />

                                }
                            </CardContent>
                        </Grid>

                        <Grid item>
                            <CardContent>
                                {
                                    !isEditable
                                        ? <Typography className={classes.sum} variant="h6" component="h6">
                                            {sum} руб.
                                        </Typography>
                                        : <TextField
                                            className={classes.edit}
                                            defaultValue={email}
                                            margin="dense"
                                            id="email"
                                            label="Введите email"
                                            type="email"
                                            inputRef={email_tf}
                                        />
                                }
                                {
                                    !isEditable
                                        ? <Typography className={classes.date} variant="body2" color="textSecondary" >
                                            {date}
                                        </Typography>
                                        : <TextField
                                            className={classes.edit}
                                            defaultValue={date}
                                            InputLabelProps={{ shrink: true }}
                                            margin="dense"
                                            id="date"
                                            label="Введите дату"
                                            type="date"
                                            fullWidth
                                            inputRef={date_tf}
                                        />
                                }
                            </CardContent>
                        </Grid>
                    </Grid>

                    <CardActions className={classes.buttons}>
                        <Grid container direction='row' justify="space-evenly" alignItems="flex-end">
                            <Grid item>
                                <IconButton
                                    className={classes.button}
                                    onClick={tryDelete}
                                > <DeleteIcon /> Удалить
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    className={classes.button}
                                    onClick={ !isEditable ? tryEdit : trySave }
                                >
                                    {
                                        !isEditable
                                            ? <div className={classes.iconDiv}><EditIcon />Редактировать</div>
                                            : <div className={classes.iconDiv}><SaveIcon />Сохранить</div>
                                    }

                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    className={classes.button}
                                > <MailIcon /> Напомнить
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Grid>
            </Card>
        </Grid>
    );
}
