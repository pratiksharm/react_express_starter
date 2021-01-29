import React, { useContext, useEffect, useState } from "react";
import _ from "lodash-es";
import * as RS from 'text-readability';
import * as dayjs from "dayjs";
import "./forms.css";
import { gql, useMutation } from '@apollo/client';
import InputRange from './Input';
import {AuthContext} from '../contexts/AuthContext';


const ADD_JOURNAL = gql`
  mutation AddJournal($content: String!, $count: Float!, $completed: Boolean!,$googleId: String!){
    addJournal(content: $content , count: $count, completed: $completed, googleId: $googleId ) {
    id 
    content
    count
    completed
    googleId
  }
  }
`;


const Form = () => {
  const [word, setWord] = useState("");
  const date = new dayjs();
  const [completed, setCompleted] = useState(false);

  const authContext = useContext(AuthContext);
  const userProfile = JSON.parse(localStorage.getItem('user'))
  console.log(userProfile);

  const rightwords = _.words(word, /\b[-?(\w+)?]+\b/gi)
  const count = _.words(word, /\b[-?(\w+)?]+\b/gi).length;

  const wordlimit = 100;
  const progress = count / wordlimit;
  const sentences = _.words(word, /[.|!|?]/g).length;

  const [updateJournal] = useMutation(ADD_JOURNAL)
  const nonStopWords = [];

  const stopWords = [
    "a",
    "about",
    "above",
    "after",
    "again",
    "against",
    "ain",
    "all",
    "am",
    "an",
    "and",
    "any",
    "are",
    "aren",
    "aren't",
    "as",
    "at",
    "be",
    "because",
    "been",
    "before",
    "being",
    "below",
    "between",
    "both",
    "but",
    "by",
    "can",
    "couldn",
    "couldn't",
    "d",
    "did",
    "didn",
    "didn't",
    "do",
    "does",
    "doesn",
    "doesn't",
    "doing",
    "don",
    "don't",
    "down",
    "during",
    "each",
    "few",
    "for",
    "from",
    "further",
    "had",
    "hadn",
    "hadn't",
    "has",
    "hasn",
    "hasn't",
    "have",
    "haven",
    "haven't",
    "having",
    "he",
    "her",
    "here",
    "hers",
    "herself",
    "him",
    "himself",
    "his",
    "how",
    "i",
    "if",
    "in",
    "into",
    "is",
    "isn",
    "isn't",
    "it",
    "it's",
    "its",
    "itself",
    "just",
    "ll",
    "m",
    "ma",
    "me",
    "mightn",
    "mightn't",
    "more",
    "most",
    "mustn",
    "mustn't",
    "my",
    "myself",
    "needn",
    "needn't",
    "no",
    "nor",
    "not",
    "now",
    "o",
    "of",
    "off",
    "on",
    "once",
    "only",
    "or",
    "other",
    "our",
    "ours",
    "ourselves",
    "out",
    "over",
    "own",
    "re",
    "s",
    "same",
    "shan",
    "shan't",
    "she",
    "she's",
    "should",
    "should've",
    "shouldn",
    "shouldn't",
    "so",
    "some",
    "such",
    "t",
    "than",
    "that",
    "that'll",
    "the",
    "their",
    "theirs",
    "them",
    "themselves",
    "then",
    "there",
    "these",
    "they",
    "this",
    "those",
    "through",
    "to",
    "too",
    "under",
    "until",
    "up",
    "ve",
    "very",
    "was",
    "wasn",
    "wasn't",
    "we",
    "were",
    "weren",
    "weren't",
    "what",
    "when",
    "where",
    "which",
    "while",
    "who",
    "whom",
    "why",
    "will",
    "with",
    "won",
    "won't",
    "wouldn",
    "wouldn't",
    "y",
    "you",
    "you'd",
    "you'll",
    "you're",
    "you've",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "could",
    "he'd",
    "he'll",
    "he's",
    "here's",
    "how's",
    "i'd",
    "i'll",
    "i'm",
    "i've",
    "let's",
    "ought",
    "she'd",
    "she'll",
    "that's",
    "there's",
    "they'd",
    "they'll",
    "they're",
    "they've",
    "we'd",
    "we'll",
    "we're",
    "we've",
    "what's",
    "when's",
    "where's",
    "who's",
    "why's",
    "would",
  ];
  const keywords = _.difference(rightwords, stopWords)
  //ToDo check for the lowercase()
  const keywordsCount = _.countBy(keywords)

  const readability = RS.fleschReadingEase(word)
  console.log(readability);
  console.log(keywordsCount);
  const googleId = userProfile.googleId;

  const onSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 100000000)
    updateJournal({
      variables: {
        id: id, 
        content: word, 
        count: count, 
        completed: completed,
        googleId: googleId
      }
    })
    setWord("");

  }

  useEffect(() => {
    if (count >= wordlimit) {
      setCompleted(true);
    }
    console.log("this is running for a long time");
  }, [count]);

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}>
        <h1 className="">{date.format("DD,MMMM YYYY")}</h1>
        <div style={{ display: "flex", flex: "row", justifyContent: "space-between" }}>
          <p>count:{count}</p>
          <p>sentences:{sentences}</p>
        </div>
        <InputRange/>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <textarea
            className="textarea leading-loose text-3xl"
            disabled={completed}
            onChange={(e) =>
              setWord(e.target.value)
            }
            onPaste="return false"
            autoComplete={false}
            placeholder="Enter your text here..."
          ></textarea>
          <ul style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {keywords.map((keyword, index) => {
              return (
                <div style={{ border: "1px solid black", borderRadius: "4px", padding: "5px", margin: "4px" }}>
                  {keyword}
                </div>
              )
            })}
          </ul>
          <button >
            Done
        </button>
        </form>
        {/* <PDFViewer>
        <MyDocument input={word} date={date.format("DD,MMMM YYYY")}/>
      </PDFViewer> */}
      </div>

    </div>

  );
};

export default Form;
