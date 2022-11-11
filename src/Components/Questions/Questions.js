import React from "react";
import "./Questions.css"

const Questions=props=>{

     
   
   

    return(
        <div className="questions">
        <p>{props.question}</p>
        <div>
        {props.array_of_options.map(obj=><button className="button" disabled={obj.check_clicked} onClick={()=>props.handleClick(obj.id)} style={{backgroundColor:obj.backgroundColor}} key={obj.id}>{obj.incorrect_answer ||obj.correct_answer }</button>)}
        </div>
        </div>
    )
}
export default Questions