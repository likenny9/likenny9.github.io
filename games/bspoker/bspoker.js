/*-----------------------------------------------
*******GAME INITIALIZATION********
-----------------------------------------------*/
window.onload = initializeGame;

function initializeGame() {

	//var deck = new Deck();
	//deck.createDeck(); //- test createDeck()
	//deck.shuffleDeck(5); //- test shuffleDeck()
	//deck.combineDecks(deck2); //- test combineDecks()
	//deck.addCard(new Card("A","S")); //- test addCard()
	//console.log(deck.numCards()); //- test numCards()
	/*for(var i=0; i<deck.cards.length;i++) {
		var card = deck.cards[i].displayCard();
		var node = document.body.appendChild(card);
	}*/

	//var welcome = new Welcome();
	//welcome.displayWelcome();
	//welcome.startButton.onclick = function() {
	//	welcome.removeWelcome();
		new Game(5,3,1).createBoard();
		//document.querySelector(".cardContainer").classList.toggle("flipCard"); //toggles flipping card
	//}

}
/*-----------------------------------------------
*******WELCOME SECTION********
-----------------------------------------------*/
function Welcome() {
	//Vars
	var welcomeWrapper, welcomeHeading, welcomeText, startButton;
}

//Methods: displayWelcome, removeWelcome
Welcome.prototype = {
	/*-----------------
	  Displays the welcome information.
	  -----------------*/
	displayWelcome: function() {
		this.welcomeWrapper = document.createElement("div");
		this.welcomeWrapper.className = "welcomeWrapper";
		
		this.welcomeHeading = document.createElement("h1");
		this.welcomeHeading.className = "welcomeHeading";
		this.welcomeHeading.innerHTML = "BS Poker";
		
		this.welcomeText = document.createElement("p");
		this.welcomeText.className = "welcomeText";
		this.welcomeText.innerHTML = "Welcome to BS Poker.<br>Select the number of cards to begin with, " +
								"the number of computer opponents, and the difficulty of the opponent.<br> " +
								"If you need assistance, click help.  Otherwise, click start to play."
		
		this.startButton = document.createElement("button");
		this.startButton.className = "startButton";
		this.startButton.innerHTML = "Start";
				
		this.welcomeWrapper.appendChild(this.welcomeHeading);
		this.welcomeWrapper.appendChild(this.welcomeText);
		this.welcomeWrapper.appendChild(this.startButton);
		document.getElementById("gamecontainer").appendChild(this.welcomeWrapper);
	},
	
	/*-----------------
	  Removes the welcome information.
	  -----------------*/
	removeWelcome: function() {
		document.getElementById("gamecontainer").removeChild(this.welcomeWrapper);
	}
};

/*-----------------------------------------------
*******GAME SECTION********
-----------------------------------------------*/
function Game(numStartCards, numComputers, difficultyLevel) {
	//Vars
	this.numStartCards = numStartCards;
	this.numComputers = numComputers;
	this.difficultyLevel = difficultyLevel;
}

