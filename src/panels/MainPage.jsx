import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Header from '../components/Header';

const MainPage = ({userLoggedIn}) => {
    const history = useHistory();

    !userLoggedIn && history.push("/login")

    return (
        <Grid container direction="column"> 
            <Grid item >
                <Header/>
            </Grid>
            <Grid item container>
                <Grid item xs={false} sm={1} />
                <Grid item xs={12} sm={10}>
                    <p>говно ы</p>
                </Grid>
                <Grid item xs={false} sm={1} />
            </Grid>
        </Grid>
    )

}

export default MainPage