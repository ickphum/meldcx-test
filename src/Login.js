import React, { useState } from 'react';
import IconTextField from './IconTextField.js';
import { postData } from './API.js'

export default (props) => {

  const [email, setEmail] = useState("ikm@test.com");
  const [password, setPassword] = useState("meld123");
  const [error, setError] = useState("");

  return <div className="login">
    <div className="login-box">
      <div className="login-heading">Login</div>
      <IconTextField 
        icon="email" 
        placeholder="Email Address" 
        onChange={e => {
            setEmail(e.target.value);
            setError("");
          }}/>
      <IconTextField icon="password" 
        placeholder="Password"
        type="password"
        onChange={e => {
            setPassword(e.target.value);
            setError("");
          }}/>
      <span className="button" onClick={e => { 
        postData('login', {email:email, password:password}, 'fred')
          .then(response => {
            response.text()
              .then(text => {
                console.log(text); 
                if (response.status === 200)
                  props.login(text);
                else 
                  setError(text)
              })
            })
        }
      }>LOG IN</span>
      <p className="errorMessage">{error}</p>
    </div>
  </div>;
}
