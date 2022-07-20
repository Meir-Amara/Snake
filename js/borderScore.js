let scoreBoardTable = document.getElementById("scoreBrord");
let storageScoreBoard = JSON.parse(localStorage.getItem("score")) || [];

storageScoreBoard=storageScoreBoard.sort((a, b) => b.score - a.score); 

storageScoreBoard.forEach((obj,i) => {
    scoreBoardTable.innerHTML+=/*html*/`
    <tr>
    <th scope="row">${i+1}</th>
    <td>${obj.userName}</td>
    <td>${obj.score}</td>
  </tr>
    `
    
});