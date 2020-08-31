//@ts-check
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import RegisterPage from './panels/RegisterPage';
import LoginPage from './panels/LoginPage';
import MainPage from './panels/MainPage';
import ProfilePage from './panels/ProfilePage';


const App = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
      <Switch>
        <Route exact path="/" render={() => <MainPage userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/login" render={() => <LoginPage setUserLoggedIn={setUserLoggedIn} />} />
        <Route path="/register" render={() => <RegisterPage />} />
        <Route path='/profile' render={() => <ProfilePage setUserLoggedIn={setUserLoggedIn} />} />
      </Switch>
  );
}

export default App