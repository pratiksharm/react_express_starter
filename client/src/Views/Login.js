import axios from 'axios';
import React, { useContext, useState } from 'react';

import {AuthContext} from '../contexts/AuthContext';

import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
const clientId = "929067087700-k2oomkroljojq9l3cepbeia8v8qgibe9.apps.googleusercontent.com";
const ClientSecret = "QLOi7ygYafhsqzy3zFJAEQ8Q";

const LoginPage = () => {
    const [token,setToken ] = useState(null);
    const authContext = useContext(AuthContext);
    const history = useHistory();

    const responseSuccessGoogle = (response) => {
        console.log(response)
        authContext.isLoggedIn = true
        authContext.token = response.tokenId
        authContext.user = response.profileObj
        console.table(authContext);
        history.push('/dashboard')

    }
    const responseErrorGoogle = (res) => {
        console.log(res);
    }   
    return (
        <div>
    <div>
        <GoogleLogin
            clientId={clientId}
            buttonText="Login with google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
            />
        </div>
    </div>
    )
        
}

export default LoginPage