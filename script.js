const images = [
    'images/img1.png', 'images/img2.png', 'images/img3.png', 'images/img4.png',
    'images/img5.png', 'images/img6.png', 'images/img7.png', 'images/img8.png',
    'images/img1.png', 'images/img2.png', 'images/img3.png', 'images/img4.png',
    'images/img5.png', 'images/img6.png', 'images/img7.png', 'images/img8.png'
];


let shuffledImages = [];
let selectedCards = [];
let matchedCards = [];

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    shuffledImages = shuffleArray(images);
    createGameBoard();
}

function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    shuffledImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.image = image;
        card.addEventListener('click', handleCardClick);

        const img = document.createElement('img');
        img.src = image;
        card.appendChild(img);

        gameBoard.appendChild(card);
    });
}

function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    if (selectedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
        clickedCard.classList.remove('hidden');
        clickedCard.classList.add('flipped');
        selectedCards.push(clickedCard);

        if (selectedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = selectedCards;

    if (card1.dataset.image === card2.dataset.image) {
        matchedCards.push(card1, card2);
        selectedCards = [];

        if (matchedCards.length === shuffledImages.length) {
            setTimeout(() => alert('¡Ganaste!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.classList.add('hidden');
            card2.classList.add('hidden');
            selectedCards = [];
        }, 1000);
    }
}