//Methods - createBoard
Game.prototype = {
	createBoard: function() {
		//Creates new shuffled deck of cards.
		var deck = new Deck();
		deck.createDeck();
		deck.shuffleDeck(10);
		
		//Creates new player.
		var player = new Player(this.numStartCards);
		player.createPlayer();
		
		//Populates hand and displays it on the screen.
		var cardLeftSpacing = 5;
		var playerHand = new Deck();
		for(var i = 0; i < this.numStartCards; i++) {
			var addedCard = deck.drawCard(); //draws a card from deck
			playerHand.addCard(addedCard); //adds the card to hand
			
			var addedCardWrapper = addedCard.displayCard(); //gets the card div
			addedCardWrapper.style.left = cardLeftSpacing + "px"; //spaces cards appropriately
			player.displayHand(addedCardWrapper); //add card to player wrapper
			cardLeftSpacing+=80;
		}		
		
		//Creates a new computer
		var computer1 = new Computer(this.difficultyLevel);
		computer1.createComputer();
		computer1.computerWrapper.className+= " computer1Wrapper";

		cardLeftSpacing = 5;
		var computer1Hand = new Deck();
		for(var i = 0; i < this.numStartCards; i++) {
			var addedCard = deck.drawCard();
			computer1Hand.addCard(addedCard);
			
			var addedCardWrapper = addedCard.displayCard();
			addedCardWrapper.style.left = cardLeftSpacing + "px";
			computer1.displayHand(addedCardWrapper);
			cardLeftSpacing+=80;
		}
		
		if(this.numComputers == 2 || this.numComputers == 3) {
			var computer2 = new Computer(this.difficultyLevel);
			computer2.createComputer();
			computer2.computerWrapper.className+= " computer2Wrapper";

			cardLeftSpacing = 13;
			var cardTopSpacing = -5;
			var computer2Hand = new Deck();
			for(var i = 0; i < this.numStartCards; i++) {
				var addedCard = deck.drawCard();
				computer2Hand.addCard(addedCard);

				var addedCardWrapper = addedCard.displayCard();
				addedCardWrapper.style.left = cardLeftSpacing + "px";
				addedCardWrapper.style.top = cardTopSpacing + "px";
				rotateCards(addedCardWrapper);
				computer2.displayHand(addedCardWrapper);
				cardTopSpacing+=80;
			}
		}
		if(this.numComputers == 3) {
			var computer3 = new Computer(this.difficultyLevel);
			computer3.createComputer();
			computer3.computerWrapper.className+= " computer3Wrapper";

			cardLeftSpacing = 13;
			var cardTopSpacing = -5;
			var computer3Hand = new Deck();
			for(var i = 0; i < this.numStartCards; i++) {
				var addedCard = deck.drawCard();
				computer3Hand.addCard(addedCard);
				
				var addedCardWrapper = addedCard.displayCard();
				addedCardWrapper.style.left = cardLeftSpacing + "px";
				addedCardWrapper.style.top = cardTopSpacing + "px";
				rotateCards(addedCardWrapper);
				computer3.displayHand(addedCardWrapper);
				cardTopSpacing+=80;
			}
		}
		
		console.log(deck);
		
		function rotateCards(wrapper) {
			wrapper.style.webkitTransform = 'rotate('+90+'deg)'; 
			wrapper.style.mozTransform    = 'rotate('+90+'deg)'; 
			wrapper.style.msTransform     = 'rotate('+90+'deg)'; 
			wrapper.style.oTransform      = 'rotate('+90+'deg)'; 
			wrapper.style.transform       = 'rotate('+90+'deg)'; 
		}
	}

};

/*-----------------------------------------------
*******Player SECTION********
-----------------------------------------------*/
function Player(numStartCards) {
	//Vars
	var playerWrapper;
	this.numStartCards = numStartCards;
}

//Methods - createPlayer, displayHand
Player.prototype = {
	/*-----------------
	  Creates player container.
	  -----------------*/
	createPlayer: function() {
		this.playerWrapper = document.createElement("div");
		this.playerWrapper.className = "playerWrapper";
		//this.playerWrapper.innerHTML = "Player";
		document.getElementById("gamecontainer").appendChild(this.playerWrapper);
	},
	
	/*-----------------
	  Shows player's card on the screen.
	  -----------------*/
	displayHand: function(cardWrapper) {
		this.playerWrapper.appendChild(cardWrapper);
	}
};

/*-----------------------------------------------
*******Computer SECTION********
-----------------------------------------------*/
function Computer(difficultyLevel) {
	//Vars
	var computerWrapper;
	this.difficultyLevel = difficultyLevel;
}

//Methods - createComputer
Computer.prototype = {
	/*-----------------
	  Creates computer container.
	  -----------------*/
	createComputer: function() {
		this.computerWrapper = document.createElement("div");
		this.computerWrapper.className = "computerWrapper";
		
		document.getElementById("gamecontainer").appendChild(this.computerWrapper);
	},
	/*-----------------
	  Shows computer's card on the screen.
	  -----------------*/
	displayHand: function(cardWrapper) {
		this.computerWrapper.appendChild(cardWrapper);
	}
};

