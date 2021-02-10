import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {useQuery, gql, useMutation} from "@apollo/client";
import * as dayjs from 'dayjs';
import "./Dashboard.css";
import { GoogleLogout} from 'react-google-login';
import { clientId } from '../configs/clientconfig';
import { GlobalContext } from '../contexts/globalcontext';

const GET_JOURNAL_BY_USER = gql`
  query getJournalByUser($googleId: String!){
      journalsByuser(googleId: $googleId) {
        createdAt,
        completed,
        id
      } 
  }
`
const ADD_JOURNAL = gql`
  mutation AddJournal($googleId: String!){
    addJournal(googleId: $googleId ) {
    id 
    googleId
    createdAt
  }
  }
`;

// My query would look like something
// query getdata { user(id: googleid){ complete, createAt}}
//use lodash to sort the data
// then make a list of true and false statements. 


const Dashboard = ({googleId}) => {

    const {UserLogOut} = useContext(AuthContext);
    const {addJournal} = useContext(GlobalContext);
    const userinfo = JSON.parse(localStorage.getItem('user'))
    const userName = userinfo?.name
    const userAccount = userinfo?.googleId
    const userProfile =  userinfo?.imageUrl
    //query
    const { loading, error, data } = useQuery(GET_JOURNAL_BY_USER, {
        variables: {
          googleId: userAccount}
      });
    const LoggedIn =  localStorage.getItem('user') ? true: false
    const Logout = () => {
        console.log("log out")
        UserLogOut();
    }
    //adding a journal
    const history = useHistory();
    const [
        updateJournal,
        {loading: mutationLoading, 
        error: mutationError, 
        data: mutationData}
    ] = useMutation(ADD_JOURNAL)
    const AddJournal = async () => {
        updateJournal({
            variables: {
                googleId: userAccount
            }
        })
        const data = await mutationData;
        console.log(data, "this is the data")
        const journal = {
            id: data?.addJournal.id,
            googleId: data?.addJournal.googleId
        }
        addJournal(journal);
        // // send the mutationData to form and update it
        console.log('added a journal', data?.addJournal.id)
        data ? history.push("/form") : "data not added"
    }

    return (
        <div>
            {LoggedIn ?<div className="con">
                <h1>Dashboard</h1>
                <h2>Hello,{userName}</h2>
                {console.log(data)}
                
                <GoogleLogout
                    clientId= {clientId}
                    buttonText="Logout"
                    onLogoutSuccess={Logout}
                ></GoogleLogout>
                <button type="button" onClick={AddJournal}>New Entry</button>
                <img src={userProfile} alt="profileImage" />
                <div> 
                    <h2>UPCOMING FEATURES</h2>
                    <ul>
                        <li> Create your own MileStones </li>
                        <li> How much time you have spend writing your journals</li>
                        <li> How many words you have written</li>
                        <li> What are your favourate words/</li>
                        <li> Make a list of words that you would like to use in your journals</li>
                        
                    </ul> </div>
                <div className="dashcontainer">
                    {data && data.journalsByuser.map((journal, index) => {
                        const date = journal.createdAt
                        return (
                            <div key={index} >
                                <div className={journal.completed ? "complete" : "incomplete"}></div>
                                <div>{dayjs(date).format("DD,MM YYYY")}</div>
                            </div>
                        )
                    })}
                </div>
            </div> : <Redirect to="/"></Redirect>
            }
            
        </div>
    )
}
export default Dashboard;