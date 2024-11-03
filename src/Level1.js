import BaseScene from './BaseScene.js';

class Level1 extends BaseScene {
    constructor() {
        super('Level1');
    }

    preload() {
        super.preload();

        //bind level 1 specific music
        this.load.audio('bgm', 'assets/Sounds/bg-music-level-1.mp3'); 

        // Preload assets specific to Level 1
        // this.load.image('nest', 'assets/nest.png');
        this.load.image('egg', 'assets/white.png');
        this.load.image('raccoon', 'assets/racoon.png');

        this.load.image('thorns', 'assets/thornbush.png');
    }

    create() {
        super.create();
        // Play background music
        this.bgm = this.sound.add('bgm', { loop: true });
        this.bgm.play();

        // Create a goal specific to Level 
        
        //set up platforms
        this.platform1 = this.add.rectangle(2000, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform1, true); // true makes it static X increments by 750
        this.physics.add.collider(this.player, this.platform1);

        this.platform2 = this.add.rectangle(2750, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform2, true); // true makes it static
        this.physics.add.collider(this.player, this.platform2);

        this.platform3 = this.add.rectangle(4000, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform3, true); // true makes it static
        this.physics.add.collider(this.player, this.platform3);

        this.platform4 = this.add.rectangle(4750, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform4, true); // true makes it static
        this.physics.add.collider(this.player, this.platform4);

        this.platform5 = this.add.rectangle(5500, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform5, true); // true makes it static
        this.physics.add.collider(this.player, this.platform5);

        this.platform6 = this.add.rectangle(6250, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform6, true); // true makes it static
        this.physics.add.collider(this.player, this.platform6);
        // super.graphics.fillStyle(0x00ff0f, 1);
        // super.graphics.fillRectShape(this.platform1);
        
        
        // Start the opening story sequence
        this.opening();
    }

    opening() {
        const storyText = this.add.text(400, 300, 'In the peaceful pond of Waddlewood...', {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5, 0.5);

        this.add.text(800, 300, 'Level 1', { fontSize: '32px', fill: '#000' });
        this.add.text(800, 350, 'The Lost Nest', { fontSize: '16px', fill: '#000' });

        // Create raccoon and egg sprites
        const raccoon = this.add.sprite(900, 465, 'raccoon').setScale(0.5);
        const egg = this.add.sprite(90, 465, 'egg').setScale(0.5);

        super.disablePlayerMovement();
        
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
            super.enablePlayerMovement();
            this.quackSound.play();
        });
    }

    update(time, delta) {
       super.update(time, delta);

    }

    reachGoal(player, goal) {
        super.reachGoal(player, goal);
        super.disablePlayerMovement();
        this.bgm.stop();
        this.scene.start('Level2');
    }
}

export default Level1;