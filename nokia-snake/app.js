/*
Copyright (c) 2020 Ania Kubow
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const startBtn = document.querySelector("button")
    const scoreDisplay = document.querySelector('#score')
    const timeDisplay = document.querySelector("#timeInterval")
    const width = 10
     
    //create the game board
    for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div")
    square.setAttribute("id", i)
    // square.textContent=i
    grid.appendChild(square)
    }

    const squares = document.querySelectorAll(".grid div")
    let currentSnake = [45, 44, 43]
    let appleIndex = 47
    let score = 0
    let direction = 1
    let intervalTime = 1000
    let speed = 0.9

    //before the game start show apple and snake on the board
    scoreDisplay.innerText = score
    squares[appleIndex].classList.add("apple")
    currentSnake.forEach(index => squares[index].classList.add("snake"))

    /* =================
    add event listeners
    =================== */

    // startBtn.addEventListener('click', startGame)
     
    document.addEventListener('keydown', control)
    


    /* =================
    define functions
    =================== */

    function startGame() {
        //remove current class
        clearInterval(interval)
        score = 0
        direction = 1
        intervalTime = 1000
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')

        //put snake and apple back
        currentSnake = [45, 44, 43]
        appleIndex = 47
        squares[appleIndex].classList.add("apple")
        currentSnake.forEach(index => squares[index].classList.add("snake"))
        
        //start move, change direction when key event trigger
        interval = setInterval(moveSnake, 1000)
    }

    function moveSnake() {
        clearInterval(interval)

        /*
        catch failing outcomes
        */
        if (
        (direction === 1 && currentSnake[0] % width === width -1) || //moving right and hit the wall
        (direction === -1 && currentSnake[0] % width === 0) || //moving to left and hit the wall
        (direction === width && (currentSnake[0] + width) > width * width) || //moving up and hit the wall
        (direction === -width && (currentSnake[0] - width) < 0) || //moving down and hit the wall
        (squares[currentSnake[0] + direction].classList.contains("snake") && (currentSnake[0] + direction) != currentSnake[1])//hit itself
        ) {
        // 
        // alert("Game Over! Your final score is "+score)
        return clearInterval(interval)
       }
       /*
        movement
        */
        const tail = currentSnake.pop() //removes last ite of the array and shows it
        squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
        squares[currentSnake[0]].classList.add("snake")
        

        /*
        when snake eat an apple
        */
       if (squares[currentSnake[0]].classList.contains("apple")) {
            randomApple()
            currentSnake.push(tail)
            squares[tail].classList.add('snake')
            score ++
            scoreDisplay.innerText = score

            //speed up
            clearInterval(interval)
            intervalTime *= speed
            timeDisplay.innerText=intervalTime
            
       }
       interval = setInterval(moveSnake, intervalTime)
    }


    function randomApple() {
        squares[appleIndex].classList.remove('apple')
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (currentSnake.includes(appleIndex))

        squares[appleIndex] = document.getElementById(appleIndex) 
        squares[appleIndex].classList.add("apple")
    }

    function control(e) {

        if (e.keyCode === 32) {
            startGame()
          } else if(e.keyCode === 39 && direction != -1) {
            direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
            moveSnake()
          } else if (e.keyCode === 38 && direction != width) {
            direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
            moveSnake()
          } else if (e.keyCode === 37 && direction != 1) {
            direction = -1 // if we press left, the snake will go left one div
            moveSnake()
          } else if (e.keyCode === 40 && direction != -width) {
            direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
            moveSnake()
          }

    }
    
})
