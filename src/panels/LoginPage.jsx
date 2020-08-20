import React from 'react';
import { Button } from '@material-ui/core';

const LoginPage = ({id, go}) => {
    return (
        <div>
            <p>Добро пожаловать!</p>
            <Button 
                data-to='registerPage'
                onClick={(e) => {
                    go(e)
                }}
            > Зарегистрироваться </Button>
        </div>
    )
}

export default LoginPage;