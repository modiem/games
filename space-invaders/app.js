/*
MIT License
Copyright (c) 2020 Ania Kubow
https://github.com/kubowania/space-invaders
*/

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const startBtn = document.querySelector("#start-button")
    let resultDisplay = document.querySelector("#result")
    const width = 15
    const height = 15
    let goingRight
    let shooter
    let invaders = []
    let removed=[]


    //CREATE SQUARES
    for (let i=0; i < width * height; i ++) {
        const square = document.createElement("div")
        square.innerText = i
        grid.appendChild(square)
    }
    const squares = document.querySelectorAll(".grid div")
    
    resetGame()

    //reset
    function resetGame() {
        squares.forEach(square => square.classList.remove("shooter"))
        clearInvaders()
        direction = 1
        goingRight = true
        let score = 0
        resultDisplay.innerText = score
        shooter = 217
        squares[shooter].classList.add("shooter")

        invaders = [
            0,1,2,3,4,5,6,7,8,9,
            15,16,17,18,19,20,21,22,23,24,
            30,31,32,33,34,35,36,37,38,39
        ]
        drawInvaders()
    }
    
    function drawInvaders() {
        for (let i=0; i<invaders.length; i++) {
            if (!removed.includes(i)) {
                squares[invaders[i]].classList.add("invader")
                }
        }
    }

    function clearInvaders() {
        invaders.forEach(invader => squares[invader].classList.remove("invader"))

    }
    


    function shoot() {
        let laser = shooter
        let laserInterval
        function moveLaser() {
            squares[laser].classList.remove("laser")
            laser -= width
            squares[laser].classList.add("laser")
    
            if (squares[laser].classList.contains("invader")) {
                squares[laser].classList.remove("laser")
                squares[laser].classList.remove("invader")
                squares[laser].classList.add("boom")
                clearInterval(laserInterval)
                
                setTimeout(() => squares[laser].classList.remove("boom"), 300)

                const removedInvader = invaders.indexOf(laser)
                removed.push(removedInvader)
                score++
                resultDisplay.innerText = score
            }
        }
        laserInterval = setInterval(moveLaser, 100)
        
    }
            

    function moveShooter(e) {
        squares[shooter].classList.remove("shooter")
        switch(e.key) {
            case 'ArrowLeft':
                if (shooter % width !== 0) shooter -= 1
                break;
            case 'ArrowRight':
                if (shooter % width < (width -1)) shooter += 1
                break;
        }
        squares[shooter].classList.add("shooter")
    }



    function moveInvaders() {
        const leftEdge = invaders[0] % width === 0
        const rightEdge = invaders[invaders.length/3 -1] % width === width -1
        clearInvaders()
        
        if ((rightEdge && goingRight) || (leftEdge && !goingRight)) {
            goingRight = !goingRight
            for (let i=0; i < invaders.length; i++) {
                invaders[i] += width
            }
        } else if (goingRight) {
            for (let i=0; i < invaders.length; i++) {
                invaders[i] += 1
            }
        } else {
            for (let i=0; i < invaders.length; i++) {
                invaders[i] -= 1
            }
        }
        drawInvaders()
    }

    /* ===============================
    timer start: 
    // invaders move down
    // win or lose
    =============================== */
    function startGame() {
        resetGame()
        let interval
        let shootInterval
        // moveInvaders()

        if (squares[shooter].classList.contains('invader', 'shooter')) {
            clearInterval(interval)
            clearInterval(shootInterval)
            alert('GAME OVER')
        }
        
        for (let i = 0; i<invaders.length; i++) {
            if (invaders[i] > squares.length) {
                clearInterval(interval)
                clearInterval(shootInterval)
                alert("Game Over!")
            }
        }

        if (invaders.length === removed.length) {
            clearInterval(interval)
            clearInterval(shootInterval)
            alert("You Win!")
        }

        interval = setInterval(moveInvaders, 600)
        shootInterval = setInterval(shoot, 800)
    }
    

    startBtn.addEventListener("click", startGame)
    document.addEventListener('keydown', moveShooter)
    
})
