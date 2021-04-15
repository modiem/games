document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")

    
    console.log(grid)
    // create a grid with 7 columns nested 6 rows
    for (let i=1; i<8; i++) {
        const column = document.createElement('div')
        column.classList.add("column")
        grid.appendChild(column)

        // each column has 6 rows
        for (let j=1; j<7; j++) {
            // console.log("x:"+i+" j:" +j)
            const square = document.createElement('div')
            square.setAttribute("data-x", i)
            square.setAttribute("data-y", j)
            column.appendChild(square)
        }
    }
})
