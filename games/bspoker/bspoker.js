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
	//welcome.startButton.addEventListener('click', function() {
	//	welcome.removeWelcome();
		var game = new Game(5,3,1);
		game.createBoard();
		var callButton = game.createBoardText(true);
		var cardPopupWrapper = createCardSelection();
		callButton.addEventListener('click', function() {
			showCardSelection(cardPopupWrapper);
		});
		//document.querySelector(".cardContainer").classList.toggle("flipCard"); //toggles flipping card
	//});	

}

function createCardSelection() {
	var cardPopupWrapper = document.createElement("div");
	cardPopupWrapper.className = "cardPopupWrapper";
	cardPopupWrapper.style.zIndex = 9000;
	cardPopupWrapper.style.display = "none";

	var closeButton = document.createElement("span");
	closeButton.className = "closeCardPopupWrapper";
	closeButton.innerHTML = "X";
	
	closeButton.addEventListener('click', function() {
		hideCardSelection(cardPopupWrapper);
	});
	
	var submitButton = document.createElement("button");
	submitButton.className = "submitCardPopupButton";
	submitButton.innerHTML = "Submit Call";
	
	var cardTopSpacing = 2;
	var cardLeftSpacing = 5;
	var selectedHand = new Deck();
	var cardSelection = new Deck();
	cardSelection.createDeck();

	for(var i = 0; i < cardSelection.cards.length; i++) {
		(function () { //Closure
			var card = cardSelection.cards[i];
			card.clicked = false; //Adds a click toggle to each card
			var popupCard = cardSelection.cards[i].displayCard();
			popupCard.style.left = cardLeftSpacing + "px";
			popupCard.style.top = cardTopSpacing + "px";
			cardPopupWrapper.appendChild(popupCard);
			
			cardLeftSpacing+=80;
			if(cardLeftSpacing > 700) {
				cardLeftSpacing = 5;
				cardTopSpacing+= 50;
			}

			popupCard.addEventListener("click", function() {
				selectHandToSubmit(card, popupCard, selectedHand, cardPopupWrapper, submitButton);
			});	
		}())
	}


	cardPopupWrapper.appendChild(closeButton);
	cardPopupWrapper.appendChild(submitButton);
	document.getElementById("gamecontainer").appendChild(cardPopupWrapper);
	
	return cardPopupWrapper;

}

function showCardSelection(cardPopupWrapper) {
	var gameContainerDivs = document.getElementById("gamecontainer").childNodes;
	for(var i = 0; i < gameContainerDivs.length; i++) {
		if(gameContainerDivs[i] == cardPopupWrapper) {
			cardPopupWrapper.setAttribute("style", "opacity: 1 !important");
		}
		else if(gameContainerDivs[i].nodeName.toLowerCase() == "div") {
			gameContainerDivs[i].setAttribute("style", "opacity: 0.5");
		}
	}

	cardPopupWrapper.style.display = "block";
}

function hideCardSelection(cardPopupWrapper) {
	var gameContainerDivs = document.getElementById("gamecontainer").childNodes;
	for(var i = 0; i < gameContainerDivs.length; i++) {
		if(gameContainerDivs[i].nodeName.toLowerCase() == "div") {
			gameContainerDivs[i].setAttribute("style", "opacity: 1");
		}
	}
	
	cardPopupWrapper.style.display = "none";
}

function selectHandToSubmit(card, popupCard, selectedHand, cardPopupWrapper, submitButton) {
	if(!card.clicked) {
		popupCard.className += " highlightCard";
		card.clicked = true;
	}
	else {
		popupCard.className = popupCard.className.replace(new RegExp("(\\s|^)highlightCard(\\s|$)") , "" );
		card.clicked = false;
	}
	
	var addCard = true;
	for(var i = 0; i < selectedHand.cards.length; i++) { //Checks if card is already in array
		if(selectedHand.cards[i].number == card.number && selectedHand.cards[i].suit == card.suit) { 
			addCard = false; //if card is in array, don't add
	
			if(!selectedHand.cards[i].clicked) { //if card is in array and not clicked
				selectedHand.removeCard(card); //remove the card from array
			}
		}
	}

	if((selectedHand.cards.length == 0 && addCard) || addCard ) { //length 0 && add so removing doesn't re-add
		selectedHand.addCard(card);
	}

	submitButton.addEventListener("click", function () {
		popupCard.className = popupCard.className.replace(new RegExp("(\\s|^)highlightCard(\\s|$)") , "" );
		card.clicked = false;
		submitHand(cardPopupWrapper, selectedHand);
	});
	console.log(selectedHand);
}

