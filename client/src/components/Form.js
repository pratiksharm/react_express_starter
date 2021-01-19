import React, { useContext, useEffect, useState } from "react";
import _ from "lodash-es";
import * as dayjs from "dayjs";
import "./forms.css";


import {GlobalContext} from '../contexts/globalcontext';

const Form = () => {
  const [word, setWord] = useState("");
  const date  = new dayjs();
  const [completed, setCompleted] = useState(false);

  //adding data to the globalContext 
  const { addJournal} = useContext(GlobalContext);
  const rightwords = _.words(word, /\b[-?(\w+)?]+\b/gi)
  const count = _.words(word, /\b[-?(\w+)?]+\b/gi).length;

  const wordlimit = 100;
  const progress = count / wordlimit;
  const sentences = _.words(word, /[.|!|?]/g).length;
  
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
  const keywords = _.difference(rightwords,stopWords)
  //To Do check for the lowercase()
  const keywordsCount = _.countBy(keywords);
  console.log(keywordsCount);

  const onSubmit = (e) => {
    e.preventDefault();
    const newJournal = {
      id: Math.floor(Math.random() * 100000000),
      content: word,
      count: count,
      sentences: sentences,
      completed: completed,
      date: date
    }
    addJournal(newJournal);
    setWord("");
    console.log(newJournal, "added");
  }

  useEffect(() => {
    if (count >= wordlimit) {
      setCompleted(true);
    }
    console.log("this is running for a long time");
  }, [count]);

  return (
    <div className="md:container md:mx-auto flex-col">
      <h1 className="text-7xl">{date.format("DD,MMMM YYYY")}</h1>
      <ul>
        <p>{keywords}</p>
      </ul>
      <p>count:{count}</p>
      <p>sentences:{sentences}</p>
      <form onSubmit={onSubmit}>
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
        <button className="bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          Done
        </button>
      </form>
    </div>
  );
};

export default Form;
