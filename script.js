const scoreCounterContainer=document.querySelector(".score-counter");
const options=document.querySelector(".options").children;
const questionNumberSpan=document.querySelector(".question-num-value");
const totalQuestionSpan=document.querySelector(".total-question");
const correctAnswerSpan=document.querySelector(".correct-answers");
const totalQuestionSpan2=document.querySelector(".total-question2");
const percentage=document.querySelector(".percentage");
const question=document.querySelector(".question");
const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
const op4=document.querySelector(".option4");
let questionIndex;
let index=0;
let myArray=[];
let myArr=[];
let score=0;

// questions and options and answers

const questions=[
{
    q: 'What is the name Corona virus is known globally as?',
    options: ['Covick-19','SARS-Cov','COVID-19','Coro Coro'],
    answer:2
},
{
    q: 'Corona virus was first reported in what country?',
    options: ['India','China','North Korea','Australia'],
    answer:1
},
{
    q: 'Where is the headquaters of World Health Organization?',
    options: ['Switzerland','China','USA','Ethiopia'],
    answer:0
},
{
    q: 'Southern blotting, a molecular biology technique, is named after?',
    options: ['Smith Southern','Edward Southern','Kary Mullis','Albert Einstein'],
    answer:1
},
{
    q: 'What type of nucleic acid is found in the corona virus?',
    options: ['RNA-ve','RNA+ve','DNA','RNA'],
    answer:0
}
]

// set questions and options and question number
totalQuestionSpan.innerHTML=questions.length;
function load(){
        questionNumberSpan.innerHTML=index+1;
        question.innerHTML=questions[questionIndex].q;
        op1.innerHTML=questions[questionIndex].options[0];
        op2.innerHTML=questions[questionIndex].options[1];
        op3.innerHTML=questions[questionIndex].options[2];
        op4.innerHTML=questions[questionIndex].options[3];
        index++;
}

function check(element){
    if(element.id==questions[questionIndex].answer){
        element.classList.add("correct");
        updateScoreCounter("correct")
        score++;
        console.log("score:"+score)
    }
    else {
        element.classList.add("wrong");
        console.log("wrong")
        updateScoreCounter("wrong")
}
disabledOptions()
}
function disabledOptions(){
    for(let i=0; i<options.length; i++){
        options[i].classList.add("disabled");
        if(options[i].id==questions[questionIndex].answer){
            options[i].classList.add("correct");
        }
    }
}
function enableOptions(){
    for(let i=0; i<options.length; i++){
        options[i].classList.remove("disabled", "correct", "wrong");
    }
}
function validate(){
    if (!options[0].classList.contains("disabled")){
        alert("Please select an Option")
    }
    else{
        enableOptions();
        randomQuestion();
    }

}
function next(){
    validate();
}

function randomQuestion(){
    let randomNumber=Math.floor(Math.random()*questions.length);
    let hitDuplicate=0;
        if(index==questions.length){
            quizOver();
        }
        else{
        if(myArray.length>0){
            for(let i=0; i<myArray.length; i++){
             if(myArray[i]==randomNumber){
                 hitDuplicate=1;
                 break;
             }
            }
            if (hitDuplicate==1){
                randomQuestion();
            }
            else{
                questionIndex=randomNumber;
                load();
                myArr.push(questionIndex);
            }
        }
        if(myArray.length==0){
            questionIndex=randomNumber;
            load();
            myArr.push(questionIndex);
        }
        
        myArray.push(randomNumber);
        
    }
}
function scoreCounter(){
    for(let i=0; i<questions.length; i++){
        const div=document.createElement("div")
            scoreCounterContainer.appendChild(div);
    }
}

function updateScoreCounter(){

}

function quizOver(){
    document.querySelector(".quiz-over").classList.add(".show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length)*100 + "%";
}
function tryAgain(){
    window.location.reload();

}
window.onload=function(){
    randomQuestion();
    scoreCounter();
}
