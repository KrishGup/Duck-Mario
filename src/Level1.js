import BaseScene from './BaseScene.js';

class Level1 extends BaseScene {
    constructor() {
        super('Level1');
    }

    preload() {
        super.preload();

        // Preload assets specific to Level 1
        // this.load.image('nest', 'assets/nest.png');
        this.load.image('egg', 'assets/white.png');
        this.load.image('raccoon', 'assets/racoon.png');
    }

    create() {
        super.create();

        // Create a goal specific to Level 1
        this.goal = this.add.rectangle(700, 450, 50, 50, 0x0000ff);
        this.physics.add.existing(this.goal, true);

        // Enable collision detection between player and goal
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);

        // Start the opening story sequence
        this.opening();
    }

    opening() {
        const storyText = this.add.text(100, 300, 'In the peaceful pond of Waddlewood...', {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5, 0.5);

        this.add.text(400, 300, 'Level 1', { fontSize: '32px', fill: '#000' });
        this.add.text(400, 350, 'The Lost Nest', { fontSize: '16px', fill: '#000' });

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
                        this.startGame(storyText);
                    }
                }
            ]
        });

        
    }

    startGame(storyText) {
        // Set a timer to remove the story text and enable player movement
        storyText.setText('Press SPACE to start');
        this.input.keyboard.once('keydown-SPACE', () => {
            storyText.destroy();
            this.enablePlayerMovement();
            this.quackSound.play();
        });
    }

    enablePlayerMovement() {
        this.player.body.setVelocityX(100);
    }

    disablePlayerMovement() {
        this.player.body.setVelocityX(0);
    }

    update(time, delta) {
       super.update(time, delta);

    }
}

export default Level1;