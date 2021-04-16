/*
Copyright (c) 2020 Ania Kubow
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


const squares = document.querySelectorAll(".square")
const mole = document.querySelector(".mole")
const timeLeft = document.querySelector('#time-left')

let score = document.querySelector('#score')
let hitPosition
let result = 0
let timerId = null
let currentTime = 60

//Ramdomly select a square
function randomSquare() {
    
    //remove class mole
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    //randomly assign a mole class
    let randomPosition = squares[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')

    //assign the id of the randomPosition to hitPosition
    hitPosition = randomPosition.id

}

//Add eventListener to each squre
squares.forEach(square => {
     square.addEventListener('mousedown', () => {
         //check if the click hit the mole
         //===> increment score, change score display, change mole postion
         if (square.id === hitPosition) {
            result++
            score.textContent = result
            moveMole()
         }
     })
})

//add move mole function
//set time limit to 1 sec
function moveMole() {
    randomSquare()
    clearInterval(timerId)
    timerId = setInterval(randomSquare, 1000)
}

moveMole()
countDown()

//set timer
function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
    if(currentTime === 0) {
        clearInterval(timerId)
        clearInterval(countDownTimerId)
        alert("GAME OVER! You hit " + result + " moles in 60 seconds.")
    }
}

let countDownTimerId = setInterval(countDown, 1000)

