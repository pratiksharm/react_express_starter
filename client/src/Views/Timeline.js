import React, { useContext, useState } from 'react';
import { Chrono } from "react-chrono";
import {useQuery, gql} from "@apollo/client";
import MarkdownEditor from '../components/Editor';
import {debounce} from "lodash-es";
import './Timeline.css'

import Editor from 'rich-markdown-editor';
const GET_JOURNAL = gql`
  query {
  getJournals{
    content
    id
  }
}
`
const GET_JOURNAL_BY_USER = gql`
  query getJournalByUser($googleId: String!){
      journalsByuser(googleId: $googleId) {
        content
      }
    
  }
`

const items = [
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
      cardDetailedText: `On 10 May 1940, Hitler began his long-awaited offensive in the west by invading neutral Holland and Belgium and attacking northern France. Holland capitulated after only five days of fighting, and the Belgians surrendered on 28 May. With the success of the German ‘Blitzkrieg’, the British Expeditionary Force and French troops were in danger of being cut off and destroyed.`
    },
    
]

function Timeline({googleId}) {
  const [word, setWord] = useState("");
  const [editor, setEditor] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'))
  const userAccount = user.googleId
  console.log(googleId, userAccount, typeof(userAccount), )
  const { loading, error, data } = useQuery(GET_JOURNAL_BY_USER, {
    variables: {
      googleId: userAccount}
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const handleChange = debounce(value => {
    const text = value();
    console.log(text)
    localStorage.setItem("saved", text);
    setWord(text);
  }, 250)
  return (
        <div className="container">
        {console.log(editor)}
        {console.table(data)}
      <div className="container">
        <Editor id="example" autoFocus template="Template"/>
      </div>
        
{/*         
          {console.log(data)}
        {data.getJournals.map((journal) => {
          return (
            <div key={journal.id}>
              <div ></div>
              <div> {journal.count}</div>
              <div> {journal.content}</div>   
              <div> {journal.completed}</div>
            </div>
          )
          
        })}
         */}
      </div>

    )
    
}

export default Timeline;

