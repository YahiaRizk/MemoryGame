//Handle Start Game
document.querySelector(".start-game span").onclick = function () {
  //Set Username
  let userName = prompt("Enter your name: ");
  let nameSpan = document.querySelector(".name span");
  if (userName == null || userName == "") {
    nameSpan.innerHTML = "Unknown";
  } else {
    userName = userName[0].toUpperCase() + userName.slice(1);
    nameSpan.innerHTML = userName;
  }

  //Remove Start Game Screen
  document.querySelector(".start-game").remove();
};

let duration = 1000;

//Select Card Container
let cardContainer = document.querySelector(".card-container");

//Make array of cards
let Cards = Array.from(cardContainer.children);

//Make Range Array Depend on cards Array
let orderRange = [...Array(Cards.length).keys()];

//Shuffle orderRange Array with shuffle Function
shuffle(orderRange);

//Loop on all Cards
Cards.forEach((card, index) => {
  //Add order property to every card
  card.style.order = orderRange[index];

  //Add click Event to cards
  card.addEventListener("click", function () {
    flipCard(card);
  });
});

//Shuffle Funcrion
function shuffle(array) {
  let random;
  let temp;
  let current = array.length;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
}

//flipCard Function
function flipCard(selectedCard) {
  //Add calss is-flipped to selected card
  selectedCard.classList.add("flipped");

  //Select all flipped Cards
  let selectedCards = document.querySelectorAll(".flipped");
  // let selectedCards1 = Cards.filter(flippedCard => flippedCard.classList.contains("flipped"))

  //Check if there two flipped cards
  if (selectedCards.length === 2) {

    //Function for stop Clicking
    stopClicking();

    //Check two cards for match
    checkMatch(selectedCards[0], selectedCards[1]);
  }
}

//checkMatch function
function checkMatch(firstCard, SecondCard) {
  //Check if match
  if (firstCard.dataset.hero === SecondCard.dataset.hero) {
    //Remove flipped class and add match class to cards
    firstCard.classList.remove("flipped")
    SecondCard.classList.remove("flipped")
    firstCard.classList.add("match")
    SecondCard.classList.add("match")

  } else {
    //Increase Wrong tries
    let tries = document.querySelector(".info-container .tries span")
    tries.innerHTML = parseInt(tries.innerHTML) + 1

    //Remove flipped class after Duration
    setTimeout(() => {
      firstCard.classList.remove("flipped")
      SecondCard.classList.remove("flipped")
    }, duration)
  }
}

//stopClicking Function
function stopClicking () {
  //Add class no-clicking to card container 
  cardContainer.classList.add("no-clicking")

  //Remove the Class after Duration
  setTimeout(() => {
    cardContainer.classList.remove("no-clicking")
  }, duration)

}
