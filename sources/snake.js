console.log('inside game');

// document.body.appendChild('<h1>Welcome</h1>')

let game = []

let rows = 20,cols = 20

for(let i=0;i<rows;i++)
{
    let list = []
    for(let j=0;j<cols;j++)
    {
        list.push({value: false,move: 'none'})
    }
    game.push(list)
}

let displayGame = document.createElement('div')

game.forEach((row)=>{

    let displayRow = document.createElement('div')
    displayRow.className = 'row'

    row.forEach((element)=>{
        
        let block = document.createElement('div')
        block.className = 'block'
        displayRow.appendChild(block)

    })

    displayGame.appendChild(displayRow)
})
document.body.appendChild(displayGame)


let move = null

let snake;

initialiseSnake = ()=>{
    snake = {
        head: {x:0,y:4},
        tail: {x:0,y:0},
        position: [
            {x:0,y:0},
            {x:0,y:1},
            {x:0,y:2},
            {x:0,y:3},
            {x:0,y:4}
        ]
    }
}


let blocks = document.getElementsByClassName('block');

function hidePos(pos){
    let {x,y} = pos;
    blocks[x*cols + y].style.backgroundColor = 'white'
}

function displayPos(pos){
    let {x,y} = pos
    blocks[x*cols + y].style.backgroundColor = 'black'
}

getNewPosition = (pos)=>{
    
    let {x,y} = pos
    let {move} = game[x][y]


    if(move === 'right'){
        y = y+1;
    }
    else if(move === 'left'){
        y = y-1;
    }
    else if(move === 'up')
    {
        x = x-1;
    }
    else if(move === 'down'){
        x = x+1;
    }
    
    return {x,y}
}


displaySnakePosition = (snake)=>{
    snake.position.forEach((pos)=>{
        displayPos(pos)
    })
}

hideSnakePosition = (snake)=>{
    snake.position.forEach((pos)=>{
        // displayPos(pos)
        let {x,y} = pos
        game[x][y].value = false
        blocks[x*cols + y].style.backgroundColor = 'white'
    })
}

let movement = null;

startMovement = ()=>{
    movement = setInterval(function(){ updateSnakePosition() }, 100);
}

initialiseGame = ()=>{
    initialiseSnake()
    snake.position.forEach((pos)=>{
        let {x,y} = pos;
        game[x][y].value = true
        game[x][y].move = 'right'
    })
    move = null
    displaySnakePosition(snake)
    startMovement()
}

gameover = ()=>{
    clearInterval(movement)
    hideSnakePosition(snake)
    alert('game over')
    initialiseGame()
}

checkValidMove = ()=>{
    
    console.log('check valid move')

    // new position of head
    let {x,y} = getNewPosition(snake.head);
    

    if(x >= rows || x < 0 || y >= cols || y < 0){
        gameover()
        return false
    }

    if(game[x][y].value === true){
        gameover()
        return false
    }

    return true

}

initialiseGame()

// displaySnakePosition(snake)

updateSnakePosition = ()=>{
    
    if(!move)
        return

    hidePos(snake.tail)

    // console.log('before',snake)


    // update move at head
    let {x,y} = snake.head
    game[x][y].move = move


    if(!checkValidMove())
        return


    let new_pos = []

    snake.position.forEach((pos)=>{

        console.log('updating game')

        var {x,y} = pos;

        // old position
        game[x][y].value = false

        let new_ = getNewPosition(pos)

        // game[new_.x][new_.y].value = true

        new_pos.push(new_)

        console.log('updated position',new_.x,new_.y)
    })

    new_pos.forEach((pos)=>{
        let {x,y} = pos
        game[x][y].value = true
        console.log('at x , y = ',x,y,'value = ',game[x][y].value)
    })
    
    snake.position = new_pos;

    //update tail and head

    snake.tail = getNewPosition(snake.tail)
    snake.head = getNewPosition(snake.head)

    // console.log('after',snake)
    
    displaySnakePosition(snake)
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        move = 'up'
    }
    else if (e.keyCode == '40') {
        // down arrow
        move = 'down'
    }
    else if (e.keyCode == '37') {
       // left arrow
       move = 'left'
    }
    else if (e.keyCode == '39') {
       // right arrow
       move = 'right'
    }

}


// setInterval(console.log('ha'),1000)

// updateSnakePosition()