import axios from 'axios';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
const APIkey = "AIzaSyDyUjp55HH16Ypke6iRRiCJgwG_CqnUagI";
const clientId = "929067087700-k2oomkroljojq9l3cepbeia8v8qgibe9.apps.googleusercontent.com";
const ClientSecret = "QLOi7ygYafhsqzy3zFJAEQ8Q";

const LoginPage = () => {
    const [login,setLogin] = useState(false);
    const [token ,setToken] = useState("");
    const [profile, setProfile ] = useState({})
    const history = useHistory();

    const responseSuccessGoogle = (response) => {
        console.log(response)
        setLogin(true);
        setToken(response.tokenId)
        setProfile(response.profileObj);
        
        history.push('/dashboard')
        // axios({
        //     method:"POST",
        //     url: "http://localhost:8000/api/googlelogin",
        //     data: {tokenId: response.tokenId}
        // })
    }
    const responseErrorGoogle = (res) => {
        console.log(res);
    }   
    return (
        <div>
    {!login && <div>
        <GoogleLogin
            clientId={clientId}
            buttonText="Login with google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
            />
        </div>

    }
            
  {login && <div>
        <img src={profile.imageUrl} alt="profilepic" />
        <p>{profile.givenName}</p>
        {console.table(profile)}
      </div>
      }
        </div>
    )
        
}

export default LoginPage