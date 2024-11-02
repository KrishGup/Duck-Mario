import BaseScene from './BaseScene.js';

class Level2 extends BaseScene {
    constructor() {
        super('Level2');
    }

    create() {
        super.create();

        // Create a goal specific to Level 2
        this.goal = this.add.rectangle(1200, 450, 50, 50, 0x0000ff);
        this.physics.add.existing(this.goal, true);

        // Enable collision detection between player and goal
        this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);
    }
}

export default Level2;