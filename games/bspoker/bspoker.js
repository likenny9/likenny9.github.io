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
		var game = new Game(5,3,1, new Deck()); //GAME BOARD
		var competitors = game.createBoard(); //PLAYER, COMPUTERS
		var boardButtons = game.createBoardText(); //PLAYER BUTTONS

		var cardPopupWrapper = competitors[0].createCardSelection();
		boardButtons[0].addEventListener('click', function() {
			competitors[0].showCardSelection(cardPopupWrapper);
		});

		competitors[0].highlightWrapper();
		var submitButton = cardPopupWrapper.querySelector("button");
		var intervalId = 0;
		submitButton.addEventListener("click", function() {
			competitors[0].undoHighlightWrapper();
			intervalID = setInterval( function() {
				game.turn++;
				if(game.turn == 2) {
					competitors[3].highlightWrapper();
					//competitors[0].calledHandWrapper.querySelector
				}
				else if(game.turn == 3) {
					competitors[1].highlightWrapper();
					competitors[3].undoHighlightWrapper();
				}
				else if(game.turn == 4) {
					competitors[2].highlightWrapper();
					competitors[1].undoHighlightWrapper();
				}
				else {
					game.turn = 1;
					competitors[2].undoHighlightWrapper();
					competitors[0].highlightWrapper();
					clearInterval(intervalID);
				}
			}, 1000);

		});
	//});	
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
function Game(numStartCards, numComputers, difficultyLevel, selectedHand) {
	//Vars
	this.numStartCards = numStartCards;
	this.numComputers = numComputers;
	this.difficultyLevel = difficultyLevel;
	this.selectedHand = selectedHand;
	var cardPopupWrapper, mainTextWrapper, calledHandWrapper;
	var player, computer1, computer2, computer3;
	var turn;	
}

