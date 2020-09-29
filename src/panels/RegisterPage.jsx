import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { getData, storeData } from '../data/localStorage';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function AlreadyRegistered() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Уже есть аккаунт? '}
            <Link color="inherit" href="/login">
                Войти
            </Link>
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://www.practicalmoneyskills.com/assets/images/non-card/creating_a_budget.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));







const RegisterPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    var currentUsers = getData("users")
    if (!currentUsers) 
        currentUsers = []

    let name_tf = useRef(null);
    let email_tf = useRef(null);
    let password_tf = useRef(null);
    let second_password_tf = useRef(null);

    const nameRegex = /^[а-яА-Яa-zA-Z]+$/
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    const [nameText, setNameText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [secondPasswordText, setSecondPasswordText] = useState("");
    const nameError = !nameRegex.test(nameText)
    const emailError = !emailRegex.test(emailText)
    const passwordError = !passwordRegex.test(passwordText)
    const secondPasswordError = !(secondPasswordText === passwordText)


    function tryRegister() {
        if (nameError || emailError || passwordError || secondPasswordError) return

        let found = false;
        for (let i = 0; i < currentUsers.length; i++) {
            if (currentUsers[i].EMAIL === emailText ) {
                found = true;
                break;
            }
        }
        if (found) {
            enqueueSnackbar('Пользователь с таким email уже существует', {variant: 'error'});
            return
        }

        let newUsers = currentUsers.slice()
        newUsers.push({ EMAIL: emailText, PASSWORD: passwordText, NAME: nameText })
        storeData("users", newUsers)
        history.push("/login")
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            error={nameError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Имя"
                            type="text"
                            inputRef={name_tf}
                            value={nameText}
                            onChange={e => { setNameText(e.currentTarget.value) }}
                            helperText={nameError ? "Введите корректное имя" : ""}
                            autoFocus
                        />
                        <TextField
                            error={emailError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            type="email"
                            value={emailText}
                            onChange={e => { setEmailText(e.currentTarget.value) }}
                            helperText={emailError ? "Введите корректный email" : ""}
                            inputRef={email_tf}
                        />
                        <TextField
                            error={passwordError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Пароль"
                            type="password"
                            id="password"
                            inputRef={password_tf}
                            value={passwordText}
                            onChange={e => { setPasswordText(e.currentTarget.value) }}
                            helperText={passwordError ? "Пароль должен быть длиннее 8 символов, содержать цифру и букву" : ""}
                        />
                        <TextField
                            error={secondPasswordError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Повторите пароль"
                            type="password"
                            id="password_second"
                            inputRef={second_password_tf}
                            value={secondPasswordText}
                            onChange={e => { setSecondPasswordText(e.currentTarget.value) }}
                            helperText={secondPasswordError ? "Пароли не совпадают" : ""}
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={tryRegister}
                        >
                            Зарегистрироваться
                        </Button>
                        <Box>
                            <AlreadyRegistered />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default RegisterPage