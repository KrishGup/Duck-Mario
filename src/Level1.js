import BaseScene from './BaseScene.js';
import { gamePad } from './BaseScene.js';

class Level1 extends BaseScene {
    constructor() {
        super('Level1');
        this.goalReached = false; // Add a flag to track goal reach status
        this.notYetOpened = true; // Add a flag to track if the house has been opened
    }

    preload() {
        super.preload();

        //bind level 1 specific music
        this.load.audio('bgm', 'assets/Sounds/bg-music-level-1.mp3');

        // Preload assets specific to Level 1
        // this.load.image('nest', 'assets/nest.png');
        this.load.image('egg', 'assets/white.png');
        this.load.image('raccoon', 'assets/racoon.png');
        this.load.image('platform', 'assets/Mushroom Forest Background/final 1000x740px/mushroom forest bottom_1000x740px.png');
        this.load.image("background2", "assets/Mushroom Forest Background/final 1000x740px/mushroom forest top_1000x740px.png");
        this.load.image("closedHouse", "assets/houseClosed.png");
        this.load.image("openHouse", "assets/houseOpen.png");
        this.load.image('thorns', 'assets/thornbush.png');
        this.load.image('house2Interior', 'assets/houseInterior.png');
    }

    create() {
        super.create();

        // Play background music
        this.bgm = this.sound.add('bgm', { loop: true });
        this.bgm.play();

        // Create a goal specific to Level 


        
        //set up platforms
        this.platform1 = this.physics.add.sprite(1750, 600, 'platform');
        this.platform1.setDisplaySize(500, 740); // Set the exact size
        this.platform1.body.setAllowGravity(false);
        this.platform1.body.setImmovable(true);
        this.physics.add.collider(this.player, this.platform1);
        this.platform1.setDepth(-1);
        this.platform1.body.setOffset(0, 230);

        this.river = this.add.rectangle(2250, 845, 485, 740, 0x1E90FF); // Updated river color
        this.physics.add.existing(this.river, true); // true makes it static
        this.physics.add.collider(this.player, this.river, () => {
            this.death(); // Call the death method when the player collides with the river
        });

        this.log = this.add.sprite(2250, 480, 'log').setScale(0.3);
        this.physics.add.existing(this.log, false); // true makes it static
        //set log gravity to false
        this.log.body.setAllowGravity(false);
        this.physics.add.collider(this.player, this.log, (player, log) => {
            // Make the log move with the player
            log.body.setVelocityX(200);
            log.body.setAllowGravity(true); // Enable gravity when the player steps on the log
            // Destroy the log after x milliseconds
            this.time.delayedCall(5000, () => {
                log.destroy();
            });
        });

        this.platform2 = this.physics.add.sprite(3000, 600, 'platform');
        this.platform2.setDisplaySize(1000, 740); // Set the exact size
        this.platform2.body.setAllowGravity(false);
        this.platform2.body.setImmovable(true);
        this.physics.add.collider(this.player, this.platform2);
        this.platform2.body.setOffset(0, 230);
        this.platform2.setDepth(-1);

        // this.platform4 = this.physics.add.sprite(4000, 600, 'platform');
        // this.platform4.setDisplaySize(500, 740); // Set the exact size
        // this.platform4.body.setAllowGravity(false);
        // this.platform4.body.setImmovable(true);
        // this.physics.add.collider(this.player, this.platform4);
        // this.platform4.body.setOffset(0,230);
        // this.platform4.setDepth(-1);

        // this.platform5 = this.physics.add.sprite(4750, 600, 'platform');
        // this.platform5.setDisplaySize(500, 740); // Set the exact size
        // this.platform5.body.setAllowGravity(false);
        // this.platform5.body.setImmovable(true);
        // this.physics.add.collider(this.player, this.platform5);
        // this.platform5.body.setOffset(0,230);
        // this.platform5.setDepth(-1);

        // this.platform6 = this.physics.add.sprite(6250, 600, 'platform');
        // this.platform6.setDisplaySize(500, 740); // Set the exact size
        // this.platform6.body.setAllowGravity(false);
        // this.platform6.body.setImmovable(true);
        // this.physics.add.collider(this.player, this.platform6);
        // this.platform6.body.setOffset(0,230);
        // this.platform6.setDepth(-1);

        // this.platform3 = this.add.rectangle(3250, 500, 500, 50, 0x808080);
        // this.physics.add.existing(this.platform3, true); // true makes it static
        // this.physics.add.collider(this.player, this.platform3);


        // Start the opening story sequence
        this.opening();
    }

    opening() {
        this.storyText = this.add.text(400, 300, 'In the peaceful pond of Waddlewood...', {
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
                        this.startGame(this.storyText);
                    }
                }
            ]
        });
    }

    startGame(storyText) {
        this.input.keyboard.once('keydown-SPACE', () => {
            storyText.destroy();
            super.enablePlayerMovement();
            this.quackSound.play();
        });
    }

    update(time, delta) {
        super.update(time, delta);

        // Set a timer to remove the story text and enable player movement
        this.storyText.setText('Press SPACE to start');
        if (gamePad) {
            if (navigator.getGamepads()[0].buttons[1]['pressed']) {
                console.log('Gamepad button 1 pressed');
                this.storyText.destroy();
                super.enablePlayerMovement();
                this.quackSound.play();
            }

            if (this.player.x > 5400 && this.player.x < 5800 && navigator.getGamepads()[0].buttons[0]['pressed']) {
                this.closedHouse.setVisible(false);
                this.openHouse.setVisible(true);
                this.time.delayedCall(2000, () => {
                    this.reachGoal(this.player, this.goal);
                });
            }

            // console log postion of player
            // console.log(this.player.x, this.player.y);
        }

        // if user is at the closed house and presses space, open the house
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.player.x > 5400 && this.player.x < 5800 && this.notYetOpened) {
                this.notYetOpened = false;
                this.closedHouse.setVisible(false);
                this.openHouse.setVisible(true);
                this.time.delayedCall(2000, () => {
                    //Remove the phsyics collision between the player and the closed house
                    this.physics.world.removeCollider(this.physics.add.collider(this.player, this.closedHouse));
                    this.closedHouse.destroy();
                    //Make character move to depth 1
                    this.player.setDepth(-2);
                });
            }
        });
    }
    reachGoal(player, goal) {
        if (this.goalReached) return; // Check if the goal has already been reached
        this.goalReached = true; // Set the flag to true

        super.reachGoal(player, goal);
        super.disablePlayerMovement();
        this.bgm.stop();
        this.scene.start('Level1A');
    }
}

export default Level1;