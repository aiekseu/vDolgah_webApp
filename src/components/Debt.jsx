import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardActions, CardContent, Button, Typography, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: '8px'
    },
    name: {
        
    },
    sum: {
        fontStyle: 'italic'

    },
    date: {
        textAlign: 'right'
    },
    buttons: {
        display: 'flex', 
        flexDirection: 'row'
    },
    button: {
        fontSize: '16px', 
        paddingBottom: '10px', 
        paddingTop: '0px',
        paddingLeft: '0px',
        paddingRight: '0px'
    }
});

export default function Debt({name, sum, email, date}) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card className={classes.root} variant="outlined">
                <Grid container direction='column'>
                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Мне должен
                        </Typography>
                    </Grid>

                    <Grid item container direction='row' justify="space-between">
                        <Grid item>
                            <CardContent>
                                <Typography className={classes.name} variant="h5" component="h6">
                                    {name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="h2">
                                    {email}
                                </Typography>                                                            
                            </CardContent>
                        </Grid>

                        <Grid item>
                            <CardContent>
                                <Typography className={classes.sum} variant="h6" component="h6">
                                    {sum} руб.
                                </Typography>
                                <Typography className={classes.date} variant="body2" color="textSecondary" >
                                    {date}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>                

                    <CardActions className={classes.buttons}>
                        <Grid container direction='row' justify="space-evenly" alignItems="flex-end">
                            <Grid item>
                                <IconButton 
                                    className={classes.button}
                                    > <DeleteIcon/> Удалить
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton 
                                    className={classes.button}
                                    > <EditIcon/> Редактировать
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton 
                                    className={classes.button}
                                    > <MailIcon/> Напомнить
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Grid>
            </Card>
        </Grid>
    );
}
