
// SCREEN BUTTONS
const SCREEN01_BUTTON_START = document.getElementById('screen01-button-start')
const SCREEN02_BUTTON_CONTINUE = document.getElementById('screen02-button-continue')
const SCREEN03_BUTTON_CONTINUE = document.getElementById('screen03-button-continue')
const SCREEN04_BUTTON_PAUSE = document.getElementById('screen04-button-pause')
const SCREEN04_PAUSE_MENU = document.querySelector('.pause-menu');

// SCREENS
const SCREEN01 = document.querySelector('.screen01');
const SCREEN02 = document.querySelector('.screen02');
const SCREEN03 = document.querySelector('.screen03');
const SCREEN04 = document.querySelector('.screen04');

function gameLoad(){
  SCREEN02.classList.add('hide');
  SCREEN03.classList.add('hide');
  SCREEN04.classList.add('hide');
  SCREEN04_PAUSE_MENU.classList.remove('show');
}


gameLoad();



// PLAYERS ATTRIBUTES
const PLAYER01 = document.querySelector('.player01-wrapper');
const PLAYER02 = document.querySelector('.player02-wrapper');


let PLAYER01_CHARACTER = "";
let PLAYER02_CHARACTER = "";

let PLAYER01_HP = 100;
let PLAYER02_HP = 100;

let PLAYER01_HP_BAR = document.querySelector('.player01-current-hp');
let PLAYER02_HP_BAR = document.querySelector('.player02-current-hp');

let PLAYER01_HIT_BOX = document.querySelector('#player01');
let PLAYER02_HIT_BOX = document.querySelector('#player02');

let PLAYER01_ATTACK_BOX = document.querySelector('#player01-attack-box');
let PLAYER02_ATTACK_BOX = document.querySelector('#player02-attack-box');



// BOOLEAN CHECKERS
let timer;
let minutes;
let seconds;
let TIMER_LENGTH = 120;

let isPlaying;
let hasWinner;

// SOUND FX
const BGM = new Audio('assets/sfx/bgm-1.mp3');
const FIGHT_SFX = new Audio('assets/sfx/fight-start.mp3');
const GAME_OVER_SFX = new Audio('assets/sfx/game-over.mp3');
      GAME_OVER_SFX.volume = .2;
const HIT_SFX = new Audio('assets/sfx/hit.mp3');
      HIT_SFX.volume = .2;



// -------------------- EVENT LISTENERS --------------------


// SCREEN 01 EVENT LISTENERS

// DISPLAY SCREEN 2
SCREEN01_BUTTON_START.addEventListener('click', ()=> {
  SCREEN01.classList.add('hide');
  SCREEN02.classList.remove('hide');
})




// SCREEN 2 EVENT LISTENERS

let player01HasSelected = false;
let player02HasSelected = false;


SCREEN02.addEventListener('click', (e)=> {
  // let target = e.target.parentElement.parentElement.parentElement;
  if(e.target.classList.contains('screen02')){
    return;
  }

  let target = e.target.parentElement.parentElement.parentElement.parentElement;
  
  if(target.classList.contains('player01-selection-wrapper')){
      document.querySelector('.player01-character-selected').textContent = "Player 01: " + e.target.value;
      player01HasSelected = true;

      PLAYER01_CHARACTER = e.target.value;
  }
  if(target.classList.contains('player02-selection-wrapper')){
      document.querySelector('.player02-character-selected').textContent = "Player 02: " + e.target.value;
      player02HasSelected = true;

      
      PLAYER02_CHARACTER = e.target.value;
  }

  let isShown = setInterval(()=>{
    if(player01HasSelected && player02HasSelected){
      SCREEN02_BUTTON_CONTINUE.classList.add('show');
    }
  }, 500)

})




// DISPLAY SCREEN 3
SCREEN02_BUTTON_CONTINUE.addEventListener('click', ()=> {
  SCREEN02.classList.add('hide');
  SCREEN03.classList.remove('hide');

  // player01HasSelected = false;
  // player02HasSelected = false;

  SCREEN02_BUTTON_CONTINUE.classList.remove('show');

  console.log("Player 1: " + PLAYER01_CHARACTER)
  console.log("Player 2: " + PLAYER02_CHARACTER)
})









// SCREEN 3 EVENT LISTENERS


let hasSelectedScene = false;
let SCENE = "";

