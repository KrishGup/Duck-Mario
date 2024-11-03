import BaseScene from './BaseScene.js';

class Level1A extends BaseScene {
    constructor() {
        super('Level1A');
    }

    preload() {
        super.preload();
        // Preload assets specific to Level 1A
        this.load.image('tree', 'assets/stage1end.png');
        this.load.image('platform', 'assets/Mushroom Forest Background/final 1000x740px/mushroom forest bottom_1000x740px.png');
        this.load.image('well', 'assets/wellwellwell.png');
    }

    create() {
        super.create();
        
        // delete initial platform
        this.platform.destroy();

        // Create initial platform using the platform image
        this.platform = this.physics.add.sprite(500, 600, 'platform');
        this.platform.setDisplaySize(1000, 740); // Set the exact size
        this.platform.body.setAllowGravity(false);
        this.platform.body.setImmovable(true);
        this.physics.add.collider(this.player, this.platform);
        this.platform.setDepth(-1);
        this.platform.body.setOffset(0, 230);

        this.tree = this.add.sprite(500, 300, 'tree');
        this.tree.setDisplaySize(1000, 740);
        this.tree.setDepth(-2);

        this.platform2 = this.physics.add.sprite(1500, 600, 'platform');
        this.platform2.setDisplaySize(1000, 740); // Set the exact size
        this.platform2.body.setAllowGravity(false);
        this.platform2.body.setImmovable(true);
        this.physics.add.collider(this.player, this.platform2);
        this.platform.setDepth(-1);
        this.platform2.body.setOffset(0, 230);

        this.tree2 = this.add.sprite(1500, 300, 'tree');
        this.tree2.setDisplaySize(1000, 740);
        this.tree2.setDepth(-2);

        //Add a well
        this.well = this.physics.add.sprite(1700, 500, 'well');
        this.well.body.setAllowGravity(false);
        this.well.body.setImmovable(true);
        this.well.setScale(0.5);
        this.physics.add.collider(this.player, this.well, () => {
            // Add a delay before transitioning to the next level
            this.time.delayedCall(2000, () => {
                this.reachGoal(this.player, this.well);
            });
        });




        // Start the opening story sequence
        this.opening();
    }

    opening() {
        const storyText = this.add.text(400, 300, 'You have entered the forest...', {
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5, 0.5);

        this.add.text(400, 350, 'Level 1A', { fontSize: '32px', fill: '#000' });
        this.add.text(400, 400, 'The Forest', { fontSize: '16px', fill: '#000' });

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
        // Transition to the next level or scene
        //simple fade to black transition
        this.cameras.main.fade(800, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Level2');
        });
    }
}

export default Level1A;
