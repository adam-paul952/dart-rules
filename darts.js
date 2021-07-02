/*
    This page will create user classes
*/
function newPlayer() {
    let newUser = document.getElementById("createPlayer");
    newUser.addEventListener("click", () => {
        let newPlayerInput = document.createElement("input");
        newPlayerInput.setAttribute("type", "text");
    })
}
class User {
    constructor(name, nickName) {
        this.name = name;
        this.nickName = nickName;
    }
}