//Methods - createBoard, createBoardText, createCardSelection, showCardSelection, hideCardSelection, 
//          selectHandToSubmit, submitHand
Game.prototype = {
	/*-----------------
	  Creates the player and computers on the board.
	  -----------------*/
	createBoard: function() {
		this.turn = 1;
	
		//Creates new shuffled deck of cards.
		var deck = new Deck();
		deck.createDeck();
		deck.shuffleDeck(10);
		
		//Creates new player.
		this.player = new Player(this.numStartCards, this.selectedHand);
		this.player.createPlayer();
		
		//Populates hand and displays it on the screen.
		var cardLeftSpacing = 5;
		var playerHand = new Deck();
		for(var i = 0; i < this.numStartCards; i++) {
			var addedCard = deck.drawCard(); //draws a card from deck
			playerHand.addCard(addedCard); //adds the card to hand
			
			var addedCardWrapper = addedCard.displayCard(); //gets the card div
			addedCardWrapper.style.left = cardLeftSpacing + "px"; //spaces cards appropriately
			this.player.displayHand(addedCardWrapper); //add card to player wrapper
			cardLeftSpacing+=80;
		}		
		this.player.playerHand = playerHand;
		
		//Creates a new computer
		this.computer1 = new Computer(this.difficultyLevel);
		this.computer1.createComputer();
		this.computer1.computerWrapper.className+= " computer1Wrapper";

		cardLeftSpacing = 5;
		var computer1Hand = new Deck();
		for(var i = 0; i < this.numStartCards; i++) {
			var addedCard = deck.drawCard();
			computer1Hand.addCard(addedCard);
			
			var addedCardWrapper = addedCard.displayCard();
			addedCardWrapper.style.left = cardLeftSpacing + "px";
			this.computer1.displayHand(addedCardWrapper);
			cardLeftSpacing+=80;
		}
		this.computer1.computerHand = computer1Hand;
		if(this.numComputers == 1) {
			return new Array(this.player,this.computer1);
		}
		
		if(this.numComputers == 2 || this.numComputers == 3) {
			this.computer2 = new Computer(this.difficultyLevel);
			this.computer2.createComputer();
			this.computer2.computerWrapper.className+= " computer2Wrapper";

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
				this.computer2.displayHand(addedCardWrapper);
				cardTopSpacing+=80;
			}
			this.computer2.computerHand = computer2Hand;
			if(this.numComputers == 2) {
				return new Array(this.player,this.computer1,this.computer2);
			}
		}
		if(this.numComputers == 3) {
			this.computer3 = new Computer(this.difficultyLevel);
			this.computer3.createComputer();
			this.computer3.computerWrapper.className+= " computer3Wrapper";

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
				this.computer3.displayHand(addedCardWrapper);
				cardTopSpacing+=80;
			}
			this.computer3.computerHand = computer3Hand;
			if(this.numComputers == 3) {
				return new Array(this.player,this.computer1,this.computer2,this.computer3);
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
	  Initial creates all text on the board.
	  @returns - HTML buttons for calling hand or BS.
	  -----------------*/
	createBoardText: function() {
		this.mainTextWrapper = document.createElement("div");
		this.mainTextWrapper.className = "mainTextWrapper";	
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
		
		var	bsButton = document.createElement("button");
		bsButton.className = "buttons bsButton";
		bsButton.innerHTML = "Call BS";
		bsButton.style.display = "none";
		mainTextButtonWrapper.appendChild(bsButton);

		this.mainTextWrapper.appendChild(mainTextTitle);
		this.mainTextWrapper.appendChild(mainTextButtonWrapper);
		document.getElementById("gamecontainer").appendChild(this.mainTextWrapper);
		
		this.calledHandWrapper = document.createElement("div");
		this.calledHandWrapper.className = "calledHandWrapper";	
		document.getElementById("gamecontainer").appendChild(this.calledHandWrapper);
		
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
		
		var buttons = new Array(callButton, bsButton);
		return buttons;
	}
};

/*-----------------------------------------------
*******Player SECTION********
-----------------------------------------------*/
function Player(numStartCards, selectedHand) {
	//Vars
	var playerWrapper;
	var playerHand;
	var cardPopupWrapper, mainTextWrapper, calledHandWrapper;
	this.numStartCards = numStartCards;
	this.selectedHand = selectedHand;
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
	},
	
	/*-----------------
	  Highlights the player wrapper during turn.
	  -----------------*/
	highlightWrapper: function() {
		this.playerWrapper.style.background = "#F4851C";
		this.playerWrapper.style.boxShadow = "0px 0px 20px #F4851C";
	},
	
	/*-----------------
	  Removes highlights the player wrapper during turn.
	  -----------------*/
	undoHighlightWrapper: function() {
		this.playerWrapper.style.background = "none";
		this.playerWrapper.style.boxShadow = "none";
	},
	
	/*-----------------
	  Shows the wrapper popup for selecting cards.
	  -----------------*/
	showCardSelection: function() {
		var gameContainerDivs = document.getElementById("gamecontainer").childNodes;
		var cardPopupWrapper = document.getElementsByClassName("cardPopupWrapper")[0];
		
		for(var i = 0; i < gameContainerDivs.length; i++) {
			if(gameContainerDivs[i] == cardPopupWrapper) {
				cardPopupWrapper.style.opacity = 1;
			}
			else if(gameContainerDivs[i].nodeName.toLowerCase() == "div") {
				gameContainerDivs[i].style.opacity = 0.5;
			}
		}

		cardPopupWrapper.style.display = "block";
	},

	/*-----------------
	  Hides the wrapper popup for selecting cards.
	  -----------------*/	
	hideCardSelection: function() {
		var gameContainerDivs = document.getElementById("gamecontainer").childNodes;
		var cardPopupWrapper = document.getElementsByClassName("cardPopupWrapper")[0];
		for(var i = 0; i < gameContainerDivs.length; i++) {
			if(gameContainerDivs[i].nodeName.toLowerCase() == "div") {
				gameContainerDivs[i].style.opacity = 1;
			}
		}
		
		cardPopupWrapper.style.display = "none";
	},
	
	/*-----------------
	  Creates popup for selecting cards.
	  @returns - The wrapper for the popup
	  -----------------*/
	createCardSelection: function() {
		var thisPlayer = this;
		this.cardPopupWrapper = document.createElement("div");
		this.cardPopupWrapper.className = "cardPopupWrapper";
		this.cardPopupWrapper.style.zIndex = 9000;
		this.cardPopupWrapper.style.display = "none";

		var closeButton = document.createElement("span");
		closeButton.className = "closeCardPopupWrapper";
		closeButton.innerHTML = "X";
		
		closeButton.addEventListener('click', function() {
			thisPlayer.hideCardSelection();
		});
		
		var submitButton = document.createElement("button");
		submitButton.className = "submitCardPopupButton";
		submitButton.innerHTML = "Submit Call";
		var cardTopSpacing = 2;
		var cardLeftSpacing = 5;
		var cardSelection = new Deck();
		cardSelection.createDeck();

		for(var i = 0; i < cardSelection.cards.length; i++) {
			(function () { //Closure
				var card = cardSelection.cards[i];
				card.clicked = false; //Adds a click toggle to each card
				var popupCard = cardSelection.cards[i].displayCard();
				popupCard.style.left = cardLeftSpacing + "px";
				popupCard.style.top = cardTopSpacing + "px";
				thisPlayer.cardPopupWrapper.appendChild(popupCard);
				
				cardLeftSpacing+=80;
				if(cardLeftSpacing > 700) {
					cardLeftSpacing = 5;
					cardTopSpacing+= 50;
				}
				popupCard.addEventListener("click", function() {
					thisPlayer.selectHandToSubmit(card, popupCard, submitButton);
				});	
			}())
		}

		submitButton.addEventListener("click", function() {
			thisPlayer.submitHand();
		});
		
		this.cardPopupWrapper.appendChild(closeButton);
		this.cardPopupWrapper.appendChild(submitButton);
		document.getElementById("gamecontainer").appendChild(this.cardPopupWrapper);
		
		return this.cardPopupWrapper;
	},
	

	
	/*-----------------
	  Highlights selected cards and adds them to array.
	  @params - card clicked, wrapper of the card clicked, the submit button
	  -----------------*/
	selectHandToSubmit: function(card, popupCard, submitButton) {
		if(!card.clicked) {
			popupCard.className += " highlightCard";
			card.clicked = true;
		}
		else {
			popupCard.className = popupCard.className.replace(new RegExp("(\\s|^)highlightCard(\\s|$)") , "" );
			card.clicked = false;
		}

		var addCard = true;
		for(var i = 0; i < this.selectedHand.cards.length; i++) { //Checks if card is already in array
			if(this.selectedHand.cards[i].number == card.number && this.selectedHand.cards[i].suit == card.suit) { 
				addCard = false; //if card is in array, don't add
		
				if(!this.selectedHand.cards[i].clicked) { //if card is in array and not clicked
					this.selectedHand.removeCard(card); //remove the card from array
				}
			}
		}

		if((this.selectedHand.cards.length == 0 && addCard) || addCard ) { //length 0 && add so removing doesn't re-add
			this.selectedHand.addCard(card);
		}

		var thisGame = this;
		submitButton.addEventListener("click", function () {
			popupCard.className = popupCard.className.replace(new RegExp("(\\s|^)highlightCard(\\s|$)") , "" );
			card.clicked = false;
		});
	},
	
	/*-----------------
	  Highlights selected cards and adds them to array.
	  @returns - the hand submitted
	  -----------------*/
	submitHand: function() {
		this.calledHandWrapper = document.getElementsByClassName("calledHandWrapper")[0];
		
		this.mainTextWrapper = document.getElementsByClassName("mainTextWrapper")[0];
		this.mainTextWrapper.querySelector("div").querySelector(".callButton").style.display = "none"
		this.mainTextWrapper.querySelector("div").querySelector(".bsButton").style.display = "none";
		this.mainTextWrapper.querySelector("div").querySelector("span").innerHTML = "";
		
		var callText = document.createElement("span");
		callText.className = "turnText";
		callText.innerHTML = "YOUR<br>CALL";
		this.calledHandWrapper.appendChild(callText);
	
		this.selectedHand.cards.sort(function(card1,card2){ return card1.order - card2.order });
		var divTopSpacing = 5;
		var divLeftSpacing = 170;
		for(var i = 0; i < this.selectedHand.cards.length; i++) {
			var img = this.selectedHand.cards[i].displayCard();
			this.calledHandWrapper.appendChild(img);
			img.style.left = divLeftSpacing + "px";
			img.style.top = divTopSpacing + "px";
			divLeftSpacing += 80;
		}
		this.hideCardSelection(this.cardPopupWrapper);
		this.selectedHand = new Deck();
		this.turn = 2;

		//do something
		//not working. X needs to hide, clear array, and highlighting
		//submit does same and analayzes
		//selectedHand = new Array();
		return this.selectedHand;
	},
	
	makeMove: function() {
	
	}
};

