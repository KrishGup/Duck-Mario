import Level1 from './Level1.js';
import Level2 from './Level2.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#3498db',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [Level1, Level2]
};

const game = new Phaser.Game(config);