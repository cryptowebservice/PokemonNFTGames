/*** Who's that Pokemon!

- Get a random Pokemon 1-802 (current max pokemon as of 1/15/2018
- Ask, 'Who's that Pokemon?'
- Display image
- After user answers question, see if it's right or not
- cont from top

***/

var points = 0;
var rounds = 0;
var roundMax = 10;
var gen;
var tabs = document.querySelectorAll('.tabs');
var mTitle = document.querySelector('#menu-title');
var genPick = document.querySelector('#gPick'); // *
var sTitle = document.querySelector('#sTitle'); // *
var oMenu = document.querySelector('#oMenu'); // *
var gDiv = document.querySelector('#game-div'); // *
var pDiv = document.querySelector('#pokemon-found') // *
var body = document.querySelectorAll('body');
var pokemonFound = []
var pokemonStorage = []

function startGame() {
	var startMenu = function() {
		// Hide the 'menu title'
		document.querySelector('#menu-title').style.display = 'none'

		// Show the 'start title'
		document.querySelector('#sTitle').style.display = 'flex'

		// Removes the event listeners
		document.body.removeEventListener('keypress', startMenu);
		document.body.removeEventListener('click', startMenu);
	}

	var btnFunc = function() {
		document.querySelectorAll('html')[0].style.overflow = 'hidden';
		document.querySelectorAll('body')[0].style.overflow = 'hidden';
		document.querySelectorAll('html')[0].style.height = '100%';
		var parent = this.parentElement.getAttribute("id")
		document.querySelector('#' + parent).style.display = 'none'
		sTitle.style.display = 'flex'
	};

	var tabFunc = function() {
		var id = this.getAttribute("id").match(/\d+/)[0];

		// Didn't take too much time to refine this, so it's a very basic if/else right now...
		if (id === '1') {
			sTitle.style.display = 'none'
			genPick.style.display = 'flex'

			var gBox = document.querySelectorAll('.gen-box');
			var test;
			var gameMode = function() {
				// Removes event listeners after use
				for (var i = 0; i < tabs.length; i++) {
					tabs[i].removeEventListener('click', tabFunc);
				}

				for (var gb = 0; gb < gBox.length; gb++) {
					gBox[gb].removeEventListener('click', gameMode);
				}
				test = true;
				var gMode = this.getAttribute("id");
				genPick.style.display = 'none';
				gDiv.style.display = 'unset';
				switch(gMode) {
					case 'gen-1':
						gen = [0, 151]; //151
						whomstThatPokemon();
						break
					case 'gen-2':
						gen = [151, 251];
						whomstThatPokemon();
						break
					case 'gen-3':
						gen = [251, 386];
						whomstThatPokemon();
						break
					case 'gen-4':
						gen = [386, 493];
						whomstThatPokemon();
						break
					case 'gen-5':
						gen = [493, 649];
						whomstThatPokemon();
						break
					case 'gen-6':
						gen = [649, 721];
						whomstThatPokemon();
						break
					case 'all':
						gen = [802];
						whomstThatPokemon();
						break;
					default:
						alert('Error!');
				}
			}


			// Add click event(s) to the gen-box(s)
			for (var gb = 0; gb < gBox.length; gb++) {
				gBox[gb].addEventListener('click', gameMode);
			}

		} else if (id === '2') {
			// Empty that div!
			pDiv.innerHTML = '';
			pDiv.insertAdjacentHTML('beforeend', '<button class="back-btn" id="back-btn-1">Back to menu</button>');
			oMenu.style.display = 'none'
			sTitle.style.display = 'none'
			pDiv.style.display = 'flex'
			document.querySelectorAll('html')[0].style.overflow = 'unset';
			document.querySelectorAll('body')[0].style.overflow = 'unset';
			// Create the grid
			// Get the amount of pokemon found
			var pFound = pokemonStorage.length;

			// How many rows to make
			var rCount = Math.round(pFound / 2)
			var count = 0;
			for (var cGrid = 0; cGrid < rCount; cGrid++) {
					pDiv.insertAdjacentHTML('beforeend', `<div id=${"fRow_" + cGrid} class="row"></div>`);
					// Put (x) box(es) into grid above
					for (var cBox = 0; cBox < 2; cBox++) {
						pDiv.querySelector("#fRow_" + cGrid).insertAdjacentHTML('beforeend', `<div class="pok-box" id=${'gBox-' + count}></div>`);
						count++;
					}
			}

			for (var genPoke = 0; genPoke < pFound; genPoke++) {
				pDiv.querySelector('#gBox-' + genPoke).insertAdjacentHTML('beforeend', `<img class="pokeImage" src=${"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonStorage[genPoke] + ".png"}>`);
			}

			var btns = document.querySelectorAll('.back-btn');
			for (var x = 0; x < btns.length; x++) {
				btns[x].addEventListener('click', btnFunc);
			}

		} else if (id === '3') {
			sTitle.style.display = 'none'
			oMenu.style.display = 'flex'
			// Empty that div!
			oMenu.innerHTML = '';

			/* Add elements to 'oMenu' div */
			oMenu.insertAdjacentHTML('beforeend', '<button class="back-btn">Back to menu</button>');
			oMenu.insertAdjacentHTML('beforeend', '<h3 class="menuHeaders">Search a Pokemon\'s number (i.e, 25)</h3>');
			oMenu.insertAdjacentHTML('beforeend', `<input type="text" id=${'sInput'}>`);
			oMenu.insertAdjacentHTML('beforeend', `<button id=${'sButton'}>Submit</button>`);

			function getPokemon() {
				var pInput = document.querySelector('#sInput').value
				if (pInput === '') {
					alert('Please input name or ID!'); // Remove this annoying alert, for now it's a placeholder
				} else {
					fetch('https://pokeapi.co/api/v2/pokemon/' + pInput + '/')
					  .then(
						function(response) {
						  if (response.status !== 200) {
							console.log('Looks like there was a problem. Status Code: ' +
							  response.status);
							return;
						  }

						  // Examine the text in the response
						  response.json().then(function(data) {
							oMenu.style.display = 'none';
							var pokeDetails = document.querySelector('#pokemon-details').style.display = 'flex'
							// Insert the data into the elements
							document.querySelector('#pokemon-name').innerHTML = data.name
							document.querySelector('#pokedex_image').setAttribute('src', data.sprites.front_default);
							document.querySelector('#pokemon-num').innerHTML = data.id

						  });
						}
					  )
					  .catch(function(err) {
						console.log('Fetch Error :-S', err);
					  });

				}
			};



			sButton.addEventListener("click", getPokemon)



			var btns = document.querySelectorAll('.back-btn');
			for (var x = 0; x < btns.length; x++) {
				btns[x].addEventListener('click', btnFunc);
			}

		} else {
			alert('Error!')
		}

	}


	for (var i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', tabFunc);
	}

	document.body.addEventListener('keypress', startMenu);
	document.body.addEventListener('click', startMenu);
}

