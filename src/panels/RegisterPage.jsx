import React, { useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import users from '../data/users';

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







const RegisterPage = ({setUserLoggedIn}) => {
    const classes = useStyles();
    const history = useHistory();
    const store = require('store')

    let name_tf = useRef(null);
    let email_tf = useRef(null);
    let password_tf = useRef(null);
    let second_password_tf = useRef(null);

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    const nameRegex = /^[а-яА-Яa-zA-Z]+$/

    const [nameText, setNameText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [secondPasswordText, setSecondPasswordText] = useState("");
    const nameError = !nameRegex.test(nameText)
    const emailError = !emailRegex.test(emailText)
    const passwordError = !passwordRegex.test(nameText)
    const secondPasswordError = !(passwordText === secondPasswordText)
    

    function tryRegister() {

        

        console.log(name_tf.current)

        name_tf.current.error = !nameRegex.test(nameText)   

        /* users.forEach(element => {
            console.log(element)
            if (element.EMAIL === email_tf.current.value & element.PASSWORD === password_tf.current.value)
                userExist = true
        });

        if (userExist) {
            if (rememberMe.current.checked)
                store.set("email", email_tf.current.value)
            else store.remove('email')
            setUserLoggedIn(true)
            history.push("/")
            }      */       
    }



    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            
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
                            id="email"
                            label="Имя"
                            type="email"
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
                            helperText={passwordError ? "Пароль должен быть длиннее 8 символов, содержать цифру, заглавную и строчную букву" : ""}                            
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
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
        </Grid>
    );
}

export default RegisterPage