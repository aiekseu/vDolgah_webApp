import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    useScrollTrigger,
    Slide,    
    CssBaseline
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                    <Typography className={classes.typographyStyles} variant='h4'>
                        В долгах
                    </Typography>
                    <IconButton>
                        <MenuIcon style={{ color: 'white' }} />
                    </IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </React.Fragment>
    );
};

export default Header;