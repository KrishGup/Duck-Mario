import BaseScene from './BaseScene.js';

class Level1A extends BaseScene {
    constructor() {
        super('Level1A');
    }

    preload() {
        super.preload();
        // Preload assets specific to Level 1A
        this.load.image('house2Interior', 'assets/houseInterior.png');
        this.load.audio('bgmHouse', 'assets/Sounds/housebeat.mp3');
    }

    create() {
        super.create();
        // reframe the camera to be centered 300px up
        this.cameras.main.setDeadzone(400, 300);
        this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
        this.cameras.main.setBounds(0, 0, 800, 600);
        

        // Play background music
        this.bgmHouse = this.sound.add('bgmHouse', { loop: true });
        this.bgmHouse.play();

        // Set up the house interior
        this.houseInterior = this.add.image(400, 300, 'house2Interior');
        this.houseInterior.setDisplaySize(800, 600);
        this.houseInterior.setDepth(0);
        // Move character to depth 1
        this.player.setDepth(1);

        // Add invisible vertical wall to stop player on queue
        this.wall = this.add.rectangle(430, 300, 50, 800, 0x000000);
        this.physics.add.existing(this.wall, true); // true makes it static
        this.physics.add.collider(this.player, this.wall);
        this.wall.setDepth(-31);



        // Start the opening story sequence
        this.opening();
    }

    opening() {
        const storyText = this.add.text(400, 300, 'You have entered the house...', {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5, 0.5);

        this.add.text(400, 350, 'Level 1A', { fontSize: '32px', fill: '#000' });
        this.add.text(400, 400, 'The House', { fontSize: '16px', fill: '#000' });

        super.disablePlayerMovement();

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
        // Add any specific update logic for Level1A here
    }

    reachGoal(player, goal) {
        super.reachGoal(player, goal);
        super.disablePlayerMovement();
        this.bgmHouse.stop();
        // Transition to the next level or scene
        //simple fade to black transition
        this.cameras.main.fade(800, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Level1B');
        });
    }
}

export default Level1A;
