'use strict'
document.addEventListener("DOMContentLoaded", function() {
    const rotateBtn = document.querySelector("#rotate-btn"),
          clearAll = document.querySelector("#clear-all"),
          cells = document.querySelectorAll(".cell"),
          firstScore = document.querySelector("#first-score"),
          secondScore = document.querySelector("#second-score");
    
    //game
    let count = 0,
        scoreOne,
        scoreTwo,
        game = true;
    
    if(localStorage.getItem("first")){
        scoreOne = localStorage.getItem('first');
    }else{
        scoreOne = 0;
        localStorage.setItem("first",0);
    }

    if(localStorage.getItem("second")){
        scoreTwo = localStorage.getItem('second');
    }else{
        scoreTwo = 0;
        localStorage.setItem("second",0);
    }
    firstScore.textContent = scoreOne;
    secondScore.textContent = scoreTwo;

    const check = (a,b,c) => {
        const elem1 = document.querySelector(`[data-id="${a}"]`),
              elem2 = document.querySelector(`[data-id="${b}"]`),
              elem3 = document.querySelector(`[data-id="${c}"]`);
        if((elem1.textContent == elem2.textContent) && (elem1.textContent == elem3.textContent) && !(elem1.textContent == "")){
            elem1.classList.add("win");
            elem2.classList.add("win");
            elem3.classList.add("win");
            return true;
        }else{
            return false;
        }
    };

    const bigCheck = () => {
        let res = false;
        for(let i = 1;i<4;i++){
            if(check(i,i+3,i+6)){
                res = true;
            }
        }
        for(let i = 1; i<=7;i+=3){
            if(check(i,i+1,i+2)){
                res = true;
            }
        }
        if(check(1,5,9)){
            res = true;
        }
        if(check(3,5,7)){
            res = true;
        }
        return res;
    }

    cells.forEach((item) => {
        item.addEventListener('click',() => {
            if(game){
                if(item.textContent ==""){
                    if(count%2==0){
                        item.textContent = "X";
                        count++;
                    }else{
                        item.textContent = "O";
                        count++;
                    }
                    if(count>=5){
                        if(bigCheck()){
                            if(count%2==1){
                                scoreOne++;
                                firstScore.textContent = `${scoreOne}`;
                                localStorage.setItem("first",scoreOne);
                            }else{
                                scoreTwo++;
                                secondScore.textContent = `${scoreTwo}`;
                                localStorage.setItem("second",scoreTwo);
                            }
                            game = false;
                        }
                    }
                }
            }else{
                rotateBtn.classList.add("fa-bounce");
                setTimeout(() => {
                   rotateBtn.classList.remove("fa-bounce");
                }, 500);
            }
        });
    });


    // buttons 

    const clean = () => {
        cells.forEach((item) => {
            item.textContent = "";
            item.classList.remove("win");
        });
        game = true;
        count = 0;
    };

    const cleanScore = () => {
        scoreOne = 0;
        scoreTwo = 0;
        localStorage.setItem("first",0);
        localStorage.setItem("second",0);
    
        firstScore.textContent = "0";
        secondScore.textContent = "0";
    }

    const listenerBody = (btn,btnClass) => {
        btn.classList.add(btnClass);
        clean();
        setTimeout(() => {
            btn.classList.remove(btnClass);
        }, 1000);
    }

    rotateBtn.addEventListener("click", () => {
        listenerBody(rotateBtn,"fa-spin");
    });

    clearAll.addEventListener("click", () => {
        cleanScore();
        listenerBody(clearAll,"fa-flip");
    });
});