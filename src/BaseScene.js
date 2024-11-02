class BaseScene extends Phaser.Scene {
    constructor(key) {
        super({ key });
    }

    preload() {
        // Preload common assets
        // this.load.audio('bgm', 'assets/bgm.mp3'); 
        // this.load.audio('jump', 'assets/jump.mp3');
        this.load.audio('quack', 'assets/Sounds/quack.mp3');
        this.load.image('duck', 'assets/Iconic Animals (Complete Version)/Cartoon (With Stroke)/spr_cartoon_duck_with_stroke.png');
    }

    create() {
        // Play background music
        // this.bgm = this.sound.add('bgm', { loop: true });
        // this.bgm.play();

        
        

        // Create a simple platform
        this.platform = this.add.rectangle(3000, 500, 6000, 50, 0x00ff00);
        this.physics.add.existing(this.platform, true); // true makes it static

        // Add the duck character
        this.player = this.add.sprite(50, 315, 'duck');
        this.player.setScale(0.5);
        this.physics.add.existing(this.player, false);
        this.player.body.setCollideWorldBounds(true);

        // Enable collision detection between player and platform
        this.physics.add.collider(this.player, this.platform);


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
    }

    update(time, delta) {
        // Character moves to the right by default
        // this.player.body.setVelocityX(100);

        // Jump logic
        if (this.player.body.velocity.x !== 0) {
            // Jump logic
            if (this.jumpKey.isDown && this.player.body.touching.down) {
                this.player.body.setVelocityY(-300);
                // this.jumpSound.play();
            }
            // Attack logic (for now, just log to console)
            if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
                this.quackSound.play();
                console.log('Attack!');
            }
        }
    }

    reachGoal(player, goal) {
        console.log('Goal reached!');
        // Transition to the next level
        this.scene.start('Level2');
    }
}

export default BaseScene;