import React from "react";
import "./startTest.css"

const StartTest=(props)=>{
   


    return(
        (props.level===1)?<section className="introduction">

        <h1>Instructions</h1>
        <p>This is a short quiz three level game that consists of five questions taken from the Api. The purpose of this test is to test your knowledge in computers.</p>
        
        <h2>Notes</h2>
        <ul>
            <li>This test is not timed.</li>
            <li>You are only allowed to select one option per question.</li>
            <li>If two options are selected from one question, you will directed page where you be able to resfresh the test.</li>
            <li>Refreshing will not return your responses, hence you might get a different set of questions.</li>

        </ul>
        <p>Thanks, please click the below button to start the test</p>
        <button className="start-button"  onClick={props.start}>Start test</button>

    </section>:props.level===2?<section className="introduction">

        <h1>Well done!!!</h1>
        <p>Keep going champ, when you are ready hit the start button</p>
        <button className="start-button" onClick={props.start}>Start test</button>
         </section>:<section className="introduction">
            <h1>Congratulations!!!</h1>
        <p>You have reached the last level of this quiz. you know the story hit start button when you are ready</p>
        <button className="start-button" onClick={props.start}>Start test</button>
</section>

    )
}

export default StartTest;