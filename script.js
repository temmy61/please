const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const cat = document.getElementById("cat");

let noCount = 0;
let yesScale = 1;

const texts = [

"Are you sure?",

"Really sure?",

"Please?",

"Think again...",

"Pretty please?",

"Don't break my heart 💔",

"Last chance!",

"You know you want to.",

"Fine... 😢"

];

yesBtn.addEventListener("click",celebrate);

noBtn.addEventListener("click",()=>{

    noCount++;

    yesScale*=1.2;

    yesBtn.style.transform=`scale(${yesScale})`;

    let shrink=Math.max(.18,1-noCount*0.08);

    noBtn.style.transform=`scale(${shrink})`;

    let x=(Math.random()*180)-90;

    let y=(Math.random()*120)-60;

    noBtn.style.left=x+"px";

    noBtn.style.top=y+"px";

    if(noCount<=texts.length){

        message.textContent=texts[noCount-1];

    }

    if(noCount>=12){

        message.innerHTML="I'll take that as a YES ❤️";

        celebrate();

    }

});

function celebrate(){

    message.innerHTML="Yay!! ❤️";

    cat.classList.add("happy");

    confettiBurst();

}

/* ----------------------- */
/* CONFETTI */
/* ----------------------- */

const canvas=document.getElementById("confetti");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});

function confettiBurst(){

    let pieces=[];

    for(let i=0;i<220;i++){

        pieces.push({

            x:canvas.width/2,

            y:canvas.height/2,

            r:Math.random()*6+4,

            dx:(Math.random()-.5)*12,

            dy:(Math.random()-1)*14,

            c:`hsl(${Math.random()*360},100%,60%)`

        });

    }

    let animation=setInterval(()=>{

        ctx.clearRect(0,0,canvas.width,canvas.height);

        pieces.forEach(p=>{

            p.x+=p.dx;

            p.y+=p.dy;

            p.dy+=.18;

            ctx.fillStyle=p.c;

            ctx.fillRect(p.x,p.y,p.r,p.r);

        });

    },16);

    setTimeout(()=>{

        clearInterval(animation);

        ctx.clearRect(0,0,canvas.width,canvas.height);

    },3000);

}
