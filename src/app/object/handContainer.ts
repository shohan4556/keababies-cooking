export class HandContainer extends Phaser.GameObjects.Container {

    private knife: Phaser.GameObjects.Image;
    private skinPeeler: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.setDepth(15);
        this.knife = this.scene.add.image(-50, -50, "Knife").setScale(0.1);
        let hand = this.scene.add.image(0, 0, "Kea_Hand").setScale(0.1);
        this.knife.setDepth(11);

        // this.skinPeeler = this.scene.add.image(-30, 20, "SkinPeeler").setScale(0.1);
        // this.masher.visible = false;

        this.scene.add.existing(this);
        this.add([this.knife, hand])
    }

    public ShowKnfie(): void {
        this.knife.visible = true;
        this.knife.setTexture("Knife");
        this.knife.setPosition(-50, -50);
    }

    public ShowOnlyHand(): void {
        this.knife.visible = false;
        this.visible = true;
    }

    public ShowSpoon(): void {
        this.visible = true;
        this.knife.setTexture("Spoon");
        this.knife.y = this.knife.y + 50;
        this.knife.setScale(.15);
    }

    public ShowMasher(): void {
        this.visible = true;
        this.knife.visible = true;
        this.knife.setTexture("Masher");
        this.knife.setScale(.1);
        this.knife.y = this.knife.y + 40;

    }

    public ShowSkinPeeler(): void {
        // this.knife.visible = false;
        this.knife.setTexture("SkinPeeler");
        this.knife.y = this.knife.y + 50;
        this.knife.setScale(.1);
        this.visible = true;
        this.x = this.x + 100;
    }

    preUpdate() {

    }
}