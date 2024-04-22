import io from 'socket.io-client';

export default class SocketHandler {
    constructor(scene) {

        scene.socket = io('http://localhost:3000');

        scene.socket.on('connect', () => {
            console.log('Connected!');
            scene.socket.emit('dealDeck', scene.socket.id);
        });

        scene.socket.on('firstTurn', () => {
            scene.GameHandler.changeTurn();

            if (scene.GameHandler.isMyTurn) {
                scene.endTurnButton.setInteractive();
                scene.endTurnButton.setColor('#36f802');
            }
        })

        scene.socket.on('changeGameState', (gameState) => {
            scene.GameHandler.changeGameState(gameState);
            if (gameState === "Initializing") {
                scene.DeckHandler.dealCard(1000, 1000, "cardBack", "playerCard");
                scene.DeckHandler.dealCard(1000, 80, "cardBack", "opponentCard");
                scene.dealCards.setInteractive();
                scene.dealCards.setColor('#00ffff');

            }
        });

        scene.socket.on('changeTurn', () => {
            scene.GameHandler.changeTurn();

            if (scene.GameHandler.isMyTurn) {
                scene.endTurnButton.setInteractive();
                scene.endTurnButton.setColor('#36f802');
            } else {
                scene.endTurnButton.setColor('#d70808');
            }

        })

        scene.socket.on('dealCards', (socketId, cards) => {
            if (socketId === scene.socket.id) {
                for (let i in cards) {
                    let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 1000, cards[i], "playerCard"));
                }
            } else {
                for (let i in cards) {
                    let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 80, "cardBack", "opponentCard"));
                }
            }
        })

        scene.socket.on('cardPlayed', (cardName, socketId, dropZone) => {
            console.log(dropZone);
            //Show the opponent a card was played
            if (socketId !== scene.socket.id) {
                scene.GameHandler.opponentHand.shift().destroy();
                
                for (let i = 0; i < scene.dropZones.length; i++) {

                    let tempDropZone = scene.dropZones[i];

                    // tempDropZone === dropZone does not work
                    // Whats the Chances two Drop Zones will be on top of eachother
                    if (tempDropZone.name == "opponentCraftZone") {

                        scene.DeckHandler.dealCard((tempDropZone.x - 350) + (tempDropZone.data.values.cards * 50), tempDropZone.y, cardName, "opponentCard");
                        tempDropZone.data.values.cards++;

                    }
                }

            }
        })

        scene.socket.on('setPlayersHP', (socketId, playerHP, opponentHP) => {
            if (socketId === scene.socket.id) {
                scene.GameHandler.changeHP(playerHP, opponentHP);
            }
        })

    }
}