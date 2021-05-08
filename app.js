const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

let deck = []

// for (let i = 0; i < 7; i++)
// {
//   cards.forEach(e => deck.push("s" + e))
//   cards.forEach(e => deck.push("c" + e))
//   cards.forEach(e => deck.push("d" + e))
//   cards.forEach(e => deck.push("h" + e))
// }

for (let i = 0; i < 8; i++)
{
  cards.forEach(e => deck.push("♠" + e))
  cards.forEach(e => deck.push("♣" + e))
  cards.forEach(e => deck.push("♦" + e))
  cards.forEach(e => deck.push("♥" + e))
}

let playerPoints = 0
let dealerPoints = 0

let playerWins = 0
let dealerWins = 0

let playerCards = []
let dealerCards = []

let state = 0

const winner = document.querySelector(".winner")
const playerWinCount = document.querySelector(".playerWins")
const dealerWinCount = document.querySelector(".dealerWins")
const playButton = document.querySelector(".playButton")
const cardsInDeck = document.querySelector(".cardsInDeck")
const stateElement = document.querySelector(".state")
const playerPointsElement = document.querySelector(".playerPoints")
const playerCardsElement = document.querySelector(".playerCards")
const dealerPointsElement = document.querySelector(".dealerPoints")
const dealerCardsElement = document.querySelector(".dealerCards")
const hitButton = document.querySelector(".hitButton")
const stopButton = document.querySelector(".stopButton")

playButton.style.visibility = "hidden"

let theDealer

playButton.addEventListener("click", () =>
{
  playerPointsElement.innerText = "Player's Points: " + playerPoints
  dealerPointsElement.innerText = "Dealer's Points: " + dealerPoints
  winner.style.visibility = "hidden"

  playerCardsElement.innerText = "Player's Cards"
  dealerCardsElement.innerText = "Dealer's Cards"


  dealForPlayer()

  playButton.style.visibility = "hidden"
  hitButton.style.visibility = "visible"
  stopButton.style.visibility = "visible"

})

hitButton.addEventListener("click", () =>
{
  dealForPlayer()
})


stopButton.addEventListener("click", () =>
{
  dealForDealer()
  theDealer = setInterval(dealForDealer, 1200)

  hitButton.style.visibility = "hidden"
  stopButton.style.visibility = "hidden"


})

function dealForPlayer()
{
  const randomCardPos = Math.floor(Math.random() * deck.length - 1) + 1
  const selectedCard = deck[randomCardPos]

  playerCards.push(selectedCard)

  console.log("dealt: " + selectedCard)

  addPlayerPoints(selectedCard)
  deck.splice(randomCardPos, 1)

  cardsInDeck.innerText = "Cards left in deck :" + deck.length
  stateElement.innerText = "Deck state: " + state
  playerPointsElement.innerText = "Player's Points: " + playerPoints
  let playerCardsText = "Player's Cards: "
  for (let e of playerCards) playerCardsText += " " + e
  playerCardsElement.innerText = playerCardsText

  console.log(deck)

  if (playerPoints === 21) playerWon()
  if (playerPoints > 21) dealerWon()
}

function dealForDealer()
{
  const randomCardPos = Math.floor(Math.random() * deck.length - 1) + 1
  const selectedCard = deck[randomCardPos]

  dealerCards.push(selectedCard)

  console.log("dealt: " + selectedCard)

  addDealerPoints(selectedCard)
  deck.splice(randomCardPos, 1)

  cardsInDeck.innerText = "Cards left in deck :" + deck.length
  stateElement.innerText = "Deck state: " + state
  dealerPointsElement.innerText = "Dealer's Points: " + dealerPoints
  let dealerCardsText = "Dealer's Cards: "
  for (let e of dealerCards) dealerCardsText += " " + e
  dealerCardsElement.innerText = dealerCardsText


  console.log(deck)

  if (dealerPoints > 21) playerWon()
  else if (playerPoints === dealerPoints) draw()
  else if (21 - dealerPoints < 21 - playerPoints) dealerWon()
}

function addPlayerPoints(selectedCard)
{
  let card = selectedCard.slice(1)
  let cardValue

  if (card === "J" || card === "Q" || card === "K") cardValue = 10
  else if (card === "A") cardValue = 11
  else cardValue = Number.parseInt(card)

  playerPoints = playerPoints + cardValue
  updateState(selectedCard)

  console.log("Player Points: " + playerPoints)
}

function addDealerPoints(selectedCard)
{
  let card = selectedCard.slice(1)
  let cardValue

  if (card === "J" || card === "Q" || card === "K") cardValue = 10
  else if (card === "A") cardValue = 11
  else cardValue = Number.parseInt(card)

  dealerPoints = dealerPoints + cardValue
  updateState(selectedCard)

  console.log("Dealer Points: " + dealerPoints)
}

function resetDeck()
{
  deck = []

  //   for (let i = 0; i < 7; i++)
  //   {
  //     cards.forEach(e => deck.push("s" + e))
  //     cards.forEach(e => deck.push("c" + e))
  //     cards.forEach(e => deck.push("d" + e))
  //     cards.forEach(e => deck.push("h" + e))
  //   }

  for (let i = 0; i < 8; i++)
  {
    cards.forEach(e => deck.push("♠" + e))
    cards.forEach(e => deck.push("♣" + e))
    cards.forEach(e => deck.push("♦" + e))
    cards.forEach(e => deck.push("♥" + e))
  }

}


function playerWon()
{
  clearInterval(theDealer)

  console.log("PLAYER WON")

  winner.innerText = "PLAYER WON"
  winner.style.visibility = "visible"
  playButton.style.visibility = "visible"
  hitButton.style.visibility = "hidden"
  stopButton.style.visibility = "hidden"


  playerPoints = 0
  dealerPoints = 0

  playerCards = []
  dealerCards = []

  playerWins++
  playerWinCount.innerText = "Player's win count: " + playerWins
}

function dealerWon()
{
  clearInterval(theDealer)

  console.log("DEALER WON")

  winner.innerText = "DEALER WON"
  winner.style.visibility = "visible"
  playButton.style.visibility = "visible"
  hitButton.style.visibility = "hidden"
  stopButton.style.visibility = "hidden"


  playerPoints = 0
  dealerPoints = 0

  playerCards = []
  dealerCards = []

  dealerWins++
  dealerWinCount.innerText = "Dealer's win count: " + dealerWins
}

function draw()
{
  clearInterval(theDealer)

  console.log("DRAW")

  winner.innerText = "DRAW"
  winner.style.visibility = "visible"
  playButton.style.visibility = "visible"
  hitButton.style.visibility = "hidden"
  stopButton.style.visibility = "hidden"

  playerPoints = 0
  dealerPoints = 0

  playerCards = []
  dealerCards = []

}

function updateState(selectedCard)
{
  let card = selectedCard.slice(1)
  let cardValue

  if (card === "J" || card === "Q" || card === "K") cardValue = 10
  else if (card === "A") cardValue = 11
  else cardValue = Number.parseInt(card)

  if (cardValue < 9) state++
  else state--

  console.log("State: " + state)
}

dealForPlayer()