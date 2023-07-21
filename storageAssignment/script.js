function getLocalScore() {
    const localScore = localStorage.getItem('localScore');
    return localScore ? parseInt(localScore) : 0;
}

function setLocalScore(score) {
    localStorage.setItem('localScore', score.toString());
}

function getSessionScore() {
    const sessionScore = sessionStorage.getItem('sessionScore');
    return sessionScore ? parseInt(sessionScore) : 0;
}

function setSessionScore(score) {
    sessionStorage.setItem('sessionScore', score.toString());
}

// Update the display on browser.
function updateScore() {
    document.getElementById('localScore').textContent = getLocalScore();
    document.getElementById('sessionScore').textContent = getSessionScore();
}

let localScore = getLocalScore();
let sessionScore = getSessionScore();

// Set the click events on both the buttons along with handlers.
document.getElementById('incrementLocal').addEventListener('click', () => {
    localScore++;
    setLocalScore(localScore);
    updateScore();
});

document.getElementById('incrementSession').addEventListener('click', () => {
    sessionScore++;
    setSessionScore(sessionScore);
    updateScore();
});

// Clear both the storage on reloading.
window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('sessionScore');
    localStorage.removeItem('localScore');
});

