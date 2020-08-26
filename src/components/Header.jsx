import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1,
        fontStyle: 'bold',
        textDecoration: 'underline'
    }
}));

const Header = () => {

    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.typographyStyles} variant='h4'>
                    В долгах
                </Typography>
                <IconButton>
                    <MenuIcon style={{color: 'white'}}/>
                </IconButton>                
            </Toolbar>
        </AppBar>
    );
};

export default Header;