/*-----------------------------------------------
*******CARD SECTION********
-----------------------------------------------*/
function Card(number, suit) {
	//Vars
	this.number = number;
	this.suit = suit;
}

//Methods: displayCard
Card.prototype = {
	/*-----------------
	  Creates HTML containers and displays specified card.
	  @returns - the entire div containing the card
	  -----------------*/
	displayCard: function() {
		var cardContainer, cardWrapper, cardFront, cardBack, cardGraphic, cardBackGraphic;
		
		cardContainer = document.createElement("div");
		cardContainer.className = "cardContainer";
		
		cardWrapper = document.createElement("div");
		cardWrapper.className = "cardWrapper";
		
		cardFront = document.createElement("div");
		cardFront.className = "cardFront";
		
		cardBack = document.createElement("div");
		cardBack.className = "cardBack";
		
		cardGraphic = document.createElement("img");
		cardGraphic.className = "faceImage";
		
		cardBackGraphic = document.createElement("img");
		cardBackGraphic.className = "backImage";
		
		switch(this.number) {
			case "A":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/1-AS.png"; break;
					case "H":
						cardGraphic.src = "./cards/2-AH.png"; break;
					case "C":
						cardGraphic.src = "./cards/3-AC.png"; break;
					case "D":
						cardGraphic.src = "./cards/4-AD.png"; break;
				}
				break;
			case "2":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/5-2S.png"; break;
					case "H":
						cardGraphic.src = "./cards/6-2H.png"; break;
					case "C":
						cardGraphic.src = "./cards/7-2C.png"; break;
					case "D":
						cardGraphic.src = "./cards/8-2D.png"; break;
				}
				break;
			case "3":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/9-3S.png"; break;
					case "H":
						cardGraphic.src = "./cards/10-3H.png"; break;
					case "C":
						cardGraphic.src = "./cards/11-3C.png"; break;
					case "D":
						cardGraphic.src = "./cards/12-3D.png"; break;
				}
				break;
			case "4":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/13-4S.png"; break;
					case "H":
						cardGraphic.src = "./cards/14-4H.png"; break;
					case "C":
						cardGraphic.src = "./cards/15-4C.png"; break;
					case "D":
						cardGraphic.src = "./cards/16-4D.png"; break;
				}
				break;
			case "5":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/17-5S.png"; break;
					case "H":
						cardGraphic.src = "./cards/18-5H.png"; break;
					case "C":
						cardGraphic.src = "./cards/19-5C.png"; break;
					case "D":
						cardGraphic.src = "./cards/20-5D.png"; break;
				}
				break;
			case "6":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/21-6S.png"; break;
					case "H":
						cardGraphic.src = "./cards/22-6H.png"; break;
					case "C":
						cardGraphic.src = "./cards/23-6C.png"; break;
					case "D":
						cardGraphic.src = "./cards/24-6D.png"; break;
				}
				break;
			case "7":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/25-7S.png"; break;
					case "H":
						cardGraphic.src = "./cards/26-7H.png"; break;
					case "C":
						cardGraphic.src = "./cards/27-7C.png"; break;
					case "D":
						cardGraphic.src = "./cards/28-7D.png"; break;
				}
				break;
			case "8":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/29-8S.png"; break;
					case "H":
						cardGraphic.src = "./cards/30-8H.png"; break;
					case "C":
						cardGraphic.src = "./cards/31-8C.png"; break;
					case "D":
						cardGraphic.src = "./cards/32-8D.png"; break;
				}
				break;
			case "9":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/33-9S.png"; break;
					case "H":
						cardGraphic.src = "./cards/34-9H.png"; break;
					case "C":
						cardGraphic.src = "./cards/35-9C.png"; break;
					case "D":
						cardGraphic.src = "./cards/36-9D.png"; break;
				}
				break;
			case "10":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/37-10S.png"; break;
					case "H":
						cardGraphic.src = "./cards/38-10H.png"; break;
					case "C":
						cardGraphic.src = "./cards/39-10C.png"; break;
					case "D":
						cardGraphic.src = "./cards/40-10D.png"; break;
				}
				break;
			case "J":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/41-JS.png"; break;
					case "H":
						cardGraphic.src = "./cards/42-JH.png"; break;
					case "C":
						cardGraphic.src = "./cards/43-JC.png"; break;
					case "D":
						cardGraphic.src = "./cards/44-JD.png"; break;
				}
				break;
			case "Q":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/45-QS.png"; break;
					case "H":
						cardGraphic.src = "./cards/46-QH.png"; break;
					case "C":
						cardGraphic.src = "./cards/47-QC.png"; break;
					case "D":
						cardGraphic.src = "./cards/48-QD.png"; break;
				}
				break;
			case "K":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/49-KS.png"; break;
					case "H":
						cardGraphic.src = "./cards/50-KH.png"; break;
					case "C":
						cardGraphic.src = "./cards/51-KC.png"; break;
					case "D":
						cardGraphic.src = "./cards/52-KD.png"; break;
				}
				break;			
		}
		
		cardFront.appendChild(cardGraphic);
		cardWrapper.appendChild(cardFront);

		cardBackGraphic.src = "./cards/blueback.png";
		cardBack.appendChild(cardBackGraphic);
		cardWrapper.appendChild(cardBack);
		
		cardContainer.appendChild(cardWrapper);
		return cardContainer;
	}
};

