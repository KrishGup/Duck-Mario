class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Preload duck character
        this.load.image('duck', 'assets/Iconic Animals (Complete Version)/Cartoon (With Stroke)/spr_cartoon_duck_with_stroke.png');
    }

    create() {
        // Create a simple platform
        this.platform = this.add.rectangle(400, 500, 800, 50, 0x00ff00);
        this.physics.add.existing(this.platform, true); // true makes it static

        // Add the duck character
        this.player = this.add.sprite(0, 315, 'duck');
        this.physics.add.existing(this.player, false);
        this.player.body.setCollideWorldBounds(true);
        
        // this.player = this.add.rectangle(100, 450, 50, 50, 0xff0000);
        // this.physics.add.existing(this.player);
        // this.player.body.setCollideWorldBounds(true);

        // Create a goal
        this.goal = this.add.rectangle(700, 450, 50, 50, 0x0000ff);
        this.physics.add.existing(this.goal, true);

        // Enable collision between player and platform
        this.physics.add.collider(this.player, this.platform);

        // Set up cursor keys for jump and attack
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Enable collision detection between player and goal
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);
    }

    update() {
        // Character moves to the right by default
        this.player.body.setVelocityX(100);

        // Jump logic
        if (this.jumpKey.isDown && this.player.body.touching.down) {
            this.player.body.setVelocityY(-300);
        }

        // Attack logic (for now, just log to console)
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            console.log('Attack!');
        }
    }

    reachGoal(player, goal) {
        console.log('Goal reached!');
        this.scene.restart(); // Restart the scene for simplicity
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: MainScene
};

const game = new Phaser.Game(config);