SCREEN03.addEventListener('click', (e)=> {
  if(e.target.classList.contains('img-scene-icon')){
    SCENE = e.target.src;
    hasSelectedScene = true;

    SCREEN04.classList.add('set-background');
    SCREEN04.style.backgroundImage = "url('" + SCENE + "')";

  }

  let hasSelected2 = setInterval(()=>{
    if(hasSelectedScene){
      SCREEN03_BUTTON_CONTINUE.classList.add('show');
      clearInterval(hasSelected2)
    }
  }, 500)
})





// DISPLAY SCREEN 4
SCREEN03_BUTTON_CONTINUE.addEventListener('click', ()=> {
  SCREEN03.classList.add('hide');
  SCREEN04.classList.remove('hide');

  hasSelectedScene = false;

  SCREEN03_BUTTON_CONTINUE.classList.remove('show');

  document.querySelector('.fight-text').classList.add('fade');
  setTimeout(()=>{
    document.querySelector('.fight-text').classList.remove('fade');
  }, 2000)

  // Start playing background music
  playAudio();

  PLAYER01_HIT_BOX.src = "assets/characters/" + PLAYER01_CHARACTER + "/idle/idle-1.png";
  PLAYER02_HIT_BOX.src = "assets/characters/" + PLAYER02_CHARACTER + "/idle/idle-1.png";

  isPlaying = true; 

  startTimer();
})







// RESET THE GAME AND GO BACK TO THE MAIN MENU (SCREEN 01)
SCREEN04_BUTTON_PAUSE.addEventListener('click', ()=> {
  SCREEN04_PAUSE_MENU.classList.add('show'); 
  clearInterval(timer) 
  document.querySelector('.timer').textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  isPlaying = false;
  // document.querySelector('.player-name-winner').style.opacity = .5;
})





document.querySelector('.pause-menu').addEventListener('click', (e)=> {
  if(e.target.classList.contains('button_1')){
    SCREEN04_PAUSE_MENU.classList.remove('show');
    if(!hasWinner){
      isPlaying = true
      resumeTimer();
    }
    // document.querySelector('.player-name-winner').style.opacity = 1;
  }

  if(e.target.classList.contains('button_2')){
    resetSelection();
    SCREEN01.classList.add('hide');
    SCREEN02.classList.remove('hide');
    SCREEN03.classList.add('hide');
    SCREEN04.classList.add('hide');
  }

  if(e.target.classList.contains('button_3')){
    resetSelection();
  }

  if(e.target.classList.contains('button_4')){
    restartMatch();
  }
})


function resetSelection(){
  gameLoad();
  SCREEN01.classList.remove('hide');

  SCREEN02_BUTTON_CONTINUE.classList.remove('show');
  SCREEN03_BUTTON_CONTINUE.classList.remove('show');

  document.querySelector('.player01-character-selected').textContent = "";
  document.querySelector('.player02-character-selected').textContent = "";


  document.querySelector('.game-over').classList.remove('fade');
  document.querySelector('.player-name-winner').classList.remove('fade');
  document.querySelector('.player-name-winner').textContent = "";


  player01HasSelected = false;
  player02HasSelected = false;

  hasSelected = false;

  let characterRadios = document.querySelectorAll('[name="player01"], [name="player02"]');

  characterRadios.forEach(function(radio){
    radio.checked = false;
  })

  let sceneRadio = document.querySelectorAll('[name="scene"]');

  sceneRadio.forEach(function(scene){
    scene.checked = false;
  })

  BGM.pause();
  BGM.currentTime = 0;
  FIGHT_SFX.pause();
  FIGHT_SFX.currentTime = 0;
  GAME_OVER_SFX.pause();
  GAME_OVER_SFX.currentTime = 0;

  PLAYER01.style.left = 100 + 'px';
  PLAYER02.style.left = SCREEN04.offsetWidth - (PLAYER02_HIT_BOX.offsetLeft + PLAYER02.offsetWidth + 100) + 'px';

  isPlaying = false;

  PLAYER01_HP = 100;
  PLAYER01_HP_BAR.style.width = PLAYER01_HP + "%";
  PLAYER02_HP = 100;
  PLAYER02_HP_BAR.style.width = PLAYER02_HP + "%";

  pauseTimer();
}





