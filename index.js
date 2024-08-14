const mines=document.querySelector('.grid');
const button=document.querySelector('.btn');
const testMode=false;

let lockGame=false;
generateGrid();

//generate game board 10x10
function generateGrid(){
     lockGame=false;
     mines.innerHTML="";
     for (let i = 0; i < 10; i++) {
          let row=mines.insertRow(i);
          for (let j = 0; j < 10; j++) {
               let cell=row.insertCell(j);
               cell.onclick=function(){ init(this); };
               let mine=document.createAttribute("mine");
               mine.value='false';
               cell.setAttributeNode(mine);
          }
     }
     generateMines();
}

//generate mines in random place
function generateMines(){
     //add 20 mines
     for (let i = 0; i < 20; i++) {
          let row=Math.floor(Math.random()*10);
          let column=Math.floor(Math.random()*10);
          let cell=mines.rows[row].cells[column];
          cell.setAttribute('mine','true');
          if(testMode){
               cell.innerHTML='X';
          }
     }
}

//reveal mines
function revealMines(){
     for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
               let cell=mines.rows[i].cells[j];
               if (cell.getAttribute('mine')=='true') {
                    cell.className='mine';
               }
          }
     }
}

//funtion complete
function checkGameComplete(){
     let gamecomplete=true;
     for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
               if ((mines.rows[i].cells[j].getAttribute('mine')=='false') && (mines.rows[i].cells[j].innerHTML=="")) {
                    gamecomplete=false;
               }
          }
     }

     if (gamecomplete) {
          alert('You Found All Mines!');
          revealMines();
     }
}

//init generate grid
function init(cell){
     if (lockGame) return;
     else{
          if (cell.getAttribute('mine')=='true') {
               revealMines();
               lockGame=true;
          }else{
               cell.className='active';
               //Display number around cell
               let mineCount=0;
               let cellRow=cell.parentNode.rowIndex;
               let cellColumn=cell.cellIndex;

               for (let i = Math.max(cellRow-1, 0); i <= Math.min(cellRow+1, 9); i++) {
                    for (let j = Math.max(cellColumn-1, 0); j <= Math.min(cellColumn+1, 9); j++) {
                         if (mines.rows[i].cells[j].getAttribute('mine')=='true') {
                              mineCount++;
                         }
                    }
               }
               cell.innerHTML=mineCount;

               //if celkl don't have mines
               if (mineCount===0) {
                    for (let i = Math.max(cellRow-1, 0); i <= Math.min(cellRow+1, 9); i++) {
                         for (let j = Math.max(cellColumn-1, 0); j <= Math.min(cellColumn+1, 9); j++) {
                              if (mines.rows[i].cells[j].innerHTML=='') {
                                   init(mines.rows[i].cells[j])
                              }
                         }
                    }
               }

               checkGameComplete();
          }
     }
}

//button to start
button.addEventListener('click',()=>{
     generateGrid();
});