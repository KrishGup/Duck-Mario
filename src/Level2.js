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
        this.load.image('thorns', 'assets/thornbush.png');
        this.load.image('egg', 'assets/white.png');
        this.load.image('raccoon', 'assets/racoon.png');
    }

    create() {
        super.create();
        this.cameras.main.setBackgroundColor('#3c3c58');

        // Play background music
        this.bgm = this.sound.add('bgm', { loop: true });
        this.bgm.play();

        // Add thorns
        this.thorns1 = this.add.image(300, 450, 'thorns').setScale(0.25);
        this.thorns2 = this.add.image(850, 450, 'thorns').setScale(0.25);
        this.thorns3 = this.add.image(1400, 450, 'thorns').setScale(0.25);
        this.thorns4 = this.add.image(2900, 450, 'thorns').setScale(0.25);
        this.thorns5 = this.add.image(3400, 450, 'thorns').setScale(0.25);

        this.physics.add.existing(this.thorns1, true);
        this.physics.add.existing(this.thorns2, true);
        this.physics.add.existing(this.thorns3, true);
        this.physics.add.existing(this.thorns4, true);
        this.physics.add.existing(this.thorns5, true);

        // Enable collision detection between player and thorns
        this.physics.add.collider(this.player, this.thorns1, super.playerHIt, null, this);
        this.physics.add.collider(this.player, this.thorns2, super.playerHIt, null, this);
        this.physics.add.collider(this.player, this.thorns3, super.playerHIt, null, this);
        this.physics.add.collider(this.player, this.thorns4, super.playerHIt, null, this);
        this.physics.add.collider(this.player, this.thorns5, super.playerHIt, null, this);


        //set up platforms
        this.platform1 = this.add.rectangle(1500, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform1, true); // true makes it static X increments by 750
        this.physics.add.collider(this.player, this.platform1);

        this.platform2 = this.add.rectangle(2400, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform2, true); // true makes it static
        this.physics.add.collider(this.player, this.platform2);

        this.platform3 = this.add.rectangle(2800, 500, 250, 50, 0x00ff00);
        this.physics.add.existing(this.platform3, true); // true makes it static
        this.physics.add.collider(this.player, this.platform3);

        this.platform4 = this.add.rectangle(3250, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform4, true); // true makes it static
        this.physics.add.collider(this.player, this.platform4);

        this.platform5 = this.add.rectangle(4250, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform5, true); // true makes it static
        this.physics.add.collider(this.player, this.platform5);

        this.platform6 = this.add.rectangle(4750, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform6, true); // true makes it static
        this.physics.add.collider(this.player, this.platform6);

        this.platform7 = this.add.rectangle(5250, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform7, true); // true makes it static
        this.physics.add.collider(this.player, this.platform7);

        this.log = this.add.sprite(3650, 480, 'log').setScale(0.3);
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

        // Create a goal specific to Level 2
        this.goal = this.add.rectangle(5500, 450, 50, 50, 0x0000ff);
        this.physics.add.existing(this.goal, true);

        // Enable collision detection between player and goal
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);

        this.opening();

        // Add Enemy
        // this.addEnemy(1000, 100, 'raccoon', -10);

        // this.enemies.children.iterate((enemy) => {
        //     enemy.body.setSize(enemy.width * 0.6, enemy.height * 0.52);
        //     enemy.body.setOffset(enemy.width * 0.25, enemy.height * 0.25);
        //     enemy.setCollideWorldBounds(true);
        //     enemy.setScale(0.5);
        // });
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
                        super.enablePlayerMovement();
                    }
                }
            ]
        });
    }

    update(time, delta) {
        super.update(time, delta);

    }

    reachGoal(player, goal) {
        super.reachGoal(player, goal);
        super.disablePlayerMovement();
        //end the music and start the next level
        this.bgm.stop();
        this.scene.start('Level3');
    }

}

export default Level2;