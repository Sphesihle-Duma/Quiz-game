
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React,{useEffect,useState} from "react";
import Questions from "./Components/Questions/Questions";
import  {nanoid}  from 'nanoid';
import StartTest from "./Components/StartTest/StartTest";
import "./App.css"

export default function App(){

    const[arrayOfQustions,setArrayOfQuestions]=useState([]);
    const[count,setCount]=useState(0);
    const[refresh,setRefresh]=useState(false);
    const[showAnswers,setShowAnswers]=useState(false);
    const[startTest,setStartTest]=useState(false);
    const[level,setLevel]=useState(1);
    
    console.log(level);


 useEffect(()=>{
   let count=0;
 
    for(let i=0;i<arrayOfQustions.length;i++){

        for(let j=0; j<arrayOfQustions[i].array_of_option.length;j++){
            if(arrayOfQustions[i].array_of_option[j].check_clicked){
                count++
                if(count>1){
                    setRefresh(true);
                }
                
            }
        }
        
      count=0;
    }
    
console.log(count);

 },[arrayOfQustions])   


 useEffect(()=>{
    if(level===2){
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple")
        .then(res=>res.json())
        .then(data=>setArrayOfQuestions(data.results.map(item=>{
            return{
            question:item.question,
                
            array_of_option:shuffleArray(push_or_not(check(give_each_button_id(item.incorrect_answers),convert_to_object(item.correct_answers)),give_each_button_id(item.incorrect_answers),convert_to_object(item.correct_answer)))
            }
        })))
        setStartTest(false);
        setShowAnswers(false)
    }
    else if(level===3){
        fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple")
        .then(res=>res.json())
        .then(data=>setArrayOfQuestions(data.results.map(item=>{
            return{
            question:item.question,
                
            array_of_option:shuffleArray(push_or_not(check(give_each_button_id(item.incorrect_answers),convert_to_object(item.correct_answers)),give_each_button_id(item.incorrect_answers),convert_to_object(item.correct_answer)))
            }
        })))
        setStartTest(false);
        setShowAnswers(false)
    }
    
 },[level])


 useEffect(()=>{

    fetch("https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple")
    .then(res=>res.json())
    .then(data=>setArrayOfQuestions(data.results.map(item=>{
        return{
        question:item.question,
            
        array_of_option:shuffleArray(push_or_not(check(give_each_button_id(item.incorrect_answers),convert_to_object(item.correct_answers)),give_each_button_id(item.incorrect_answers),convert_to_object(item.correct_answer)))
        }
    })))
     


 },[])
 


 /* convert answer button to an object and give it id and background color properties */
   

 const convert_to_object=(answer_button)=>{
    const newAnswer=answer_button;
    return{
        id:nanoid(),
        correct_answer:newAnswer,
        check_clicked:false,
        backgroundColor:"#FFFFFF"

    }
}


  /*give each button backgroun color and id properties */
  const give_each_button_id=(array_of_incorrect_answers)=>{
    const newArr =[...array_of_incorrect_answers];
     const array_of_objects= newArr.map(item=>{
          return {
              
              id:nanoid(),
              incorrect_answer:item,
              check_clicked:false,
              backgroundColor:"#FFFFFF"
              
          }
      }  
          )
          return array_of_objects
    }
 


/* checking whether the answer button is into the array of the incorrect answers */
const check =(array_of_questions,correctAnswer)=>{
    const questionsWithAnswer = [...array_of_questions]

    for(let i = 0; i<questionsWithAnswer.length; i++){
        if(questionsWithAnswer[i].id===correctAnswer.id){
            return true;
        }
    }
    
    
    return false;
    
    
   }
   
/* pushing the answer button into the array of incorrect answers */


const push_or_not =(output_of_check,array_of_incorrect_answers,correct_answer)=>{
    const combined_array=[...array_of_incorrect_answers]
    if(!output_of_check){
     combined_array.push(correct_answer)
    
    }
    return combined_array;
}

 /* Reshuffling the array function*/   

 function shuffleArray(arr) {
    const newArray=[...arr]

    
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
  return newArray;
  }

const increment=(array,id)=>{
    const questionsWithAnswer = [...array]
    
    for(let i = 0; i<questionsWithAnswer.length; i++){
        if(questionsWithAnswer[i].id===id && questionsWithAnswer[i].hasOwnProperty('correct_answer')){
            setCount(prevCount=>prevCount+1)
            
        }
    }
    
    
    
    
}

/* changing background color of the clicked button/option */

  const change_color_of_button=(id)=>{
   setArrayOfQuestions(prevArr=>{
    return prevArr.map(obj=>{
        return {question:obj.question,array_of_option:obj.array_of_option.map(item=>{
            return item.id===id? {...item,backgroundColor:"#1172b8",check_clicked:true}:{...item}
        })}

    })
})

for(let i=0; i<arrayOfQustions.length;i++){
  
    increment(arrayOfQustions[i].array_of_option,id)
  
}
}


const refreshPage=()=> {
    window.location.reload(false);
  }

const handleSubmit=()=>{
    setShowAnswers(true);
    setArrayOfQuestions(prevArr=>{
        return prevArr.map(obj=>{
            return {question:obj.question,array_of_option:obj.array_of_option.map(item=>{
                return item.correct_answer?{...item,backgroundColor:"#61eb34"}:{...item}
            })}
    
        })
    })
}
 
 const display_questions_and_options=arrayOfQustions.map(obj=><Questions key={obj.question} handleClick={change_color_of_button} array_of_options={obj.array_of_option} question={obj.question}/>)
 
 const display_correct_answers=arrayOfQustions.map(obj=><Questions key={obj.question}  array_of_options={obj.array_of_option} question={obj.question}/>)



const show_test_heading=(!refresh && arrayOfQustions.length>0 && showAnswers===false)

const show_submit_button=(!refresh && !showAnswers && arrayOfQustions.length>0)

const show_questions=(!refresh && !showAnswers);

const error_handling_ui=<div>
    <p className="error">You have selected two options from one of the quesitions. Please click the refresh button below to start the test again. Note your answers were not saved.</p>
    <button className="refresh-button" onClick={refreshPage}>refresh</button>
    </div>

  const start_the_test=()=>{
    setStartTest(prev=>!prev)
  }  
  const update_level=()=>{
    setLevel(prevlevel=>prevlevel + 1)
    setCount(0);
  }

return(
  !startTest && (level===1 || level>1)? <StartTest level={level} start={start_the_test}/>: <div className="App">

      {show_test_heading && <h1>Level {level}</h1>}

      {show_questions && display_questions_and_options}
        <br></br>
      { show_submit_button && <button className="submit-button" onClick={handleSubmit}>submit</button>}

      {refresh && error_handling_ui}

      {showAnswers && <h2>Correct answers</h2>}

      {showAnswers && <p>Your score is: {count} {count>2?"Passed":"Failed"}</p>}

     
      
      {showAnswers && display_correct_answers}
      
      <br></br>

      {showAnswers && count>2 && level<3 &&<button className="submit-button" onClick={update_level}>Next level</button>}
      

        </div> 
    
      
    )

     
}