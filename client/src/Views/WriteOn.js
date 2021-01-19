import React from 'react';
import "./WriteOn.css";


const WriteOn = () => {
    const data = [
        "Love",
        "Friends",
        "Relationship",
        "Carrer",
        "Passion",
        "Family",
        "Travel",
        "Goals",
        "Achievement",
        "Nature",
        "Money",
        "Childhood",
        "Education",
        "Learning",
        "Mind",
        "Body",
        "Stupidity",
        "Stories",
        "Jokes",
        "Me",
        "Tension",
        "Exams",
        "Stress",
        "Games",    
        "School",
        "College",
        "Time",
        "Soul",
        "Ideas",
        "College",
        "Work",
        "Struggle",
        "Life",
    ]
    return (
        <div className="writeContainer"> 
            {data.map((name, index) => {
                return (
                    <div key={index} className="childContainer">
                        <div className="text">{name}</div>
                    </div>
                )
            })}
        </div>
    )
    
}

export default WriteOn;