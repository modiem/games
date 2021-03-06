/*
Copyright (c) 2020 Ania Kubow
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

document.addEventListener('DOMContentLoaded', () => {
    //card options
    const cardArray = [
        {
            name: "burger",
            img: "images/burger.png"
        },
        {
            name: "burger",
            img: "images/burger.png"
        },
        {
            name: "donut",
            img: "images/donut.png"
        },
        {
            name: "donut",
            img: "images/donut.png"
        },
        {
            name: "hotdog",
            img: "images/hotdog.png"
        },
        {
            name: "hotdog",
            img: "images/hotdog.png"
        },
        {
            name: "sushi",
            img: "images/sushi.png"
        },
        {
            name: "sushi",
            img: "images/sushi.png"
        },
        {
            name: "pizza",
            img: "images/pizza.png"
        },
        {
            name: "pizza",
            img: "images/pizza.png"
        },
        {
            name: "ramen",
            img: "images/ramen.png"
        },
        {
            name: "ramen",
            img: "images/ramen.png"
        }
    ]

    //SET IMAGES TO RANDOM ORDER
    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    const attemptsDisplay = document.querySelector('#attempts')
    var  cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []
    var attemptTimes = 0;


    //CREATE GAME BOARD
    function createBoard() {
        for (let i=0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute("data-id", i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            alert('You have clicked the same image!')
          }
        else if (cardsChosen[0] === cardsChosen[1]) {
            alert("You found a match!") 
            cards[optionOneId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].setAttribute('src', 'images/white.png')
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            alert("Sorry, try again!")
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        attemptsDisplay.textContent = attemptTimes
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = "Congratulations! You found them all!"
        }
    }


    //flip your card
    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
            attemptTimes++
        }
    }

    createBoard()
     

})