function restartMatch(){
  SCREEN04_PAUSE_MENU.classList.remove('show');

  document.querySelector('.player01-character-selected').textContent = "";
  document.querySelector('.player02-character-selected').textContent = "";

  document.querySelector('.fight-text').classList.add('fade');
  setTimeout(()=>{
    document.querySelector('.fight-text').classList.remove('fade');
  }, 2000)


  document.querySelector('.game-over').classList.remove('fade');
  document.querySelector('.player-name-winner').classList.remove('fade');
  document.querySelector('.player-name-winner').textContent = "";


  player01HasSelected = false;
  player02HasSelected = false;

  hasSelected = false;

  let characterRadios = document.querySelectorAll('[name="player01"], [name="player02"]');

  characterRadios.forEach(function(radio){
    radio.checked = false;
  })

  let sceneRadio = document.querySelectorAll('[name="scene"]');

  sceneRadio.forEach(function(scene){
    scene.checked = false;
  })

  stopAudio();
  playAudio();

  PLAYER01.style.left = 100 + 'px';
  PLAYER02.style.left = SCREEN04.offsetWidth - (PLAYER02_HIT_BOX.offsetLeft + PLAYER02.offsetWidth + 100) + 'px';


  isPlaying = true;

  PLAYER01_HP = 100;
  PLAYER01_HP_BAR.style.width = PLAYER01_HP + "%";
  PLAYER02_HP = 100;
  PLAYER02_HP_BAR.style.width = PLAYER02_HP + "%";

  TIMER_LENGTH = 120;
  startTimer();
}



function playAudio(){
  BGM.volume = .2;
  BGM.play();

  FIGHT_SFX.volume = .2;
  FIGHT_SFX.play();
}

function stopAudio(){
  BGM.pause();
  BGM.currentTime = 0;
  FIGHT_SFX.pause();
  FIGHT_SFX.currentTime = 0;
  GAME_OVER_SFX.pause();
  GAME_OVER_SFX.currentTime = 0;
}




function startTimer(){
  timer = setInterval(()=>{
    minutes = Math.floor(TIMER_LENGTH/60);
    seconds = TIMER_LENGTH % 60;

    if(TIMER_LENGTH <= 0){
      console.log("Time's up");
      if(PLAYER01_HP > PLAYER02_HP){
        console.log("PLAYER 01 WINS");
        
        document.querySelector('.game-over').classList.add('fade');
        if(PLAYER01_HP == 100){
          document.querySelector('.game-over').textContent = "Perfect!";
        }else{
          document.querySelector('.game-over').textContent = "Game Over!";
          GAME_OVER_SFX.play();
          GAME_OVER_SFX.currentTime = 1;
        }
        document.querySelector('.player-name-winner').classList.add('fade');
        document.querySelector('.player-name-winner').textContent = "Player 01 Wins!";
      }else if(PLAYER02_HP > PLAYER01_HP){
        console.log("PLAYER 02 WINS");
        
        document.querySelector('.game-over').classList.add('fade');
        if(PLAYER02_HP == 100){
          document.querySelector('.game-over').textContent = "Perfect!";
        }else{
          document.querySelector('.game-over').textContent = "Game Over!";
          GAME_OVER_SFX.play();
          GAME_OVER_SFX.currentTime = 1;
        }
        document.querySelector('.player-name-winner').classList.add('fade');
        document.querySelector('.player-name-winner').textContent = "Player 02 Wins!";
      }else if(PLAYER01_HP == PLAYER02_HP){
        console.log("Draw")
        
        document.querySelector('.game-over').classList.add('fade');
        document.querySelector('.player-name-winner').classList.add('fade');
        document.querySelector('.player-name-winner').textContent = "Draw!";
      }
      hasWinner = true;
      isPlaying = false;
      clearInterval(timer);
    }
    document.querySelector('.timer').textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    TIMER_LENGTH--;
  }, 1000)
}
function pauseTimer(){
  TIMER_LENGTH = 120;    
  document.querySelector('.timer').textContent = "02:00";

  clearInterval(timer)
}

function resumeTimer(){
  startTimer();
}


function showGameOverText(PLAYER_HP){
    document.querySelector('.game-over').classList.add('fade');
    if(PLAYER_HP == 100){
      document.querySelector('.game-over').textContent = "Perfect!";
    }else{
      document.querySelector('.game-over').textContent = "Game Over!";
      GAME_OVER_SFX.play();
      GAME_OVER_SFX.currentTime = 1;
    }
    document.querySelector('.player-name-winner').classList.add('fade');
}



