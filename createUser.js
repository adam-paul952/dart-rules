// Create form for username input
const generateNameField = () => {
    let nameField = document.getElementById("userContainer");

    // Create Name and Nickname input
    let userName = document.getElementById("userNameInput");
        userName = document.createElement("input");
        userName.setAttribute("type", "text");
        userName.setAttribute("placeholder", "Name");
        userName.setAttribute("id", "userName");
        userName.setAttribute("name", "userName");
        userName.required = true;
        let nickName = document.getElementById("nicknameInput");
        nickName = document.createElement("input");
        nickName.setAttribute("type", "text");
        nickName.setAttribute("placeholder", "Nickname(Optional)");
        nickName.setAttribute("id", "nickName");
        nickName.setAttribute("name", "nickName");

    // Create Submit and Cancel Buttons
    let submitBtn = document.getElementById("submitBtn");
        submitBtn = document.createElement("input");
        submitBtn.setAttribute("type", "submit");
        submitBtn.setAttribute("value", "Submit");
        submitBtn.addEventListener("click", () => {
            // debugger;
            let uName = userName.value;
            let nName = nickName.value;
            // console.log(`The new player ${uName} has a nickname of ${nName}`);
            // createNewPlayer(uName, nName);
        });
    let resetBtn = document.getElementById("resetBtn");
        resetBtn = document.createElement("input");
        resetBtn.setAttribute("type", "reset");
        resetBtn.setAttribute("value", "Reset");
    let returnBtn = document.getElementById("returnBtn");
        returnBtn = document.createElement("input");
        returnBtn.setAttribute("type", "button");
        returnBtn.setAttribute("value", "Return to main page");
        returnBtn.addEventListener("click", () => {
            window.location.assign("./index.html")
        });

        nameField.appendChild(userName);
        nameField.appendChild(nickName);
        nameField.appendChild(submitBtn);
        nameField.appendChild(resetBtn);
        nameField.appendChild(returnBtn);
}
