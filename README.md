                                                        Diamond Sweeper 

Project Structure
The project has been built on HTML, CSS and JavaScript. 
It can be run by executing "Index.html" file (Diamond Sweeper -> view -> Index.html)

Index.html
Index file contain html code for the view and css and script files are imported in the same

Style.css
There is no other css dependency for view apart from style.css

Script.js
The logic for the Diamon Sweeper is coded in Script.js file.

•	initializeBoard(status) - Included logic for initializing the board on page load where the game starts and all cards are unclicked("question marks" are displayed).

•	generateRandomDaimondPos() - Logic for distributing Diamonds in random position of all 64 cards every time a new game starts.

•	flipImage() - Enables the click functionality where if a on user click the card :
  If it contains diamond - Diamonds is shown 
  If it doesn't contain Diamond - It's shown as blank
  (Interim this function flipcount calculation and max score calculation logic executes)

•	calculateScore(total) - Total score is returned to view from this function.

•	restoreLastSession() - Restores very last session when window is loaded again if user didn't complete the session.



