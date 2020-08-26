import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import Header from '../components/Header';
import Debt from '../components/Debt'

const MainPage = ({userLoggedIn}) => {
    const history = useHistory();

    // УБРАТЬ!!
    /* !userLoggedIn && history.push("/login") */

    return (
        <Grid container direction="column"> 
            <Grid item >
                <Header/>
            </Grid>
            <Grid item container>
                <Grid item xs={false} sm={1} />
                <Grid item container xs={12} sm={10}>
                    <Debt name="Виктор" email="victorezs@mail.ru" sum="1000" date="06.11.2020" />
                    <Debt name="Виктор" email="victorezs@mail.ru" sum="10000" date="02.11.2020" />
                    <Debt name="Виктор" email="victorezs@mail.ru" sum="5000" date="06.12.2020" />
                </Grid>
                <Grid item xs={false} sm={1} />
            </Grid>
        </Grid>
    )

}

export default MainPage