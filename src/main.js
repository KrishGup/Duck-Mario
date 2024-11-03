import Level1 from './Level1.js';
import Level1A from './Level1A.js';
// import LevelB from './Level1B.js';
import Level2 from './Level2.js';
import Level3 from './Level3.js';

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
    scene: [Level1, Level1A, Level2, Level3],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.NO_CENTER,
    }
};

const game = new Phaser.Game(config);