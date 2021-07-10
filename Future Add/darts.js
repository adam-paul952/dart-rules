const generateSelectionPage = () => {
    let createButtonField = document.getElementById("container");
    // Create Player Button
    let newUserBtn = document.getElementById("createPlayer");
        newUserBtn = document.createElement("input");
        newUserBtn.setAttribute("type", "button");
        newUserBtn.setAttribute("value", "Create Player")
        newUserBtn.addEventListener("click", () => {
            window.location.assign("./createUser.html");
        });
    // Rules Page
    let rulesBtn = document.getElementById("rules");
        rulesBtn = document.createElement("input");
        rulesBtn.setAttribute("type", "button");
        rulesBtn.setAttribute("value", "Rules");
        rulesBtn.addEventListener("click", () => {
            window.location.assign("./rules.html");
        });
    // Create New Game
    let newGameBtn = document.getElementById("newGame");
        newGameBtn = document.createElement("input");
        newGameBtn.setAttribute("type", "button");
        newGameBtn.setAttribute("value", "Create New Game");
        newGameBtn.addEventListener("click", () => {
            window.location.assign("./gameSelect.html");
        });
    // Create Resume Game
    let resumeGameBtn = document.getElementById("resumeGame");
        resumeGameBtn = document.createElement("input");
        resumeGameBtn.setAttribute("type", "button");
        resumeGameBtn.setAttribute("value", "Resume Game");
        resumeGameBtn.disabled = true;
        resumeGameBtn.addEventListener("click", () => {
            // Function to load resume game page
        });
    // Create Statistics Page
    let statsBtn = document.getElementById("statistics");
        statsBtn = document.createElement("input");
        statsBtn.setAttribute("type", "button");
        statsBtn.setAttribute("value", "Statistics");
        statsBtn.disabled = true;
        statsBtn.addEventListener("click", () => {
            // Function to load Stats page
        });

    createButtonField.appendChild(newGameBtn);
    createButtonField.appendChild(resumeGameBtn);
    createButtonField.appendChild(newUserBtn);
    createButtonField.appendChild(statsBtn);
    createButtonField.appendChild(rulesBtn);
}
