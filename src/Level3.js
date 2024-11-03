import BaseScene from './BaseScene.js';

class Level3 extends BaseScene {
    constructor() {
        super('Level3');
    }

    preload() {
        super.preload();

        // Preload assets specific to Level 3
        this.load.audio('bgm', 'assets/Sounds/bg-music-level-3.mp3');
        this.load.image('thorns', 'assets/thornbush.png');
        this.load.image('egg', 'assets/white.png');
        this.load.image('raccoon', 'assets/racoon.png');
        this.load.image('castle', 'assets/castle/castle.png');
    }

    create() {
        super.create();
        this.background22 = this.add.image(0, 0, 'castle').setOrigin(0, 0);
        this.background22.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        this.background22.setDepth(-2);

        // Play background music
        this.bgm = this.sound.add('bgm', { loop: true });
        this.bgm.play();

        // Add thorns
        this.thorns1 = this.add.image(350, 450, 'thorns').setScale(0.25);
        this.physics.add.existing(this.thorns1, true);
        this.physics.add.collider(this.player, this.thorns1, super.playerHIt, null, this);

        // Set up platforms
        this.platform1 = this.add.rectangle(1500, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform1, true);
        this.physics.add.collider(this.player, this.platform1);
        // Add more platforms
        this.platform2 = this.add.rectangle(2000, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform2, true);
        this.physics.add.collider(this.player, this.platform2);

        this.platform3 = this.add.rectangle(2500, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform3, true);
        this.physics.add.collider(this.player, this.platform3);

        this.platform4 = this.add.rectangle(3000, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform4, true);
        this.physics.add.collider(this.player, this.platform4);

        this.platform5 = this.add.rectangle(3500, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform5, true);
        this.physics.add.collider(this.player, this.platform5);

        this.platform6 = this.add.rectangle(4000, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform6, true);
        this.physics.add.collider(this.player, this.platform6);

        this.platform7 = this.add.rectangle(4500, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform7, true);
        this.physics.add.collider(this.player, this.platform7);

        this.platform8 = this.add.rectangle(5000, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform8, true);
        this.physics.add.collider(this.player, this.platform8);

        this.platform9 = this.add.rectangle(5500, 500, 500, 50, 0x00ff00);
        this.physics.add.existing(this.platform9, true);
        this.physics.add.collider(this.player, this.platform9);

        // Add thorns on platforms
        this.thorns2 = this.add.image(2200, 450, 'thorns').setScale(0.25);
        this.physics.add.existing(this.thorns2, true);
        this.physics.add.collider(this.player, this.thorns2, super.playerHIt, null, this);

        this.thorns3 = this.add.image(2700, 450, 'thorns').setScale(0.25);
        this.physics.add.existing(this.thorns3, true);
        this.physics.add.collider(this.player, this.thorns3, super.playerHIt, null, this);

        this.thorns4 = this.add.image(3200, 450, 'thorns').setScale(0.25);
        this.physics.add.existing(this.thorns4, true);
        this.physics.add.collider(this.player, this.thorns4, super.playerHIt, null, this);

        this.thorns5 = this.add.image(3700, 450, 'thorns').setScale(0.25);
        this.physics.add.existing(this.thorns5, true);
        this.physics.add.collider(this.player, this.thorns5, super.playerHIt, null, this);

        this.thorns6 = this.add.image(4200, 450, 'thorns').setScale(0.25);
        this.physics.add.existing(this.thorns6, true);
        this.physics.add.collider(this.player, this.thorns6, super.playerHIt, null, this);

        this.thorns7 = this.add.image(4700, 450, 'thorns').setScale(0.25);
        this.physics.add.existing(this.thorns7, true);
        this.physics.add.collider(this.player, this.thorns7, super.playerHIt, null, this);

        this.thorns8 = this.add.image(5200, 450, 'thorns').setScale(0.25);
        this.physics.add.existing(this.thorns8, true);
        this.physics.add.collider(this.player, this.thorns8, super.playerHIt, null, this);

        // Add enemies on platforms
        this.addEnemy(2300, 100, 'raccoon', -10);
        this.addEnemy(2800, 100, 'raccoon', -10);
        this.addEnemy(3300, 100, 'raccoon', -10);
        this.addEnemy(3800, 100, 'raccoon', -10);
        this.addEnemy(4300, 100, 'raccoon', -10);
        this.addEnemy(4800, 100, 'raccoon', -10);
        this.addEnemy(5300, 100, 'raccoon', -10);

        this.physics.add.collider(this.enemies, this.platform1);
        this.physics.add.collider(this.enemies, this.platform2);
        this.physics.add.collider(this.enemies, this.platform3);
        this.physics.add.collider(this.enemies, this.platform4);
        this.physics.add.collider(this.enemies, this.platform5);
        this.physics.add.collider(this.enemies, this.platform6);
        this.physics.add.collider(this.enemies, this.platform7);
        this.physics.add.collider(this.enemies, this.platform8);
        this.physics.add.collider(this.enemies, this.platform9);

        // Create a goal specific to Level 3
        this.goal = this.add.rectangle(5500, 450, 50, 50, 0x0000ff);
        this.physics.add.existing(this.goal, true);
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);

        // Add Enemy
        this.addEnemy(1000, 100, 'raccoon', -10);

        this.enemies.children.iterate((enemy) => {
            enemy.body.setSize(enemy.width * 0.6, enemy.height * 0.52);
            enemy.body.setOffset(enemy.width * 0.25, enemy.height * 0.25);
            enemy.setCollideWorldBounds(true);
            enemy.setScale(0.5);
        });

        this.opening();
    }

    opening() {
        const storyText = this.add.text(200, 300, 'The final challenge awaits...', {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5, 0.5);

        this.add.text(400, 300, 'Level 3', { fontSize: '32px', fill: '#000' });
        this.add.text(400, 350, 'The Final Battle', { fontSize: '16px', fill: '#000' });

        const raccoon = this.add.sprite(900, 465, 'raccoon').setScale(0.5);
        const egg = this.add.sprite(90, 465, 'egg').setScale(0.5);

        this.player.body.setVelocityX(0);

        this.tweens.timeline({
            targets: raccoon,
            ease: 'Linear',
            duration: 2000,
            tweens: [
                {
                    x: 200,
                    onComplete: () => {
                        egg.setVisible(false);
                    }
                },
                {
                    x: 900,
                    delay: 500,
                    onComplete: () => {
                        raccoon.destroy();
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
        this.bgm.stop();

        this.add.text(5000, 200, 'Congratulations! You have completed the game!', {
            fontSize: '26px',
            fill: '#fff'
        });
    }
}

export default Level3;