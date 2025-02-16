let quote=document.querySelector(".quote");
let quote_display=document.querySelector("#char_display");
let total_characters=document.querySelector(".total");
let input_area=document.querySelector(".input_area");
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let total_text=document.querySelector(".total_text");
let show_res=document.querySelector(".show_res");
let final_errors=document.querySelector(".final_errors");
let accuracy_rate=document.querySelector(".accuracy_rate");
let remark=document.querySelector(".remark");
let result=document.querySelector(".result");

let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let total_letters=0;
let errors=0;

let TIME_LIMIT=75;
let timeLeft = TIME_LIMIT;
let characterTyped=0;
let timeElapsed = 0;
let total_errors = 0;
// let accuracy = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

const url = "https://catfact.ninja/fact";
async function getFacts() {
    try{
        let res=await fetch(url);
        let data=await res.json();
        return data.fact;
    }
    catch(e){
        console.log("error");

    }
    
}
window.onload = function() {
    document.getElementById("popup").classList.add("show");
};

// Close popup
function closePopup() {
    document.getElementById("popup").classList.remove("show");
}
let real_fact = [];
quote.addEventListener("click",async()=>{
    total_errors=0;
    for (let i=1;i<=5;i++){
        let fact= await getFacts();
        quote_display.innerText=`${i}- ${fact}`;
        total_text.innerText= fact.length;
        total_letters +=fact.length;
        real_fact=fact.split('');
        
        input_area.value="";
        quote.innerHTML="";
        
        await new Promise(resolve => setTimeout(resolve, 15000)); 
        total_errors+=errors;
        console.log("errors",total_errors);
    }
   
    setInterval(() => {
        if (input_area) {
            input_area.value = '';
            console.log('Input field cleared');
        }
    }, 15000);
    
    
});


function processCurrentText() {
    const curr_input = input_area.value; // Current input value
    const curr_input_array = curr_input.split('');
    characterTyped++;
    const displayArea = document.querySelector("#char_display"); // Container for characters
    
    quote.innerHTML="";
    errors=0;
    
    for (let i = 0; i < curr_input_array.length; i++) {
        const span = document.createElement('span');
        span.innerText = curr_input_array[i];

        // Compare with real_fact
        if (i < real_fact.length && real_fact[i] === curr_input_array[i]) {
            span.classList.add('correct_char');
            span.classList.remove('incorrect_char'); 
        } else {
            span.classList.add('incorrect_char');
            span.classList.remove('correct_char');
            errors++; 
            
        }
        quote.appendChild(span);
    }

    // display the number of errors
    error_text.textContent = errors;

    let correctCharacters=(characterTyped - errors);
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);
}


input_area.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    processCurrentText();

});
function showAlert() {
    Swal.fire({
        title: "TIME'S UP!",
        text: " STOP TYPING AND CLICK ON SHOW RESULT",
        icon: "warning",
        confirmButtonText: "Got It!"
    });
}

input_area.addEventListener("click",()=>{
    const countdown=setInterval(()=>{
        timer_text.textContent=timeLeft;
        timeLeft--;
        if(timeLeft<0){
            clearInterval(countdown);
            showAlert();
            
        }
    },1000);
})

function startParty() {
    confetti({
        particleCount: 200,
        spread: 150,
        origin: { y: 0.8 }
    });
}

show_res.addEventListener("click",()=>{
    startParty();
    result.classList.add("show_dis");
    final_errors.innerHTML=`TOTAL ERRORS = ${total_errors}`;
    let accu_val=((total_letters-total_errors)/total_letters)*100;
    accuracy_rate.innerHTML=`OVERALL ACCURACY RATE =${accu_val.toFixed(2)} %`;
    if (accu_val>94){
        remark.innerHTML=`HIGHLY ACCURATE , YOU ARE A <b>PROFFESIONAL <b/>TYPIST
        <ul><li>strong familiarity with the keyboard </li> <li> good typing habits</li> <li> careful proofreading</li></ul>`;
    }
    else if (accu_val>80 && accu_val<93){
        remark.innerHTML=`YOU HAVE <b>DECENT<b/> TYPING SKILLS ,
        <ul><li>practice can improve speed as well as accuracy</li></ul> `;

    }
    else if (accu_val<80){
        remark.innerHTML=`YOU HAVE <b>LOW<b/> ACCCURACY ,
        <ul><Li>typing too quickly</li> <li>Not paying close attention to what you are typing</li></ul>`;

    }
})


