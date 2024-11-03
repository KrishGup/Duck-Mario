import BaseScene from './BaseScene.js';

class Level2 extends BaseScene {
    constructor() {
        super('Level2');
    }

    preload() {
        super.preload();

        // Preload assets specific to Level 2
        this.load.audio('bgm', 'assets/Sounds/bg-music-level-2.mp3');
        // this.load.image('nest', 'assets/nest.png');
        this.load.image('egg', 'assets/white.png');
        this.load.image('raccoon', 'assets/racoon.png');
    }
    
    create() {
        super.create();
        this.cameras.main.setBackgroundColor('#3c3c58');

        // Play background music
        this.bgm = this.sound.add('bgm', { loop: true });
        this.bgm.play();

        // Create a goal specific to Level 2
        this.goal = this.add.rectangle(1200, 450, 50, 50, 0x0000ff);
        this.physics.add.existing(this.goal, true);

        // Enable collision detection between player and goal
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);

        this.opening();
    }

    opening() {
        const storyText = this.add.text(100, 300, 'In search of the egg, It left once again...', {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5, 0.5);

        this.add.text(400, 300, 'Level 2', { fontSize: '32px', fill: '#000' });
        this.add.text(400, 350, 'The Fallen Canopy', { fontSize: '16px', fill: '#000' });

        // Create raccoon and egg sprites
        const raccoon = this.add.sprite(900, 465, 'raccoon').setScale(0.5);
        const egg = this.add.sprite(90, 465, 'egg').setScale(0.5);

        this.player.body.setVelocityX(0);
        
        // Story animation: Raccoon approaches the duck, steals the egg, and runs off
        this.tweens.timeline({
            targets: raccoon,
            ease: 'Linear',
            duration: 2000,
            tweens: [
                {
                    x: 200, // Raccoon approaches the duck
                    onComplete: () => {
                        egg.setVisible(false); // Egg is stolen
                    }
                },
                {
                    x: 900, // Raccoon runs off the screen
                    delay: 500,
                    onComplete: () => {
                        raccoon.destroy(); // Raccoon despawns
                        this.enablePlayerMovement();
                    }
                }
            ]
        });
    }

    enablePlayerMovement() {
        this.player.body.setVelocityX(100);
    }

    reachGoal(player, goal) {
        //end the music and start the next level
        this.bgm.stop();
        this.scene.start('Level3');
    }   

}

export default Level2;