// WAR card game version 1.0
// Only works until the Deck runs out
// Storage for player decks coming soon

let deckId = "";
let player1Score = 0,
	player2Score = 0;
let player1Deck = [],
	player2Deck = [];

fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
	.then((res) => res.json()) // parse response as JSON
	.then((data) => {
		console.log(data);
		deckId = data.deck_id;
	})
	.catch((err) => {
		console.log(`error ${err}`);
	});

document.querySelector("#dealCards").addEventListener("click", drawTwo);
document.querySelector("#war-button").addEventListener("click", drawWar);

function drawTwo() {
	const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

	fetch(url)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			console.log(data);
			document.querySelector("#player1").src = data.cards[0].image;
			document.querySelector("#player2").src = data.cards[1].image;

			let player1Val = convertToNum(data.cards[0].value);
			let player2Val = convertToNum(data.cards[1].value);

			if (player1Val > player2Val) {
				document.querySelector("h3").innerText = "Player 1 wins";
				player1Score++;
				document.querySelector("#player1ScoreBoard").innerText = player1Score;
				document.querySelector("#cardsRemainingDeck").innerText =
					data.remaining;
			} else if (player2Val > player1Val) {
				document.querySelector("h3").innerText = "Player 2 wins";
				player2Score++;
				document.querySelector("#player2ScoreBoard").innerText = player2Score;
				document.querySelector("#cardsRemainingDeck").innerText =
					data.remaining;
			} else {
				document.querySelector("h3").innerText = "Get ready for WAR!";
				document.querySelector(".war").classList.remove("hidden");
				document.querySelector("#war-button").classList.remove("hidden");
			}
		})
		.catch((err) => {
			console.log(`error ${err}`);
		});
}

function convertToNum(val) {
	if (val === "ACE") {
		return 14;
	} else if (val === "KING") {
		return 13;
	} else if (val === "QUEEN") {
		return 12;
	} else if (val === "JACK") {
		return 11;
	} else {
		return Number(val);
	}
}

function drawWar() {
	const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`;

	fetch(url)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			console.log(data);
			// WAR cards for player 1
			document.querySelector("#war-p1-discard01").src = data.cards[0].image;
			document.querySelector("#war-p1-discard02").src = data.cards[1].image;
			document.querySelector("#war-p1-discard03").src = data.cards[2].image;
			document.querySelector("#war-p1-warcard").src = data.cards[3].image;
			// WAR cards for player
			document.querySelector("#war-p2-discard01").src = data.cards[4].image;
			document.querySelector("#war-p2-discard02").src = data.cards[5].image;
			document.querySelector("#war-p2-discard03").src = data.cards[6].image;
			document.querySelector("#war-p2-warcard").src = data.cards[7].image;

			let player1Val = convertToNum(data.cards[3].value);
			let player2Val = convertToNum(data.cards[7].value);

			if (player1Val > player2Val) {
				document.querySelector("h3").innerText = "Player 1 wins";
				player1Score++;
				document.querySelector("#player1ScoreBoard").innerText = player1Score;
				document.querySelector("#cardsRemainingDeck").innerText =
					data.remaining;
				document.querySelector("#war-button").classList.add("hidden");
			} else if (player2Val > player1Val) {
				document.querySelector("h3").innerText = "Player 2 wins";
				player2Score++;
				document.querySelector("#player2ScoreBoard").innerText = player2Score;
				document.querySelector("#cardsRemainingDeck").innerText =
					data.remaining;
				document.querySelector("#war-button").classList.add("hidden");
			} else {
				document.querySelector("h3").innerText = "Get ready for WAR!";
				document.querySelector(".war").classList.remove("hidden");
			}
		})
		.catch((err) => {
			console.log(`error ${err}`);
		});
}

// functions for future version 2.0

// function addToWinnersDeck(winnersDeck, loserCard) {
// 	winnersDeck.push(loserCard);
// }
// function removeFromLosersDeck(losersDeck, loserCard) {
// 	winnersDeck.push(loserCard);
// }
