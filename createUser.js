// Create form for username input
const generateNameField = () => {
    let nameField = document.getElementById("userContainer");

    // Create Name and Nickname input
    let userName = document.getElementById("userNameInput");
        userName = document.createElement("input");
        userName.setAttribute("type", "text");
        userName.setAttribute("placeholder", "Name");
    let nickName = document.getElementById("nicknameInput");
        nickName = document.createElement("input");
        nickName.setAttribute("type", "text");
        nickName.setAttribute("placeholder", "Nickname(Optional)");

    // Create Submit and Cancel Buttons
    let submitBtn = document.getElementById("submitBtn");
        submitBtn = document.createElement("input");
        submitBtn.setAttribute("type", "button");
        submitBtn.setAttribute("value", "Submit");
        let uName = document.getElementById("userNameInput");
        let nName = document.getElementById("nicknameInput");
        submitBtn.addEventListener("click", () => {
            listOfPlayers(uName, nName);
        });
    let resetBtn = document.getElementById("resetBtn");
        resetBtn = document.createElement("input");
        resetBtn.setAttribute("type", "button");
        resetBtn.setAttribute("value", "Cancel");
        resetBtn.addEventListener("click", () => {
            window.location.assign("./index.html")
        });

        nameField.appendChild(userName);
        nameField.appendChild(nickName);
        nameField.appendChild(submitBtn);
        nameField.appendChild(resetBtn);
}

// Function to get user input and store into a variable
const listOfPlayers = function(name, nickname) {
    let players = [];
    let player = new class Adam("Adam", "Paul") extend UserName;
    players.push(player);
    console.log(players);
}

// Create class to construct user profile
class UserName {
    constructor(uName, nickname) {
        this._uName = uName;
        this._nickname = nickname;
    }
    get name() {
        return this._uName;
    }
    get nickname() {
        return this._nickname;
    }
}