function isHit(player, enemy){
  let playerRect = player.getBoundingClientRect();
  let enemyRect = enemy.getBoundingClientRect();

  let playerRectWidth = playerRect.width;
  let playerRectHeight = playerRect.height;
  let playerRectX = playerRect.x;
  let playerRectY = playerRect.y;

  let enemyRectWidth = enemyRect.width;
  let enemyRectHeight = enemyRect.height;
  let enemyRectX = enemyRect.x;
  let enemyRectY = enemyRect.y;

  return ((playerRectX <= enemyRectX && playerRectX + playerRectWidth >= enemyRectX) 
       && (playerRectY <= enemyRectY && playerRectY + playerRectHeight >= enemyRectY)
       || (playerRectX >= enemyRectX && enemyRectX + enemyRectWidth >= playerRectX)
       && (playerRectY >= enemyRectY && enemyRectY + enemyRectHeight >= playerRectY))
}





// PLAYER MOVEMENTS

let isMovingLeft = false;
let isMovingRight = false;
let isJumping = false;
let isAttacking = false;

let isMovingLeft2 = false;
let isMovingRight2 = false;
let isJumping2 = false;
let isAttacking2 = false;

function movePlayer(){
  let player01_x_position = PLAYER01.offsetLeft;
  let player02_x_position = PLAYER02.offsetLeft;

  
  if(player01HasSelected && player02HasSelected){
    setInterval(()=> {
      PLAYER01_HIT_BOX.src = "assets/characters/" + PLAYER01_CHARACTER + "/idle/idle-1.png";
    }, 500)
  
    setInterval(()=> {
      PLAYER02_HIT_BOX.src = "assets/characters/" + PLAYER02_CHARACTER + "/idle/idle-1.png";
    }, 500)
  
  }
  

  if(isPlaying){

    if(!PLAYER01_HIT_BOX.classList.contains('isHit')){
      if(isMovingLeft){
    
        // PLAYER 01 MOVEMENTS
        player01_x_position -= 10;

      
    
        // Set left boundary
        if(player01_x_position <= 0){
          player01_x_position = 0;
        }
      }
  
  
      if(isMovingRight){
        player01_x_position += 10;
    
        // Set right boundary
        if(player01_x_position + PLAYER01.offsetWidth >= SCREEN04.offsetWidth){
          player01_x_position = SCREEN04.offsetWidth - PLAYER01.offsetWidth;
        }
      }
  
      if(isJumping && !PLAYER01.classList.contains('jump')){
        PLAYER01.classList.add('jump');
        setTimeout(()=> {
          PLAYER01.classList.remove('jump');
        }, 500)
      }
      
      if(isAttacking && !PLAYER01_ATTACK_BOX.classList.contains('attack') && !PLAYER02_HIT_BOX.classList.contains('isHit')){
        PLAYER01_ATTACK_BOX.classList.add('attack');

        let counter = 1;

        let attackAnimation = setInterval(()=> {
          PLAYER01_HIT_BOX.src = "assets/characters/" + PLAYER01_CHARACTER + "/attack/attack-" + counter + ".png";
          counter++;

          if(counter == 4){
            clearInterval(attackAnimation);
          }
        }, 500)

        setTimeout(function(){
          PLAYER01_ATTACK_BOX.classList.remove('attack');
        }, 500)
        

        if(isHit(PLAYER01_ATTACK_BOX, PLAYER02_HIT_BOX)){
          HIT_SFX.currentTime = .1;
          HIT_SFX.play();
          PLAYER02_HP -= 10;
          PLAYER02_HP_BAR.style.width = PLAYER02_HP + "%";
          PLAYER02_HIT_BOX.classList.add('isHit');

          setTimeout(function(){
            PLAYER02_HIT_BOX.classList.remove('isHit');
            HIT_SFX.pause();
          }, 300);

          if(PLAYER02_HP <= 0){
            console.log("Player 1 wins!");    
            clearInterval(timer);
            document.querySelector('.timer').textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
            isPlaying = false;
            hasWinner = true;
  
  
            showGameOverText(PLAYER01_HP);
            document.querySelector('.player-name-winner').textContent = "Player 01 Wins!";
          }
        }
      }
    }
  
  

  // PLAYER 02 MOVEMENTS
  if(!PLAYER02_HIT_BOX.classList.contains('isHit')){
    if(isMovingLeft2){
      player02_x_position -= 10;

      // Set left boundary
      if(player02_x_position <= 0){
        player02_x_position = 0;
      }
    }

    if(isMovingRight2){
      player02_x_position += 10;

      // Set right boundary
      if(player02_x_position + PLAYER02.offsetWidth >= SCREEN04.offsetWidth){
        player02_x_position = SCREEN04.offsetWidth - PLAYER02.offsetWidth;
      }
    }

    if(isJumping2 && !PLAYER02.classList.contains('jump')){
      PLAYER02.classList.add('jump');
      setTimeout(()=> {
        PLAYER02.classList.remove('jump');
      }, 500)
    }

    if(isAttacking2 && !PLAYER02_ATTACK_BOX.classList.contains('attack')){
      PLAYER02_ATTACK_BOX.classList.add('attack');

      let counter2 = 1;

      let attackAnimation2 = setInterval(()=> {
        PLAYER02_HIT_BOX.src = "assets/characters/" + PLAYER02_CHARACTER + "/attack/attack-" + counter2 + ".png";
        counter2++;
        
        if(counter2 == 4){
          clearInterval(attackAnimation2);
        }

      }, 500)


      setTimeout(function(){
        PLAYER02_ATTACK_BOX.classList.remove('attack');
      }, 500)

      if(isHit(PLAYER02_ATTACK_BOX, PLAYER01_HIT_BOX)){
        HIT_SFX.currentTime = .1;
        HIT_SFX.play();
        PLAYER01_HP -= 10;
        PLAYER01_HP_BAR.style.width = PLAYER01_HP + "%";
        PLAYER01_HIT_BOX.classList.add('isHit');
          
        setTimeout(function(){
          PLAYER01_HIT_BOX.classList.remove('isHit');
          HIT_SFX.pause();
        }, 300);

        if(PLAYER01_HP <= 0){
          console.log("Player 2 wins!");    
          clearInterval(timer);
          document.querySelector('.timer').textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
          isPlaying = false;
          hasWinner = true;
  
          
          showGameOverText(PLAYER02_HP);
          document.querySelector('.player-name-winner').textContent = "Player 02 Wins!";
        }
      }
      
    }
  }

}


  if(player01_x_position > player02_x_position){
    PLAYER01.style.transform = "scaleX(-1)";
    PLAYER02.style.transform = "scaleX(1)";
  }else{
    PLAYER01.style.transform = "scaleX(1)";
    PLAYER02.style.transform = "scaleX(-1)";
  }

  PLAYER01.style.left = player01_x_position + 'px';
  PLAYER02.style.left = player02_x_position + 'px';

  requestAnimationFrame(movePlayer);
}


