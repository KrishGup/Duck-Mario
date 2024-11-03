import Enemy from './Enemy.js';
export let gamePad;
window.addEventListener("gamepadconnected", function(e) {
    gamePad = true;
});
// TODO: Implement controller support
class BaseScene extends Phaser.Scene {
    constructor(key) {
        super({ key });
        this.isJumping = false;
    }

    preload() {
        // Preload common assets
        this.load.audio('death', 'assets/Sounds/Death Sounds/Death 2.wav');
        this.load.audio('jump', 'assets/Sounds/jump.wav');
        this.load.audio('quack', 'assets/Sounds/quack.mp3');
        this.load.audio('win', 'assets/Sounds/win-sound.wav');
        this.load.image('soundWave', 'assets/Attack_sprite.png');
        this.load.image('duck', 'assets/Iconic Animals (Complete Version)/Cartoon (With Stroke)/spr_cartoon_duck_with_stroke.png');
        this.load.image('log', 'assets/log.png');
    }

    create() {

        this.enemies = this.add.group();

        // Coyote time variables
        this.coyoteTime = 0;
        this.coyoteTimeDuration = 200; // milliseconds

        //bind jump sound
        this.jumpSound = this.sound.add('jump');
        //bind win sound
        this.winSound = this.sound.add('win');
        this.deathSound = this.sound.add('death');
        // Create a simple platform
        this.platform = this.add.rectangle(30, 500, 2250, 50, 0x00ff00);
        this.physics.add.existing(this.platform, true); // true makes it static

        // Add the duck character
        this.player = this.physics.add.sprite(50, 315, 'duck');
        this.player.setScale(0.5);
        this.physics.add.existing(this.player, false);
        this.player.body.setCollideWorldBounds(true);

        this.player.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === this.player) {
                this.death();
            }
        });

        // Enable collision detection between player and platform
        this.physics.add.collider(this.player, this.platform);

        this.physics.add.collider(this.enemies, this.platform);

        // Adjust the hitbox size and offset
        this.player.body.setSize(this.player.width * 0.6, this.player.height * 0.52);
        this.player.body.setOffset(this.player.width * 0.25, this.player.height * 0.25);

        // Set up cursor keys for jump and attack
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.quackSound = this.sound.add('quack');
        // this.jumpSound = this.sound.add('jump');

        this.goal = this.add.rectangle(5900, 450, 50, 50, 0x0000ff);
        this.physics.add.existing(this.goal, true);

        // Enable collision detection between player and goal
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);


        // Set world bounds
        this.physics.world.setBounds(0, 0, 6000, 600);

        // Set camera bounds
        this.cameras.main.setBounds(0, 0, 6000, 600);

        // Make the camera follow the player horizontally
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setFollowOffset(0, 0); // Adjust the vertical offset if needed
        this.cameras.main.setLerp(0.1, 0); // Smooth follow horizontally, no vertical movement

        // Set camera deadzone to prevent jitter
        this.cameras.main.setDeadzone(this.cameras.main.width * 0.3, this.cameras.main.height);

        this.physics.add.collider(this.player, this.enemies, this.playerHIt, null, this);
    }

    update(time, delta) {
        // Character moves to the right by default
        if (this.player.body.velocity.x !== 0) {
            // Jump logic
            if (this.player.body.touching.down) {
                this.isOnGround = true;
                this.coyoteTime = this.coyoteTimeDuration;
                this.isJumping = false; // Reset jumping flag when on the ground
            } else {
                this.isOnGround = false;
                if (this.coyoteTime > 0) {
                    this.coyoteTime -= delta;
                }
            }
            if(gamePad){
                if ((this.jumpKey.isDown || navigator.getGamepads()[0].buttons[0]['pressed']) && (this.player.body.touching.down || this.coyoteTime > 0)) {
                    this.player.body.setVelocityY(-500);
                    this.coyoteTime = 0; // Reset coyote time after jumping
                    this.jumpSound.play();
                    this.isJumping = true; // Set jumping flag when jump starts
                }
            }else if (this.jumpKey.isDown && (this.player.body.touching.down || this.coyoteTime > 0)) {
                this.player.body.setVelocityY(-500);
                this.coyoteTime = 0; // Reset coyote time after jumping
                this.jumpSound.play();
                this.isJumping = true; // Set jumping flag when jump starts
            }

            // Variable jump height logic
            if (this.isJumping && this.jumpKey.isUp) {
                this.player.body.setVelocityY(this.player.body.velocity.y * 0.5); // Reduce upward velocity when jump key is released
                this.isJumping = false; // Reset jumping flag
            }

            // Attack logic (for now, just log to console)
            if (Phaser.Input.Keyboard.JustDown(this.attackKey) || (gamePad && navigator.getGamepads()[0].buttons[1]['pressed'])) {
                this.quackSound.play();
                console.log('Attack!');
                this.quackAttack();
            }
        }

        this.enemies.children.iterate((enemy) => {
            enemy.update();
        });
    }

    enablePlayerMovement() {
        this.player.body.setVelocityX(200);
    }

    disablePlayerMovement() {
        this.player.body.setVelocityX(0);
    }

    addEnemy(x, y, texture, speed) {
        const enemy = new Enemy(this, x, y, texture, speed);
        this.enemies.add(enemy);
    }

    playerHIt(player, enemy) {
        this.death();
    }

    quackAttack() {

        const soundWave = this.physics.add.sprite(this.player.x + 100, this.player.y, 'soundWave');
        soundWave.setScale(0.5);
        const quackRange = 200;
        this.tweens.add({
            targets: soundWave,
            scaleX: 1,
            scaleY: 1,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                soundWave.destroy();
            }
        });

        this.enemies.children.iterate((enemy) => {
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y) < quackRange) {
                this.killEnemy(enemy);
            }
        });
    }


    killEnemy(enemy) {
        enemy.setTint(0xff0000);
        enemy.body.setVelocity(0, -300);
        enemy.body.setAngularVelocity(360);
        enemy.body.checkCollision.none = true; // Make the enemy untouchable

        this.time.delayedCall(2000, () => {
            enemy.destroy();
        });
    }

    death() {
        this.deathSound.play();
        this.player.setTint(0xff0000);
        this.player.setVelocity(0, -300);
        this.player.setAngularVelocity(360);

        this.time.delayedCall(2000, () => {
            this.scene.restart();
        });

        const deathText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'You Died! Press SPACE to continue', {
            fontSize: '32px',
            fill: '#ff0000'
        }).setOrigin(0.5, 0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            deathText.destroy();
            this.scene.restart();
        });
    }

    reachGoal(player, goal) {
        console.log('Goal reached!');
        this.sound.play('win');
        // Transition to the next level
        //this.scene.start('Level2');
    }
}

export default BaseScene;