import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
doc,
setDoc,
getDoc,
getDocs,
collection,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAjbUW16bJwLLsBcRn8l9oLjK6TNSIL1sg",
authDomain: "fantasy-tour-france.firebaseapp.com",
projectId: "fantasy-tour-france",
storageBucket: "fantasy-tour-france.firebasestorage.app",
messagingSenderId: "101503786956",
appId: "1:101503786956:web:e4d45d9b1ab1553b910769",
measurementId: "G-0N2HFCYVEE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const players=["Val","Tits","Tote","Vic","Mits"];

for(let i=1;i<=21;i++){
stage.innerHTML+=`<option>${i}</option>`;
resultStage.innerHTML+=`<option>${i}</option>`;
}

async function initScores(){

for(const p of players){

const ref=doc(db,"scores",p);

const snap=await getDoc(ref);

if(!snap.exists()){
await setDoc(ref,{points:0});
}

}

}

window.savePrediction=async()=>{

const player=document.getElementById("player").value;

await setDoc(
doc(db,"predictions",
`${stage.value}_${player}`),
{
player,
stage:Number(stage.value),
p1:p1.value,
p2:p2.value,
p3:p3.value
}
);

alert("Pronostic enregistré");
};

window.saveResult=async()=>{

const stageNumber=resultStage.value;

await setDoc(
doc(db,"results",stageNumber),
{
winner:winner.value,
second:second.value,
third:third.value
}
);

await calculate(stageNumber);

alert("Résultat enregistré");
};

async function calculate(stageNumber){

const resultSnap=
await getDoc(doc(db,"results",stageNumber));

const result=resultSnap.data();

const predictions=
await getDocs(collection(db,"predictions"));

for(const p of predictions.docs){

const pred=p.data();

if(pred.stage!=stageNumber) continue;

let score=0;

const podium=[
result.winner,
result.second,
result.third
];

[pred.p1,pred.p2,pred.p3]
.forEach(r=>{

if(podium.includes(r))
score+=3;

});

if(
[pred.p1,pred.p2,pred.p3]
.includes(result.winner)
){
score+=2;
}

const scoreRef=
doc(db,"scores",pred.player);

const current=
await getDoc(scoreRef);

const currentScore=
current.data().points || 0;

await setDoc(scoreRef,{
points:currentScore+score
});

}

}

window.giveJersey=async()=>{

const player=
document.getElementById("jerseyWinner").value;

const scoreRef=doc(db,"scores",player);

const current=await getDoc(scoreRef);

await setDoc(scoreRef,{
points:(current.data().points||0)+3
});

};

onSnapshot(
collection(db,"scores"),
snapshot=>{

let rows=[];

snapshot.forEach(doc=>{
rows.push({
player:doc.id,
points:doc.data().points
});
});

rows.sort((a,b)=>b.points-a.points);

ranking.innerHTML=rows.map(r=>`
<tr>
<td>${r.player}</td>
<td>${r.points}</td>
</tr>
`).join("");

}
);

initScores();
