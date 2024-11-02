class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // No assets to load
    }

    create() {
        // Create a simple platform
        this.platform = this.add.rectangle(400, 500, 800, 50, 0x00ff00);
        this.physics.add.existing(this.platform, true); // true makes it static

        // Create a square character
        this.player = this.add.rectangle(400, 450, 50, 50, 0xff0000);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        // Enable collision between player and platform
        this.physics.add.collider(this.player, this.platform);

        // Set up cursor keys for movement
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Basic movement logic
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(200);
        } else {
            this.player.body.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.setVelocityY(-300);
        }
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