//@ts-check
import React, { useState } from 'react';
import { Button, Box } from '@material-ui/core';
import RegisterPage from './panels/RegisterPage';
import SignInPage from './panels/SignInPage';

const App = () => {
  const [activePanel, setActivePanel] = useState('loginPage');   

  const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};


  return (
    <Box>
      <SignInPage/>
      <RegisterPage id='registerPage' go={go}/>
    </Box> 
  );
}

export default App