function submitHand(cardPopupWrapper, selectedHand) {
	hideCardSelection(cardPopupWrapper);
	//do something
	//not working. X needs to hide, clear array, and highlighting
	//submit does same and analayzes
	//selectedHand = new Array();
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
	/*-----------------
	  Creates the player and computers on the board.
	  -----------------*/
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
		
		//Helper to rotate card for appropriate browser
		function rotateCards(wrapper) {
			wrapper.style.webkitTransform = 'rotate('+90+'deg)'; 
			wrapper.style.mozTransform    = 'rotate('+90+'deg)'; 
			wrapper.style.msTransform     = 'rotate('+90+'deg)'; 
			wrapper.style.oTransform      = 'rotate('+90+'deg)'; 
			wrapper.style.transform       = 'rotate('+90+'deg)'; 
		}
	},
	/*-----------------
	  Displays all text on the board.
	  @params - Boolean for whether it is first turn or not
	  @returns - HTML button for calling hand.
	  -----------------*/
	createBoardText: function(firstTurn) {
		var mainText = document.createElement("div");
		mainText.className = "mainTextWrapper";	
		var mainTextTitle = document.createElement("p");
		mainTextTitle.className = "mainTextTitle";	
		mainTextTitle.innerHTML = "BS Poker";
		var mainTextButtonWrapper = document.createElement("div");
		mainTextButtonWrapper.className = "mainTextButtonWrapper";
		var turnText = document.createElement("span");
		turnText.className = "turnText";
		turnText.innerHTML = "YOUR TURN";
		mainTextButtonWrapper.appendChild(turnText);
		
		var callButton = document.createElement("button");
		callButton.className = "buttons callButton";
		callButton.innerHTML = "Call Hand";
		mainTextButtonWrapper.appendChild(callButton);
		
		if(!firstTurn) {
			var bsButton = document.createElement("button");
			bsButton.className = "buttons bsButton";
			bsButton.innerHTML = "Call BS";
			mainTextButtonWrapper.appendChild(bsButton);
		}

		mainText.appendChild(mainTextTitle);
		mainText.appendChild(mainTextButtonWrapper);
		document.getElementById("gamecontainer").appendChild(mainText);
		
		var calledHandWrapper = document.createElement("div");
		calledHandWrapper.className = "calledHandWrapper";	
		document.getElementById("gamecontainer").appendChild(calledHandWrapper);
		
		var playerText = document.createElement("div");
		playerText.className = "playerWrapper playerText";	
		playerText.innerHTML = "YOU";
		document.getElementById("gamecontainer").appendChild(playerText);
		
		var computer1Text = document.createElement("div");
		computer1Text.className = "computerWrapper computer1Text";	
		computer1Text.innerHTML = "Computer 1";
		document.getElementById("gamecontainer").appendChild(computer1Text);
		
		if(this.numComputers == 2 || this.numComputers == 3) {
			var computer2Text = document.createElement("div");
			computer2Text.className = "computerWrapper computer2Text";	
			computer2Text.innerHTML = "Computer 2";
			document.getElementById("gamecontainer").appendChild(computer2Text);
		}
		
		if(this.numComputers == 3) {
			var computer3Text = document.createElement("div");
			computer3Text.className = "computerWrapper computer3Text";	
			computer3Text.innerHTML = "Computer 3";
			document.getElementById("gamecontainer").appendChild(computer3Text);
		}
		
		return callButton;
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
	}, //combineDecks
	
	/*-----------------
	   Removes card from the deck.
	   @param - card to remove
	  -----------------*/
	removeCard: function(card) {
		this.cards.splice(this.cards.indexOf(card),1);
	}
};