function whomstThatPokemon() {
	document.querySelector('#points').innerHTML = points;
	document.querySelector('#rounds').innerHTML = rounds;
	if (rounds === roundMax) {
		//alert('You Won!');
		// Back to the main menu

		//mTitle.style.display = 'flex'
		//gDiv.style.display = 'none'

		mDiv.innerHTML = '';
		mDiv.insertAdjacentHTML('beforeend', `<h2 id=${'endTitle'}>${'You got ' + points + ' out of ' + roundMax + '!'}</h2>`);
		mDiv.insertAdjacentHTML('beforeend', '<button id="mEnd" class="back-btn">Back to menu</button>');
		rounds = 0;
		points = 0;
		/* Please re-do this, I did it mess because I was rushing, but please D.R.Y! */
		var endGame = function() {
			gDiv.style.display = 'none'
			startGame();
		}

		var endBtn = document.querySelector('#mEnd')
		endBtn.addEventListener('click', endGame);

		// Math.floor(Math.random() * (max - min)) + (min + 1); (max = gen)
	} else {
		// Get a random number (1-802)
		var randomNum = function() {
			if (gen.length > 1) {
				randomNumber = Math.floor(Math.random() * (gen[1] - gen[0])) + (gen[0] + 1);
			} else {
				randomNumber = Math.floor(Math.random() * gen) + 1; // 802 (max)
			}
			// If the number has already been picked, re-run function until this === false
			if (pokemonFound.includes(randomNumber) === true) {
				//console.log(`Number picked was ${randomNumber} looking for a new number!`);
				randomNum();
			}

			return randomNumber;
		}

		var rNum = randomNum();
		pokemonFound.push(rNum)

		//Get that Pokemon, pass it the random int
		getThatPokemon(rNum)
	}
}

