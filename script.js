let questions = [
{ q:"Wann wurde Vivaldi geboren?", a:["1678","1685","1700","1650"], correct:"1678" },
{ q:"Wo wurde er geboren?", a:["Venedig","Wien","Rom","Paris"], correct:"Venedig" },
{ q:"Wann starb er?", a:["1741","1800","1678","1900"], correct:"1741" },
{ q:"Welches Instrument spielte er?", a:["Geige","Klavier","Flöte","Gitarre"], correct:"Geige" },
{ q:"Wie wurde er genannt?", a:["Roter Priester","Meister","Komponist","Dirigent"], correct:"Roter Priester" },
{ q:"Bekanntestes Werk?", a:["Vier Jahreszeiten","Zauberflöte","Requiem","Symphonie"], correct:"Vier Jahreszeiten" }
];

let current=0,timer,time=20,joker=false,score=0;
let highscore = localStorage.getItem("highscore") || 0;
document.getElementById("highscore").innerText=highscore;

function shuffle(array){
 for(let i=array.length-1;i>0;i--){
  let j=Math.floor(Math.random()*(i+1));
  [array[i],array[j]]=[array[j],array[i]];
 }
 return array;
}

function load(){
 if(current>=questions.length){
  if(score>highscore) localStorage.setItem("highscore",score);
  document.getElementById("question").innerText="Fertig "+score;
  return;
 }

 let q=questions[current];
 document.getElementById("question").innerText=q.q;

 let answers = shuffle([...q.a]); // echte Fisher-Yates Mischung

 let box=document.getElementById("answers");
 box.innerHTML="";

 answers.forEach(ans=>{
  let b=document.createElement("button");
  b.innerText=ans;
  b.onclick=()=>check(ans,b);
  box.appendChild(b);
 });

 start();
}

function check(ans,btn){
 clearInterval(timer);

 let correct = questions[current].correct;
 let buttons=document.querySelectorAll("#answers button");

 buttons.forEach(b=>{
  if(b.innerText===correct){
    b.classList.add("correct");
  }
 });

 if(ans===correct){
  btn.classList.add("correct");
  document.getElementById("correctSound").play();
  score++;
 } else {
  btn.classList.add("wrong");
  document.getElementById("wrongSound").play();
  questions.push(questions[current]);
 }

 document.getElementById("score").innerText=score;

 setTimeout(()=>{
  current++; joker=false; load();
 },1000);
}

function start(){
 time=20;
 document.getElementById("timer").innerText=time;
 timer=setInterval(()=>{
  time--;
  document.getElementById("timer").innerText=time;
  if(time<=0){
    clearInterval(timer);
    questions.push(questions[current]);
    current++; load();
  }
 },1000);
}

document.getElementById("joker").onclick=()=>{
 if(joker) return;

 let btns=[...document.querySelectorAll("#answers button")];
 let correct=questions[current].correct;

 let wrong=btns.filter(b=>b.innerText!==correct);
 wrong[Math.floor(Math.random()*wrong.length)].style.display="none";

 joker=true;
};

load();
