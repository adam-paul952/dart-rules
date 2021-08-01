import React from 'react';
import ReactDom from 'react-dom';

export class Inning extends React.Component {
    render() {
        return <h1>Hello World</h1>
    }
};
ReactDom.render(<Inning />, document.getElementById("inning"));
//----------------------------------------------------------------------------------------------//
//     // Create Numeric Input For Score
// const numberBoard = () =>{
//     let scoreInput = document.getElementById("numberBoard");
//     let inputTable = document.createElement("table");
//     let inputTbody = document.createElement("tbody");
//     let numberCounter = 0;
//     for (let i = 0; i < 3; i++) {
//         let row = document.createElement("tr");
//         for (let j = 0; j < 3; j++) {
//             let col = document.createElement("td");
//             let numberInput = document.createElement("button");
//             numberInput.setAttribute("class", "btns");
//             numberCounter++;
//             col.appendChild(numberInput);
//             row.appendChild(col);
//         }
//         inputTbody.appendChild(row);
//     }
//     inputTable.appendChild(inputTbody);
//     scoreInput.appendChild(inputTable);
// }

    // Create submit score button
const createSubmit = () => {
    let container = document.getElementById("btns");
    let submitScore = document.getElementById("submitScore");
    submitScore = document.createElement("input");
    submitScore.setAttribute("type", "button");
    submitScore.setAttribute("name", "submit");
    submitScore.setAttribute("id", "submit");
    submitScore.setAttribute("value", "Add Score");
    // let scoreboard = document.getElementById("scoreboard");
    // submitScore.addEventListener("click", () => {
        //     // Submit Score
        // })
        container.appendChild(submitScore);
    }

    // Create delete score button
const createDelete = () => {
    let container = document.getElementById("btns");
    let deleteBtn = document.getElementById("deleteBtn");
    deleteBtn = document.createElement("input");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("name", "delete");
    deleteBtn.setAttribute("id", "delete");
    deleteBtn.setAttribute("value", "Clear Score");
    // let scoreboard = document.getElementById("scoreboard");
    // deleteBtn.addEventListener("click", () => {
    //     // Clear Score Input Field
    // })
    container.appendChild(deleteBtn);
}