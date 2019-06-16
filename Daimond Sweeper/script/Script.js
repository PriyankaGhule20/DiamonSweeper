
var gridContainer = document.getElementsByClassName('game-container')[0]; 
var FlippCount = 0;
var diamondPositions = [];
var selectedCells = [];
var maxScore;
var retrieveObj;
var storageObject={};
(function () {
    initializeBoard("onload");
})();

function initializeBoard(status) {
    
    if (status=="reload")
    {
        document.getElementById("template").style.display="none";
        document.getElementById("restore_session").style.display="none";
    }
    if(localStorage.getItem("diamondSweeperObject") !== null){
        retrieveObj = JSON.parse(localStorage.getItem("diamondSweeperObject"));
        document.getElementById("restore_session").style.display="block";
    }
  
    // Initializing the Flipcount to be 0
    FlippCount = 0;
    // Maximum score can be 56
    maxScore = 56;
    a = gridContainer.children;
    // Randomizing the diamond places for every new game session
    generateRandomDaimondPos();
    for (var i = 0; i < a.length; i++) {
        var gridItem = a[i];
        gridItem.addEventListener('click', flipImage);
        var box = gridItem.getAttribute('id');
        // Setting bgImage as Question mark initially for all cells     
        gridItem.style.background = "url('../images/question.png')" ;
        gridItem.style.backgroundSize = 'cover';
        gridItem.style.backgroundRepeat = 'no-repeat';
        gridItem.style.backgroundPosition = 'center';

    }
}

// defining generateRandompostion fucntion for diamon positions
    function generateRandomDaimondPos() {
        var totalDiamonds = 8;
        // clearing the previous place diamonds
        diamondPositions.length = 0;
        while(diamondPositions.length !=8){
            var position = Math.floor(Math.random() * 64) + 1;
            if(!diamondPositions.includes("box-" + position)){
                diamondPositions.push("box-" + position);
            }
        }
        console.log(diamondPositions);
    }
   // Daiplay diamon image on click
    function flipImage(event) {
        var id = event.target.id;
        var element = document.getElementById(id);
        if (diamondPositions.includes(id)) {
            FlippCount++;
            element.style.backgroundImage ="url('../images/diamond.png')";
            if (FlippCount == 8) {
                calculateScore(maxScore);
               // initializeBoard("reload");
                return;
            }
        }
        else {
            maxScore--;
            element.style.background = 'none';
        }
        selectedCells.push(id);
        element.removeEventListener('click', flipImage);
        storageObject["maxScore"] = maxScore;
        storageObject["diamondPositions"] = diamondPositions;
        storageObject["selectedCells"] = selectedCells;
        storageObject["FlippCount"] = FlippCount;

        localStorage.setItem("diamondSweeperObject",JSON.stringify(storageObject));

    }
  //Calculate final score
    function calculateScore(total) {
        var template = document.getElementById('template');
        var score = document.getElementById('current-score');
        template.style.display = 'block';
        score.innerHTML = "Your Score is " + total;
    }

function restoreLastSession(){
    maxScore = retrieveObj.maxScore;
    FlippCount = retrieveObj.FlippCount;
    diamondPositions = retrieveObj.diamondPositions;
    selectedCells = retrieveObj.selectedCells;
    a = gridContainer.children;
    // Randomizing the diamond places for every new game session
    
    for (var i = 0; i < a.length; i++) {
        var gridItem = a[i];
        gridItem.addEventListener('click', flipImage);
        var box = gridItem.getAttribute('id');
        if(selectedCells.includes(box)){
            if(diamondPositions.includes(box))
                gridItem.style.background = "url('../images/diamond.png')" ; 
            else
            gridItem.style.background = "none";
        }else {
            gridItem.style.background = "url('../images/question.png')" ;
        }
        // Setting bgImage as Question mark initially for all cells     
        gridItem.style.backgroundSize = 'cover';
        gridItem.style.backgroundRepeat = 'no-repeat';
        gridItem.style.backgroundPosition = 'center';

    }
    document.getElementById("selection_menu").style.display="none";
}
