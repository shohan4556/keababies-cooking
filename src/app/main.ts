import 'phaser';
import { BootScene } from './scene/boot-scene';
import { GameScene } from './scene/game-scene';
import { IntroScene } from './scene/IntroScene';


const config = {
    type: Phaser.AUTO,
    backgroundColor: '#FF9E56',
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
        orientation: Phaser.Scale.Orientation.PORTRAIT,
        width: 550,
        height: 900,
        max: {
          width: 600,
          height: 1070,
        },
    },
    physics: {
        default: 'arcade',
        arcade: {
          //  debug: true,
           // gravity: {y : 110}
        }
    },
    scene: [BootScene, IntroScene, GameScene]
};


const game = new Phaser.Game(config);
