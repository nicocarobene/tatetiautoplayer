
const board=[
    ["","",""],
    ["","",""],
    ["","",""]
];

let turn = 0; //0=turno de user, 1= turno de pc;

const boardContainer= document.getElementById("board");
const playerDiv= document.getElementById("player");

const renderBoard=()=>{
    const html= board.map(row=>{
        const cells=row.map(cell=>{
            return `<button class="cell">${cell}</button>`
        });
        return `<div class="row">${cells.join("")}</div>`
    });
    boardContainer.innerHTML= html.join("");
}


const playerPlays= ()=>{
    const cells= document.querySelectorAll(".cell");
    cells.forEach((cell,i)=>{
        
        const column= i % 3;
        const row= parseInt(i/3);

        if(board[row][column]== ""){
            cell.addEventListener("click",e=>{
                board[row][column]="O";
                cell.textContent=board[row][column];
                turn=1;
                computerPlays();
                
            })
        }
    })
    
}

const computerPlays= ()=>{
    renderCurrentPlayer();
    setTimeout(()=>{
        let player=false;
        const options= checkIfCanWin();

        if(options.length>0){
            const bestOption=options[0];
            for(let i=0 ; i<bestOption.length; i++){
                if(bestOption[i].value==0){
                    const posX= bestOption[i].x;
                    const posY= bestOption[i].y;
                    board[posX][posY]="X";
                    player=true;
                    break;
                }
            }

        }else{
            for(let x=0 ; x<board.length; x++){
                for(let y=0 ; y<board.length; y++){
                    if(board[x][y]==""&& !player){
                        board[x][y]="X";
                        player= true;
                    }
                }
            }
           
        }
        turn=0;
        renderBoard();
        renderCurrentPlayer();
        playerPlays();
    },2000)
}

const checkIfCanWin=()=>{
    const arr= JSON.parse(JSON.stringify(board));
    for(let x=0; x < arr.length;x++){
        for(let y =0; y<arr.length;y++){
            if(arr[x][y]=="X"){
                arr[x][y]={value: 1,x,y}
            }
            if(arr[x][y]==""){
                arr[x][y]={value: 0,x,y}
            }
            if(arr[x][y]=="O"){
                arr[x][y]={value: -2,x,y}
            }
        }
    }

    const p1= arr[0][0];
    const p2= arr[0][1];
    const p3= arr[0][2];
    const p4= arr[1][0];
    const p5= arr[1][1];
    const p6= arr[1][2];
    const p7= arr[2][0];
    const p8= arr[2][1];
    const p9= arr[2][2];

    const s1= [p1,p2,p3];
    const s2= [p4,p5,p6];
    const s3= [p7,p8,p9];
    const s4= [p1,p4,p7];
    const s5= [p2,p5,p8];
    const s6= [p3,p6,p9];
    const s7= [p1,p5,p9];
    const s8= [p3,p5,p7];

    const res2=[s1,s2,s3,s4,s5,s6,s7,s8]
     
    const res=[s1,s2,s3,s4,s5,s6,s7,s8].filter(line=>{
        return (line[0].value + line[1].value + line[2].value ==2 || line[0].value + line[1].value + line[2].value ==-4)
    })
    return res;
}

const startGame= ()=>{
    renderBoard();
    turn= Math.random()>=0.5?0 :1;

    renderCurrentPlayer();

    if(turn==0){
        playerPlays();
    }else{
        computerPlays();
    }
}

const checkIfWinner =()=>{
    const p1= arr[0][0];
    const p2= arr[0][1];
    const p3= arr[0][2];
    const p4= arr[1][0];
    const p5= arr[1][1];
    const p6= arr[1][2];
    const p7= arr[2][0];
    const p8= arr[2][1];
    const p9= arr[2][2];

    const s1= [p1,p2,p3];
    const s2= [p4,p5,p6];
    const s3= [p7,p8,p9];
    const s4= [p1,p4,p7];
    const s5= [p2,p5,p8];
    const s6= [p3,p6,p9];
    const s7= [p1,p5,p9];
    const s8= [p3,p5,p7];

    const res=[s1,s2,s3,s4,s5,s6,s7,s8].filter(line=>{
        return line[0] + line[2]+ line[3] == "XXX"||
               line[0] + line[2]+ line[3] == "XXX";
    })
}

const renderCurrentPlayer= ()=>{
    playerDiv.textContent=`${turn==0? 'Player Turn':'Computer Turn'}`;
}

startGame();



