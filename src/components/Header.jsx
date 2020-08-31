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
import { storeData } from '../data/localStorage';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const setUserLoggedIn = props.setUserLoggedIn

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

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Typography className={classes.typographyStyles} variant='h4'>
                            В долгах
                    </Typography>
                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <MenuIcon style={{ color: 'white' }}/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Профиль</MenuItem>
                <MenuItem onClick={tryLogout}>Выйти</MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default Header;