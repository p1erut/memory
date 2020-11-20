const colors = ['mediumspringgreen','mediumvioletred','lightskyblue','lightsalmon','darkblue','cadetblue','orangered','gold','darkolivegreen','mediumspringgreen','mediumvioletred','lightskyblue','lightsalmon','darkblue','cadetblue','orangered','gold','darkolivegreen'];
const cards = [...document.querySelectorAll('.element')];

let clickCounter = 0;
let activeCards = [];

let startTime = 0;

const cardClick = function(){    
    ++clickCounter;
    console.log(clickCounter);
    activeCards.push(this);
    this.removeEventListener('click',cardClick);
    this.classList.remove(this.classList[2]);
    if(clickCounter == 2){
        cards.forEach(function(card){
            card.removeEventListener('click',cardClick);
        });
        console.log('wykryto dwa kliknięcia');
        if(activeCards[0].classList[1] === activeCards[1].classList[1]){
            setTimeout(function(){
                console.log('Trafione!');
                clickCounter = 0;
                activeCards.forEach(function(activeCard){
                    activeCard.classList.add('white');
                });
                activeCards = [];
            },500);            
        }
        else {
            setTimeout(function(){
                console.log('nietrafione xd');
                clickCounter = 0;
                activeCards.forEach(function(activeCard){
                    activeCard.classList.add('covered');
                    activeCard.addEventListener('click',cardClick);
                });
                activeCards = [];
            },500)         
        }
        cards.forEach(function(card){
            if(!card.classList.contains('white')){
                card.addEventListener('click',cardClick);
            }
        });        
    }
    setTimeout(function(){
        const endTime = new Date().getTime()
        if([...document.querySelectorAll('.white')].length == 18){
            alert(`Koniec gry. \nTwój czas: ${(endTime - startTime) / 1000} sekund`);
        };
    },501);
}

const init = () => {
    cards.forEach(function(card,index){
        const random = Math.round(Math.random()*(colors.length-1));
        card.classList.add(colors[random]);
        colors.splice(random, 1);               
    });
    setTimeout(function(){
        cards.forEach(function(card){
            card.classList.add('covered');
            card.addEventListener('click',cardClick);
        });
        startTime = new Date().getTime();
    },1000); 
}

init();