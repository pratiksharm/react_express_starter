import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {Redirect} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import {clientId} from '../configs/clientconfig';
import { gql, useMutation } from '@apollo/client';


const ADD_USER = gql`
  mutation AddUser($googleId: String!, $displayName: String!, $firstName: String!, $lastName: String!, $image: String! ){
    addUser(googleId: $googleId, displayName: $displayName,firstName: $firstName, lastName: $lastName, image: $image) {
    googleId
    displayName
    firstName
    lastName
    image
  }
  }
`;

const LoginPage = () => {
    const {UserLogin} = useContext(AuthContext);
    const history = useHistory();
    const [updateUser] = useMutation(ADD_USER)

    const responseSuccessGoogle = async (response) => {
        console.log(response)
        const newUser = {
            token: response?.tokenId,
            user: response?.profileObj
        }
        UserLogin(newUser);
        // authContext.isLoggedIn = true
        // authContext.token = response?.tokenId
        // authContext.user = response?.profileObj
        updateUser({variables: {
            googleId: response.profileObj.googleId, 
            displayName: response.profileObj.name,
            firstName: response.profileObj.givenName, 
            lastName: response.profileObj.familyName, 
            image: response.profileObj.imageUrl,
        }})
        history.push('/dashboard')
    }
    const responseErrorGoogle = (res) => {
        console.log(res);
    }   
    const LoggedIn =  localStorage.getItem('user') ? true: false
    return (
        <div>
    <div>
        { !LoggedIn ? <GoogleLogin
            clientId={clientId}
            buttonText="Login with google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
            />
            :
            <Redirect to="/dashboard"></Redirect>
        }
    
        
        </div>
    </div>
    )
        
}

export default LoginPage