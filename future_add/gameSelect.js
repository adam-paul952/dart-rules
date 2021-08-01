const createSelectionTable = () => {
    let selectionTable = document.getElementById("selection");
    let games = ["Please Select a game", "Baseball", "Bob's 27" ,"Cricket", "Elimination", "Killer", "X01"];
    let select = document.createElement("select");
    select.name = "choice";
    select.id = "choice";
        games.forEach(game => {
        let op = document.createElement("option");
        op.value = game;
        op.text = game;
        select.appendChild(op);
    });

    let label = document.createElement("label");
    label.innerHTML = "Choose your game: "
    label.htmlFor = "choice";

    // Create Submit and Cancel Buttons
    let submitBtn = document.getElementById("submitBtn");
        submitBtn = document.createElement("input");
        submitBtn.setAttribute("type", "button");
        submitBtn.setAttribute("value", "Submit");
        submitBtn.addEventListener("click", () => {
            // Function to submit the game
        });
    let resetBtn = document.getElementById("cancelBtn");
        resetBtn = document.createElement("input");
        resetBtn.setAttribute("type", "button");
        resetBtn.setAttribute("value", "Cancel");
        resetBtn.addEventListener("click", () => {
            window.location.assign("./index.html")
        });

    selectionTable.appendChild(label).appendChild(select);
    selectionTable.appendChild(submitBtn);
    selectionTable.appendChild(resetBtn);

}

// function createX01() {
//     let x01Selector = document.getElementById("x01Option");

//     let optionTable = document.createElement("table");
//     let tbody = document.createElement("tbody");
//     for (let i=0; i < 3; i++) {
//     let row = document.createElement("tr");
//     for (let j = 0; j < 4; j++) {
//         let col = document.createElement("td");
//         let legs = document.createTextNode("Legs: ");
//         col.appendChild(legs);
//         row.appendChild(col);
//         }
//         tbody.appendChild(row);
//     }
//     optionTable.appendChild(tbody);
//     x01Selector.appendChild(optionTable);
// }