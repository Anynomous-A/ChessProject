let chessboard =
[-5,-3,-4,-9,-10,-4,-3,-5,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,5,3,4,9,10,4,3,5];
const board = document.querySelector("#board")
const info = document.querySelector("#info")
const player = document.querySelector("#player")
let playerGo="White";
player.textContent= playerGo;
function createboard(){
    chessboard.forEach((element,i)=>{
       const square = document.createElement("div")
        square.classList.add("square")
        square.setAttribute("squareid",i)

       if(element!=0){ square.innerHTML = Getpawn(element);}
        const row = Math.floor(i/8) +1;
        if(row%2==0){
            if(i%2==0){
            square.classList.add("black")
            }
            else{
                square.classList.add("white")
            }
        }else{
            if((i)%2!=0){
                square.classList.add("black")
            }
            else{
                square.classList.add("white")
            }
        }
       if(i<16|| i>47)square.firstChild.setAttribute("draggable", true)
        board.appendChild(square) 
    });
}
//pieces funCtion +color of pawn
function Getpawn(element){
    let p="W";
    let o="White"
    if(Number(element) <0){
        p ="B";o="Black"}
    if(element==1 || element==-1){
        return "<div  class=\"pieces\"><img src=Anipics/"+`${p}`+"pawn.png class="+`${o}`+" id=\"pawn\"></div>" }  
    if(element==5 || element==-5){
        return "<div class=\"pieces\"><img src=Anipics/"+`${p}`+"rook.png class="+`${o}`+" id=\"rook\"></div>"}
   if(element== 3|| element==-3){
        return "<div class=\"pieces\"><img src=Anipics/"+`${p}`+"knight.png class="+`${o}`+" id=\"knight\"></div>"}
    if(element==4 || element==-4){
        return "<div class=\"pieces\"><img src=Anipics/"+`${p}`+"bishop.png class="+`${o}`+" id=\"bishop\"></div>"}
    if(element==9 || element==-9){
        return  "<div  class=\"pieces\"><img src=Anipics/"+`${p}`+"queen.png class="+`${o}`+" id=\"queen\"></div>"}
    if(element==10 || element==-10){return "<div  class=\"pieces\"><img src=Anipics/"+`${p}`+"king.png class="+`${o}`+" id=\"king\"></div>"}
}
//############################################################################################################################################
createboard()
//immovable pieces
const hi = document.querySelectorAll("img");
hi.forEach(e=>{
    e.setAttribute("draggable", false);
});
//############################################################################################################################################
const squares = document.querySelectorAll("#board .square")
//#variables
let startposi;
let startele;
let over;
let overp;
let endpos
//evventsv############################################################################################################################################
squares.forEach(square =>{
      square.addEventListener("dragstart",dragstart);
     square.addEventListener("dragover",dragover);
      square.addEventListener("drop",drop);
})
function dragstart(e){
    startposi=e.target.parentNode
  startele=(e.target);
   correctGo = startele.firstChild
}
function dragover(e){
    e.preventDefault()
    over=e.target
    overp=over.parentNode.parentNode;
}
function drop(e){ 
    e.stopPropagation();
    const taken = over.parentNode.classList.contains("pieces")
    const takensame= over.classList.contains("playerGo")
    if(taken)  endpos=Number(e.target.parentNode.parentNode.getAttribute("squareid"))
    else{
        endpos=Number(e.target.getAttribute("squareid"))
    }
    if(islegalmove(over,startele,endpos,taken,takensame)){
    if(taken){
        if(over.getAttribute("id")=="king"){info.innerHTML=playerGo+" Wins !"
            info.style.color=playerGo
        }
      over.parentNode.remove()
      overp.append(startele)
      changeplayer()
   return;
    }
    else{ 
         over.append(startele);
         changeplayer()
         return;
    }}
}
///functions############################################################################################################################################
function reverse(){
    const squarso = document.querySelectorAll(".square")
    squarso.forEach((El,i)=>{
      El.setAttribute("squareid",63-i);
    })
}
function revert(){
    const squarsoe = document.querySelectorAll(".square")
    squarsoe.forEach((Ele,i)=>{
      Ele.setAttribute("squareid",i);
    })
}
function islegalmove(over,startele,endpos,taken){
    if(correctGo.classList.contains(playerGo)){if(!(over.classList.contains(playerGo))){
         let piece = startele.firstChild.getAttribute("id")
         let startpos = Number(startposi.getAttribute("squareid"))
          if(piece=="pawn"){
            let row = Math.floor(startpos/8) +1;
             if(row==7){
                if((startpos==endpos+16 || startpos==endpos+8)
                    && !taken){
                    
                return 1
            }
             }
             if(row!=7){
                  if(startpos==endpos+8 && !taken){
                 
                    return 1;
                  }}
                  if((startpos==endpos+9 || startpos==endpos+7)
                    &&taken){
                        return 1
                    }
              return 0;
             }
          
          if(piece=="knight"){
            if(endpos==startpos+15||endpos==startpos+17||endpos==startpos+10||endpos==startpos+6||
                endpos==startpos-15||endpos==startpos-17||endpos==startpos-10||endpos==startpos-6){
                return 1;
            } return 0;
          }
          if(piece=="bishop"){
          const rowd = Math.floor(endpos / 8) - Math.floor(startpos / 8)
         const cold = (endpos % 8) - (startpos % 8)
          if (Math.abs(rowd) != Math.abs(cold)) {
            return 0;}
            let i=1
            while(i!=8){
                if(document.querySelector(`[squareid="${startpos-8*i-i}"]`)?.firstChild){
            
                        if(endpos==startpos-8*i-i){ 
                        return 1;
                    }break   
                }
                if(endpos==startpos-8*i-i){
                return 1;
            }
            i++
            }i=1
            while(i!=8){ if(document.querySelector(`[squareid="${startpos+8*i-i}"]`)?.firstChild){
                
                    if(endpos==startpos+8*i-i){ 
                    return 1;
                }break
            }
            if(endpos==startpos+8*i-i){
            return 1;}i++ 
            }i=1
            while(i!=8){ if(document.querySelector(`[squareid="${startpos-8*i+i}"]`)?.firstChild){
                    if(endpos==startpos-8*i+i){ 
                    return 1;
                }break
            }
            if(endpos==startpos-8*i+i){
            return 1;}i++ 
         }i=1
            while(i!=8){if(document.querySelector(`[squareid="${startpos+8*i+i}"]`)?.firstChild){
                    if(endpos==startpos+8*i+i){ 
                    return 1;
                }break
            }
            if(endpos==startpos+8*i+i){
            return 1;}i++ 
            }
            return 0;
          }

    if (piece =="rook") {
        const directionrook = [8, -8, 1, -1];
        const rowd = Math.abs(Math.floor(endpos / 8) - Math.floor(startpos / 8))
        const cold = Math.abs((endpos % 8) - (startpos % 8))
        if(rowd>0 && cold>0 ) return 0
        for (let dir of directionrook) {
            let i = 1;
            while (i < 8) {   console.log("inside the lOOOOOpppll")
                let posr = startpos + dir * i;
                if (posr < 0 || posr > 63) break
                if (posr == endpos) {
                    return 1;
                }
                if (document.querySelector(`[squareid="${posr}"]`)?.firstChild) {
                    break;
                }i++;
            }
        }
    
        return 0;
    }
    if (piece == "queen") {
        const directions = [8, -8, 1, -1, 9, 7, -7, -9];
        const rowd = Math.abs(Math.floor(endpos / 8) - Math.floor(startpos / 8))
        const cold = Math.abs((endpos % 8) - (startpos % 8))
        for (let dir of directions){
            let i = 1;
            while (i < 8) {
                let newPos = startpos + dir * i;
                if (newPos < 0 || newPos > 63) break
                if (newPos == endpos) {
                    if(dir==8||
                        dir==-8||
                        dir==-1||
                        dir==1){
                        if(rowd>0 && cold>0 ){ return 0}
                    }else{
                        if (rowd != cold) {
                            return 0;
                    }
                }
                    return 1;
                }
                if (document.querySelector(`[squareid="${newPos}"]`)?.firstChild) {
                    break;
                }i++;
            }
        }
        
        return 0;
    }
    if(piece=="king"){
        const rowd = Math.abs(Math.floor(endpos / 8) - Math.floor(startpos / 8))
        const cold = Math.abs((endpos % 8) - (startpos % 8))
    if(cold<=1 && rowd<=1){
                return 1;}
        
        return 0;
    }
}}}
function changeplayer(){

    if(playerGo=="White"){
        playerGo="Black"
        
        player.textContent="Black";
       reverse() 
        return;
    }
    else{
        playerGo="White"

        player.textContent="White";
        revert()
        return;
    }
}
/*
function isCheckmate(board, kingPosition, opponentColor) {
    // 1. Check if the king is currently in check
    if (!isSquareUnderAttack(board, kingPosition, opponentColor)) {
        return false; // Not in check, so not checkmate
    }

    // 2. Check if the king can move to any adjacent square to escape check
    const kingMoves = generateKingMoves(kingPosition);
    for (let move of kingMoves) {
        if (isMoveValid(board, move, opponentColor) && !isSquareUnderAttack(board, move.to, opponentColor)) {
            return false; // King can escape
        }
    }

    // 3. Check if the attacking piece can be captured
    const attackingPieces = findAttackingPieces(board, kingPosition, opponentColor);
    for (let piece of attackingPieces) {
        const capturingMoves = generateCapturingMoves(board, piece.position, opponentColor);
        for (let move of capturingMoves) {
            if (isMoveValid(board, move, opponentColor)) {
                return false; // Attacking piece can be captured
            }
        }
    }

    // 4. Check if the attack can be blocked (only relevant for long-range pieces)
    for (let piece of attackingPieces) {
        if (piece.type === "queen" || piece.type === "rook" || piece.type === "bishop") {
            const path = getPathBetweenSquares(kingPosition, piece.position);
            for (let square of path) {
                const blockingMoves = generateBlockingMoves(board, square, opponentColor);
                for (let move of blockingMoves) {
                    if (isMoveValid(board, move, opponentColor)) {
                        return false; // Attack can be blocked
                    }
                }
            }
        }
    }

    // 5. If none of the above conditions are met, it's checkmate
    return true;
} */