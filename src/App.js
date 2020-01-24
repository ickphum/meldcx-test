import React, { useState } from 'react';
import './App.css';
import Login from './Login.js';
import Devices from './Devices.js';


function App() {

  const [authToken, setAuthToken] = useState("");

  return authToken
    ? <Devices authToken={authToken} logout={() => setAuthToken("")}/>
    : <Login login={(token) => setAuthToken(token)}/>

}

export default App;
