let current=[], index=0, score=0, wrong=[], timer, time=25;

function shuffle(a){ return a.sort(()=>Math.random()-0.5); }

function startQuiz(type){
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    current = type==="wrong" ? wrong : shuffle([...questions[type]]);
    index=0; score=0;

    load();
}

function load(){
    if(index>=current.length){
        alert("Fertig "+score+"/"+current.length);
        location.reload();
        return;
    }

    let q=current[index];
    document.getElementById("question").innerText=q.frage;

    let answersDiv=document.getElementById("answers");
    answersDiv.innerHTML="";

    shuffle(q.antworten).forEach(a=>{
        let btn=document.createElement("button");
        btn.innerText=a;
        btn.onclick=()=>check(btn,a,q);
        answersDiv.appendChild(btn);
    });

    document.getElementById("counter").innerText=
        "Frage "+(index+1)+" von "+current.length;

    document.getElementById("progress").style.width=
        ((index+1)/current.length*100)+"%";

    startTimer();
}

function check(btn,selected,q){
    clearInterval(timer);

    let correct=q.antworten[q.richtig];

    document.querySelectorAll("#answers button").forEach(b=>{
        if(b.innerText===correct) b.classList.add("correct");
    });

    if(selected===correct){
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        wrong.push(q);
    }
}

function nextQuestion(){
    index++;
    load();
}

function startTimer(){
    time=25;
    document.getElementById("timer").innerText="Zeit: "+time;

    timer=setInterval(()=>{
        time--;
        document.getElementById("timer").innerText="Zeit: "+time;

        if(time<=0){
            clearInterval(timer);
            wrong.push(current[index]);
        }
    },1000);
}

function useJoker(){
    let correct=current[index].antworten[current[index].richtig];

    document.querySelectorAll("#answers button").forEach(b=>{
        if(b.innerText!==correct && Math.random()<0.5){
            b.style.display="none";
        }
    });
}

const questions = {
xabcd:[
{frage:"Was bedeutet D im ABCDE?",antworten:["Disability","Diagnosis","Depth","Deficit"],richtig:0}
],
labor:[],
med:[],
ekg:[],
miranda:[]
};
