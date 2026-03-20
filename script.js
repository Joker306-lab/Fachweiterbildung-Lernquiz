function showScreen(id){document.querySelectorAll('.screen').forEach(el=>el.classList.remove('active'));document.getElementById(id).classList.add('active');}
function openHome(){showScreen('homeScreen')}
function goHome(){showScreen('homeScreen')}
function restartQuiz(){showScreen('homeScreen')}
function setMode(mode){document.getElementById('modeLearningBtn')?.classList.toggle('active', mode==='learning');document.getElementById('modeExamBtn')?.classList.toggle('active', mode==='exam')}
function startQuiz(module){showScreen('quizScreen');document.getElementById('moduleLabel').innerText=module;document.getElementById('counter').innerText='Start';}
function useJoker(){}
function nextQuestion(){}
document.addEventListener('DOMContentLoaded',()=>setMode('learning'))