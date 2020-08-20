import React from 'react';
import { Button } from '@material-ui/core';

const RegisterPage = ({id, go}) => {
    return (
        <div>
            <p>Вы зарегались</p>
            <Button 
                data-to='loginPage'
                onClick={(e) => {
                    go(e)
                }}
            > :) </Button>
        </div>
    )
}

export default RegisterPage;