function getThatPokemon(pokemonCount) {
	fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonCount + '/')
	  .then(
		function(response) {
		  if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
			  response.status);
			return;
		  }

		  // Examine the text in the response
		  response.json().then(function(data) {
			/* What do we need?
				- Pokemon's name
				- Pokemon's image
				- Pokemon's ID (i.e, pokemonCount)
			*/

			var pokemon = {
				'name': data.name.toLowerCase(),
				'image': data.sprites.front_default,
				'id': data.id
			}


			// Main div
			const mDiv = document.querySelector('#mDiv');

			// Empty that div!
			mDiv.innerHTML = '';

			// Create an image tag to put the sprite in
			mDiv.insertAdjacentHTML('afterbegin', `<img id=${'pokemon-image'} src=${pokemon.image} height=${300} width=${300}>`);

			// Add the header 'Who's that Pokemon?'
			mDiv.insertAdjacentHTML('beforeend', `<h3 id=${'mHeader'}>${'Who\'s that Pokemon?'}</h3>`);

			// Add the input to take the answer
			mDiv.insertAdjacentHTML('beforeend', `<div id=${'iDiv'}></div>`);
			const iDiv = document.querySelector('#iDiv');

			iDiv.insertAdjacentHTML('beforeend', `<input type="text" id=${'mInput'}>`);
			iDiv.insertAdjacentHTML('beforeend', `<button id=${'mButton'}>Submit</button>`);

			// Add a click event listener to the button
			const mButton = document.querySelector('#mButton');
			var input = ''

			//var answer = prompt('Who\'s that Pokemon?');

			// Get the inputs value/input
			var getInput = function() {
				mButton.removeEventListener("click", getInput);
				// Push pokemon into holding array
				pokemonFound.push(pokemon);

				input = document.querySelector('#mInput').value;

				if (input.toLowerCase() === pokemon['name']) { // If correct
					points++
					if (pokemonStorage.includes(pokemonCount) !== true) {
						pokemonStorage.push(pokemonCount); // Push the 'correct' pokemon
					}
				}

				rounds++;

				// Update both points & rounds spans
				document.querySelector('#points').innerHTML = points;
				document.querySelector('#rounds').innerHTML = rounds;



				// Reveal the Pokemon
				const pImage = document.querySelector('#pokemon-image');


				var imageA = pImage.animate(
				[
				  {
					filter: 'brightness(0)',
				  },
				  {
					filter: 'brightness(1)',
				  }
				],
				{
					duration: 3000,
					iterations: 1
				}
				);

				var aAnim = function() {
					imageA.pause()
					pImage.style.filter = 'brightness(1)';

					var imageA_2 = pImage.animate(
						[	{ transform: 'rotate(0)'},
							{ transform: 'rotate(-20deg)'},
							{ transform: 'rotate(20deg)'},
							{ transform: 'rotate(-20deg)'},
							{ transform: 'rotate(0)'}
						], {
							duration: 3000,
						}
					);

					mDiv.insertAdjacentHTML('beforeend', `<h3 id=${'sHeader'}>${'It\'s ' + pokemon.name + '!'}</h3>`);
					var header2 = document.querySelector('#sHeader');
					var header_2 = header2.animate(
						[
							{ fontSize: '0px'},
							{ fontSize: '28px'},

						], {
							duration: 500,
						}
					);

				}

				setTimeout(aAnim, 3000);
				setTimeout(whomstThatPokemon, 8000); // until rounds === round max
			}

			// Run the 'getInput' function when clicked
			mButton.addEventListener("click", getInput);

		  });
		}
	  )
	  .catch(function(err) {
		console.log('Fetch Error :-S', err);
	  });
}

startGame();