/*-----------------------------------------------
*******Computer SECTION********
-----------------------------------------------*/
function Computer(difficultyLevel) {
	//Vars
	var computerWrapper;
	var computerHand;
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
		cardWrapper.classList.toggle("flipCard");
		//classList.toggle("flipCard");
		this.computerWrapper.appendChild(cardWrapper);
	},
	
	/*-----------------
	  Highlights the computer wrapper during turn.
	  -----------------*/
	highlightWrapper: function() {
		this.computerWrapper.style.background = "#F4851C";
		this.computerWrapper.style.boxShadow = "0px 0px 20px #F4851C";
	},
	
	/*-----------------
	  Removes highlights the computer wrapper during turn.
	  -----------------*/
	undoHighlightWrapper: function() {
		this.computerWrapper.style.background = "none";
		this.computerWrapper.style.boxShadow = "none";
	},
	
	
};

/*-----------------------------------------------
*******Rules SECTION********
-----------------------------------------------*/
function Rules(selectedHand, previousHand) {
	//Vars
	this.selectedHand = selectedHand;
	this.previousHand = previousHand;
	var comboRank;
	var rankArray = new Array();
}

//Methods -
Rules.prototype = {
	setComboPriority: function() {
		var numbers = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10",
								"J", "Q", "K");
		var suits = new Array("S","H","C","D");
		var numOfCards = numbers.length * suits.length; 
		
		
		var deck = new Deck();
		deck.createDeck();
		for(var i = 0; i < deck.cards.length; i++) {
			//if(deck.cards[i].order
		}
	},
	
	checkComboValidity: function() {
	
	}
};

