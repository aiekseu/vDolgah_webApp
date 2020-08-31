import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    useScrollTrigger,
    Slide,
    CssBaseline,
    Menu,
    MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getData, storeData } from '../data/localStorage';
import { useHistory } from "react-router-dom";

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyles = makeStyles((theme) => ({
    menu: {
        display: 'flex',
        right: 0
    },
    typographyStyles: {
        flex: 1,
        fontStyle: 'bold',
        textDecoration: 'underline'
    },
}));


function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Header = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const setUserLoggedIn = props.setUserLoggedIn

    const pageId = props.pageId
    const isMain = pageId === 'main' ? true : false

    const currentUser = getData('loggedUser')
    const allUsers = getData('users')
    var userName = ""
    for (let i = 0; i< allUsers.length; i++) {
        if (allUsers[i].EMAIL === currentUser)
            userName = allUsers[i].NAME
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const tryLogout = () => {
        storeData('loggedUser', null)
        setUserLoggedIn(false)
    }

    const goToProfile = () => {
        history.push('/profile')
    }

    const goToMain = () => {
        history.push('/')
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        {
                            !isMain 
                            && <IconButton
                                    style={{paddingLeft: '0', paddingRight: '0', color: 'white'}}
                                    onClick={goToMain}
                                >
                                    <ArrowBackIosIcon/>
                                </IconButton>
                        }
                        <Typography className={classes.typographyStyles} variant='h4'>
                            В долгах
                        </Typography>
                        <IconButton 
                            aria-controls="simple-menu" 
                            aria-haspopup="true" 
                            onClick={handleClick} 
                            style={{ color: 'white', fontSize: '1.2rem', paddingRight: '0' }}
                        >
                            <AccountCircleIcon style={{marginRight: '4px', fontSize: '1.8rem'}}/>{userName}<ArrowDropDownIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />

            <Menu
                className={classes.menu}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                { 
                    isMain
                    ? <MenuItem onClick={goToProfile}>Профиль</MenuItem>
                    : <MenuItem onClick={goToMain}>Мои долги</MenuItem>
                }
                {
                    !isMain && <MenuItem onClick={goToMain}>Редактировать</MenuItem>
                }
                <MenuItem onClick={tryLogout}>Выйти</MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default Header;