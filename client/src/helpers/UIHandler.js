import CraftSpellZoneHandler from './CraftSpellZoneHandler';
import ZoneHandler from './ZoneHandler';

export default class UIHandler {
    constructor(scene) {

        this.playerHandZoneHandler = new ZoneHandler(scene);
        this.playerCraftZoneHandler = new CraftSpellZoneHandler(scene);
        this.playerPlayZoneHandler = new ZoneHandler(scene);

        this.opponentHandZoneHandler = new ZoneHandler(scene);
        this.opponentCraftZoneHandler = new CraftSpellZoneHandler(scene);
        this.opponentPlayZoneHandler = new ZoneHandler(scene);


        this.buildZones = () => {

            let handAreaWidth = 850;
            let handAreaHeight = 125;

            let deckAreaWidth = 80;
            let deckAreaHeight = 125;

            //Player Hand
            scene.playerHandArea = this.playerHandZoneHandler.renderZone(470, 1000);
            scene.playerHandArea.name = "playerHandArea";
            this.playerHandZoneHandler.renderOutline(scene.playerHandArea, "17a057");
            scene.playerDeckArea = scene.add.rectangle(1000, 1000, deckAreaWidth, deckAreaHeight);
            scene.playerDeckArea.setStrokeStyle(3, 0x17a057);

            //Player Craft Spell
            scene.playerCraftZone = this.playerCraftZoneHandler.renderZone(470, 825);
            scene.playerCraftZone.name = "playerCraftZone";
            this.playerCraftZoneHandler.renderOutline(scene.playerCraftZone, "c5a5f3");

            //Player Play Zone
            scene.playerPlayZone = this.playerPlayZoneHandler.renderZone(470, 625);
            scene.playerPlayZone.name = "playerPlayZone";
            this.playerPlayZoneHandler.renderOutline(scene.playerPlayZone, "000000");

            //Opponent Hand
            scene.opponentHandArea = scene.add.rectangle(470, 80, handAreaWidth, handAreaHeight);
            scene.opponentHandArea.setStrokeStyle(4, 0xea4444);
            scene.opponentHandArea.name = "opponentHandArea";
            scene.opponentDeckArea = scene.add.rectangle(1000, 80, deckAreaWidth, deckAreaHeight);
            scene.opponentDeckArea.setStrokeStyle(3, 0xea4444);

            //Opponent Craft Spell
            scene.opponentCraftZone = this.opponentCraftZoneHandler.renderZone(470, 255);
            scene.opponentCraftZone.name = "opponentCraftZone";
            scene.opponentCraftZone.disableInteractive();
            this.opponentCraftZoneHandler.renderOutline(scene.opponentCraftZone, "c5a5f3");

            //Opponent Play Zone
            scene.opponentPlayZone = this.opponentPlayZoneHandler.renderZone(470, 455);
            scene.opponentPlayZone.name = "opponentPlayZone";
            scene.opponentPlayZone.disableInteractive();
            this.opponentPlayZoneHandler.renderOutline(scene.opponentPlayZone, "000000");

        }

        this.buildGameText = () => {
            scene.dealCards = scene.add.text(960, 445, "Deal Cards").setFontSize(14).setFontFamily('Trebuchet MS');
        }

        this.buildHPText = () => {

            if (scene.opponentTextHP != null) {
                scene.opponentTextHP.destroy();
            }
            if (scene.playerTextHP != null) {
                scene.playerTextHP.destroy();
            }

            scene.opponentTextHP = scene.add.text(1275, 480, scene.GameHandler.opponentHP).setFontSize(28).setFontFamily('Trebuchet MS');
            scene.add.text(1250, 500, "Enemy HP").setFontSize(28).setFontFamily('Trebuchet MS');


            scene.playerTextHP = scene.add.text(1275, 560, scene.GameHandler.playerHP).setFontSize(28).setFontFamily('Trebuchet MS');
            scene.add.text(1250, 580, "Player HP").setFontSize(28).setFontFamily('Trebuchet MS');
        }

        this.buildEndTurnText = () => {
            scene.endTurnButton = scene.add.text(1800, 1000, "End Turn").setFontSize(18).setFontFamily('Trebuchet MS');
            scene.endTurnButton.setColor('#d70808');
        }

        this.buildCraftText = () => {
            scene.craftText = scene.add.text(950, 810, "Craft Spell").setFontSize(18).setFontFamily('Trebuchet MS');
            scene.craftText.setColor('#d70808');

            scene.playerCraftSpellPreview = scene.add.rectangle(1100, 825, 80, 125);
            scene.playerCraftSpellPreview.setStrokeStyle(3, 0xc5a5f3);

            scene.opponentCraftSpellPreview = scene.add.rectangle(1100, 255, 80, 125);
            scene.opponentCraftSpellPreview.setStrokeStyle(3, 0xc5a5f3);

        }

        this.buildUI = () => {
            this.buildZones();
            this.buildGameText();
            this.buildHPText();
            this.buildEndTurnText();
            this.buildCraftText();
        }

    }
}