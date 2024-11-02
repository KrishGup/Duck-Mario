class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, speed) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = speed;
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        // Set initial velocity
        this.setVelocityX(this.speed);

        // Change direction on world bounds collision
        this.body.world.on('worldbounds', (body) => {
            if (body.gameObject === this) {
                this.setVelocityX(this.speed = -this.speed);
            }
        });
    }

    update() {
        // Additional logic for enemy can go here
    }
}

export default Enemy;