/*-----------------------------------------------
*******CARD SECTION********
-----------------------------------------------*/
function Card(number, suit, order) {
	//Vars
	this.number = number;
	this.suit = suit;
	this.order = order;
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
						cardGraphic.src = "./cards/1-AS.png"; this.order = 49; break;
					case "H":
						cardGraphic.src = "./cards/2-AH.png"; this.order = 50; break;
					case "C":
						cardGraphic.src = "./cards/3-AC.png"; this.order = 51; break;
					case "D":
						cardGraphic.src = "./cards/4-AD.png"; this.order = 52; break;
				}
				break;
			case "2":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/5-2S.png"; this.order = 1; break;
					case "H":
						cardGraphic.src = "./cards/6-2H.png"; this.order = 2; break;
					case "C":
						cardGraphic.src = "./cards/7-2C.png"; this.order = 3; break;
					case "D":
						cardGraphic.src = "./cards/8-2D.png"; this.order = 4; break;
				}
				break;
			case "3":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/9-3S.png"; this.order = 5; break;
					case "H":
						cardGraphic.src = "./cards/10-3H.png"; this.order = 6; break;
					case "C":
						cardGraphic.src = "./cards/11-3C.png"; this.order = 7; break;
					case "D":
						cardGraphic.src = "./cards/12-3D.png"; this.order = 8; break;
				}
				break;
			case "4":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/13-4S.png"; this.order = 9; break;
					case "H":
						cardGraphic.src = "./cards/14-4H.png"; this.order = 10; break;
					case "C":
						cardGraphic.src = "./cards/15-4C.png"; this.order = 11; break;
					case "D":
						cardGraphic.src = "./cards/16-4D.png"; this.order = 12; break;
				}
				break;
			case "5":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/17-5S.png"; this.order = 13; break;
					case "H":
						cardGraphic.src = "./cards/18-5H.png"; this.order = 14; break;
					case "C":
						cardGraphic.src = "./cards/19-5C.png"; this.order = 15; break;
					case "D":
						cardGraphic.src = "./cards/20-5D.png"; this.order = 16; break;
				}
				break;
			case "6":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/21-6S.png"; this.order = 17; break;
					case "H":
						cardGraphic.src = "./cards/22-6H.png"; this.order = 18; break;
					case "C":
						cardGraphic.src = "./cards/23-6C.png"; this.order = 19; break;
					case "D":
						cardGraphic.src = "./cards/24-6D.png"; this.order = 20; break;
				}
				break;
			case "7":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/25-7S.png"; this.order = 21; break;
					case "H":
						cardGraphic.src = "./cards/26-7H.png"; this.order = 22; break;
					case "C":
						cardGraphic.src = "./cards/27-7C.png"; this.order = 23; break;
					case "D":
						cardGraphic.src = "./cards/28-7D.png"; this.order = 24; break;
				}
				break;
			case "8":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/29-8S.png"; this.order = 25;break;
					case "H":
						cardGraphic.src = "./cards/30-8H.png"; this.order = 26; break;
					case "C":
						cardGraphic.src = "./cards/31-8C.png"; this.order = 27; break;
					case "D":
						cardGraphic.src = "./cards/32-8D.png"; this.order = 28; break;
				}
				break;
			case "9":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/33-9S.png"; this.order = 29; break;
					case "H":
						cardGraphic.src = "./cards/34-9H.png"; this.order = 30; break;
					case "C":
						cardGraphic.src = "./cards/35-9C.png"; this.order = 31; break;
					case "D":
						cardGraphic.src = "./cards/36-9D.png"; this.order = 32;break;
				}
				break;
			case "10":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/37-10S.png"; this.order = 33; break;
					case "H":
						cardGraphic.src = "./cards/38-10H.png"; this.order = 34; break;
					case "C":
						cardGraphic.src = "./cards/39-10C.png"; this.order = 35; break;
					case "D":
						cardGraphic.src = "./cards/40-10D.png"; this.order = 36; break;
				}
				break;
			case "J":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/41-JS.png"; this.order = 37; break;
					case "H":
						cardGraphic.src = "./cards/42-JH.png"; this.order = 38; break;
					case "C":
						cardGraphic.src = "./cards/43-JC.png"; this.order = 39; break;
					case "D":
						cardGraphic.src = "./cards/44-JD.png"; this.order = 40; break;
				}
				break;
			case "Q":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/45-QS.png"; this.order = 41; break;
					case "H":
						cardGraphic.src = "./cards/46-QH.png"; this.order = 42; break;
					case "C":
						cardGraphic.src = "./cards/47-QC.png"; this.order = 43; break;
					case "D":
						cardGraphic.src = "./cards/48-QD.png"; this.order = 44; break;
				}
				break;
			case "K":
				switch(this.suit) {
					case "S":
						cardGraphic.src = "./cards/49-KS.png"; this.order = 45; break;
					case "H":
						cardGraphic.src = "./cards/50-KH.png"; this.order = 46; break;
					case "C":
						cardGraphic.src = "./cards/51-KC.png"; this.order = 47; break;
					case "D":
						cardGraphic.src = "./cards/52-KD.png"; this.order = 48; break;
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
