import React, { useState } from 'react';
import {
    Button,
    Grid,
    Typography,
    TextField,
    IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { getData, storeData } from '../data/localStorage';

import SaveIcon from '@material-ui/icons/Save';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';

import Header from '../components/Header';
import Graph from '../components/Graph';


const useStyles = makeStyles({
    content: {
        marginTop: '16px'
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

    },
    infos: {
        padding: '4px',
    },
    editButton: {
        padding: '0px',
        paddingLeft: '8px'
    }
});


const ProfilePage = ({ setUserLoggedIn }) => {
    const history = useHistory();
    const classes = useStyles();

    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const currentUser = getData('loggedUser')
    const allUsers = getData('users')
    const allNotes = getData('notes')

    let meToGeneralSum = 0
    let toMeGeneralSum = 0
    let currentUserPos = -1
    let currentUserName = ''
    let currentUserEmail = ''
    let currentUserPassword = ''

    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].EMAIL === currentUser) {
            currentUserPos = i
            currentUserName = allUsers[i].NAME
            currentUserEmail = allUsers[i].EMAIL
            currentUserPassword = allUsers[i].PASSWORD
        }
    }

    allNotes.forEach(element => {
        if (element.ID === 'tome') {
            toMeGeneralSum += parseInt(element.SUM, 10)
        } else if (element.ID === 'meto') {
            meToGeneralSum += parseInt(element.SUM, 10)
        }
    });

    const nameRegex = /^[а-яА-Яa-zA-Z]+$/
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const [userName, setUserName] = useState(currentUserName)
    const [userEmail, setUserEmail] = useState(currentUserEmail)
    const [userPassword, setUserPassword] = useState(currentUserPassword)
    const nameError = !nameRegex.test(userName)
    const emailError = !emailRegex.test(userEmail)
    const passwordError = !passwordRegex.test(userPassword)


    const tryEditName = () => {
        if (!editName)
            setEditName(true)
        else if (!nameError) {
            setEditName(false)
            trySave()
        }
    }

    const tryEditEmail = () => {
        if (!editEmail)
            setEditEmail(true)
        else if (!emailError) {
            setEditEmail(false)
            trySave()
        }
    }

    const tryEditPassword = () => {
        if (!editPassword)
            setEditPassword(true)
        else if (!passwordError) {
            setEditPassword(false)
            trySave()
        }
    }

    const trySave = () => {
        let newName = userName
        let newEmail = userEmail
        let newPassword = userPassword

        allUsers[currentUserPos].NAME = newName
        allUsers[currentUserPos].EMAIL = newEmail
        allUsers[currentUserPos].Password = newPassword
        storeData('users', allUsers)
        storeData('loggedUser', newEmail)
    }

    console.log(localStorage)

    return (
        <div>
            <Grid container direction="column">
                <Grid item className={classes.header} id='header'>
                    <Header setUserLoggedIn={setUserLoggedIn} pageId={'profile'} />
                </Grid>

                <Grid item container id='content'>
                    <Grid item xs={false} sm={1} />
                    <Grid item container xs={12} sm={10} className={classes.content} justify="center" alignItems="flex-start">

                        <Grid item container id='avatar' direction="column" alignItems="center">
                            <Grid item>
                                <AccountCircleIcon style={{ fontSize: '7.5rem' }} />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                >
                                    Загрузить фото
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item container id='infos' direction="column" alignItems="center" style={{ marginTop: '16px' }}>

                            <Grid item container className={classes.infos} justify="center" alignItems="center">
                                <Grid item>
                                    {
                                        !editName
                                            ? <Typography><b>{'Имя: '}</b>{currentUserName}</Typography>
                                            : <TextField
                                                error={nameError}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="name"
                                                label="Имя"
                                                type="name"
                                                value={userName}
                                                onChange={e => { setUserName(e.currentTarget.value) }}
                                                helperText={nameError ? "Введите корректное имя" : ""}
                                                autoFocus
                                            />
                                    }
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        onClick={tryEditName}
                                        className={classes.editButton}
                                    >
                                        {!editName ? <EditIcon /> : <SaveIcon />}
                                    </IconButton>
                                </Grid>
                            </Grid>

                            <Grid item container className={classes.infos} justify="center" alignItems="center">
                                <Grid item>
                                    {
                                        !editEmail
                                            ? <Typography><b>{'Email: '}</b>{currentUserEmail}</Typography>
                                            : <TextField
                                                error={emailError}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                type="email"
                                                value={userEmail}
                                                onChange={e => { setUserEmail(e.currentTarget.value) }}
                                                helperText={emailError ? "Введите корректный email" : ""}
                                                autoFocus
                                            />
                                    }
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        onClick={tryEditEmail}
                                        className={classes.editButton}
                                    >
                                        {!editEmail ? <EditIcon /> : <SaveIcon />}
                                    </IconButton>
                                </Grid>
                            </Grid>

                            <Grid item container className={classes.infos} justify="center" alignItems="center">
                                <Grid item>
                                    {
                                        !editPassword
                                            ? <Typography><b>{'Пароль: '}</b>{currentUserPassword}</Typography>
                                            : <TextField
                                                error={passwordError}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="password"
                                                label="Пароль"
                                                type="text"
                                                value={userPassword}
                                                onChange={e => { setUserPassword(e.currentTarget.value) }}
                                                helperText={passwordError ? "Введите корректный пароль" : ""}
                                                autoFocus
                                            />
                                    }
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        onClick={tryEditPassword}
                                        className={classes.editButton}
                                    >
                                        {!editPassword ? <EditIcon /> : <SaveIcon />}
                                    </IconButton>
                                </Grid>
                            </Grid>

                            <Grid item className={classes.infos}>
                                <Typography style={{ marginTop: '16px' }}>{'Всего мне должны: '}<b>{toMeGeneralSum} руб.</b></Typography>
                                <Typography>{'Всего я должен: '}<b>{meToGeneralSum} руб.</b></Typography>
                            </Grid>

                            
                                <Graph />
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={false} sm={1} />
                </Grid>
            </Grid>
        </div>
    )

}

export default ProfilePage