/*-----------------------------------------------
*******DECK SECTION********
-----------------------------------------------*/
function Deck() {
	//Vars
	this.cards = new Array();
}

//Methods: createDeck, shuffleDeck, drawCard, numCards, addCard, combineDecks
Deck.prototype = {
	/*-----------------
	  Creates a ordered set of cards.
	  -----------------*/
	createDeck: function() {
		var numbers = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10",
								"J", "Q", "K");
		var suits = new Array("S","H","C","D");
		var numOfCards = numbers.length * suits.length; 
		
		this.cards = new Array(numOfCards);
		for(var i = 0; i < numbers.length; i++) {
			for(var j = 0; j < suits.length; j++) {
				this.cards[i * suits.length + j] = new Card(numbers[i], suits[j]);			
			}
		}
	}, //createDeck
	
	/*-----------------
	  Shuffles the deck.
	  @param - number of times shuffled
	  -----------------*/
	shuffleDeck: function(numOfTimes) {
		var randomCard;
		var temp;
		
		for(var i = 0; i < numOfTimes; i++) {
			for(var j = 0; j < this.cards.length; j++) {
				randomCard = Math.floor(Math.random() * this.cards.length);
				temp = this.cards[j];
				this.cards[j] = this.cards[randomCard];
				this.cards[randomCard] = temp;
			}
		}
	}, //shuffleDeck
	
	/*-----------------
	  Returns the card at the top of the deck.
	  -----------------*/  
	drawCard: function() {
		var card;
	
		if(this.cards.length > 0) {
			card = this.cards.shift();
			return card;
		}
		
		return null;
	}, //drawCard
	
	 /*-----------------
	   Returns the number of cards in the deck.
	   @returns - length of card
	  -----------------*/
	numCards: function() {
		return this.cards.length;
	}, //numCards
	
	 /*-----------------
	   Adds one card into the deck/hand.
	   @param - card to add
	  -----------------*/
	addCard: function(card) {
		this.cards.push(card);
	}, //addCard
	
	 /*-----------------
	   Puts two decks into one deck.
	   @param - deck to combine
	  -----------------*/
	combineDecks: function(deck) {
		this.cards = this.cards.concat(deck.cards);
		deck.cards = new Array();
	} //combineDecks
};
