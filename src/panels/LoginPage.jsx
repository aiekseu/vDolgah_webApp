import React, { useRef } from 'react';
import { useHistory } from "react-router-dom";
import { getData } from '../data/localStorage';
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





const LoginPage = ({setUserLoggedIn}) => {
    const classes = useStyles();
    const history = useHistory();
    const store = require('store')
    const currentUsers = getData('users')

    let rememberMe = useRef(null);
    let email_tf = useRef(null);
    let password_tf = useRef(null);


    function tryLogin() {
        let userExist = false;
        console.log(currentUsers)

        currentUsers.forEach(element => {
            if (element.EMAIL === email_tf.current.value & element.PASSWORD === password_tf.current.value)
                userExist = true
        });

        if (userExist) {
            if (rememberMe.current.checked)
                store.set("rememberedEmail", email_tf.current.value)
            else store.remove('rememberedEmail')
            setUserLoggedIn(true)
            history.push("/")
            }            
    }


    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://vk.com/votelroge">
                    Summer practice, TPU
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
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
                        Войти
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            type="email"
                            inputRef={email_tf}
                            defaultValue={store.get('rememberedEmail')}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Пароль"
                            type="password"
                            id="password"
                            inputRef={password_tf}
                        />                        
                        <FormControlLabel
                            control={<Checkbox value="remember" inputRef={rememberMe} color="primary" />}
                            label="Запомнить"
                            id="rememberMe"
                            
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={tryLogin}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Забыли пароль?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Создать аккаунт"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default LoginPage