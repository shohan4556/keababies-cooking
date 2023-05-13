import { PlaySound, tweenToPosition } from "./utils";

export class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: "IntroScene" });
    }

    init() {
        this.anims.create({
            key: 'bird_talking',
            delay: 10,
            frames: [
                { key: 'Kea_1_Mouth_opened', duration: 80 },
                { key: 'Kea_1_Mouth_closed', duration: 100 },
                { key: 'Kea_1_Mouth_opened', duration: 80 },
                { key: 'Kea_1_Mouth_closed', duration: 100 },
                { key: 'Kea_1_Mouth_opened', duration: 120 },
                { key: 'Kea_1_Mouth_closed', duration: 90 },
            ],
            frameRate: 8,
            repeat: 8,
        });
    }

    create() {

        const talkingBird = this.add.sprite(-200, 400, 'Kea_1_Mouth_opened').setScale(0.1);
        talkingBird.setDepth(10);
        talkingBird.play('bird_talking');

        // PlaySound(this, 'bg_music');
        const bgMusic = this.sound.add('bg_music');
        bgMusic.play({ loop: true });
        tweenToPosition(this, talkingBird, 1200, '+=0', 12000);

        this.time.addEvent({
            delay: 800,
            callback: () => {
                bgMusic.stop();
                this.scene.start('GameScene');
            }
        })
    }
}