window.addEventListener('keydown', (e)=> {
    e.preventDefault();

    if(e.key == 'a' || e.key == 'A'){
      isMovingLeft = true;
      isMovingRight = false;
    }
    if(e.key == 'd' || e.key == 'D'){
      isMovingRight = true;
      isMovingLeft = false;
    }
    if(e.key == 'w' || e.key == 'W'){
      if(!isJumping){
        isJumping = true;
      }
    }
    if(e.key == ' '){
      isAttacking = true;
    }


    if(e.key == 'ArrowLeft'){
      isMovingLeft2 = true;
      isMovingRight2 = false;
    }
    if(e.key == 'ArrowRight'){
      isMovingRight2 = true;
      isMovingLeft2 = false;
    }
    if(e.key == 'ArrowUp'){
      if(!isJumping2){
        isJumping2 = true;
      }
    }
    if(e.key == 'ArrowDown'){
      isAttacking2 = true;
    }
  }
  
)

window.addEventListener('keyup', (e)=> {
    e.preventDefault();

    if(e.key == 'a' || e.key == 'A'){
      isMovingLeft = false;
    }
    if(e.key == 'd' || e.key == 'D'){
      isMovingRight = false;
    }
    if(e.key == 'w' || e.key == 'W'){
      isJumping = false;
    }
    if(e.key == ' '){
      isAttacking = false;
    }
  
    if(e.key == 'ArrowLeft'){
      isMovingLeft2 = false;
    }
    if(e.key == 'ArrowRight'){
      isMovingRight2 = false;
    }
    if(e.key == 'ArrowUp'){
      isJumping2 = false;
    }
    if(e.key == 'ArrowDown'){
      isAttacking2 = false;
    }
  }
  
)

requestAnimationFrame(movePlayer)