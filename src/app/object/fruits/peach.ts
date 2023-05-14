import {
    alphaTween,
    hideObject,
    PlaySound,
    showText,
    StopSound,
    tweenToPosition,
} from "../../scene/utils";
import { HandContainer } from "../handContainer";

export class Peach extends Phaser.GameObjects.Image {
    private handContainer: HandContainer;
    private talkingBubbleText: Phaser.GameObjects.Text;
    private isMixed: boolean;
    private bow: Phaser.GameObjects.Image;
    private fruitsContainer: Phaser.GameObjects.Container;
    private FoodJar_Opened: Phaser.GameObjects.Image;
    private isFirstFruit: boolean;


    private portioning: boolean;
    private isMashing: boolean;
    private isDiceStep1: boolean;
    private isDiceStep2: boolean;

    private diced_container: Phaser.GameObjects.Container;



    constructor(scene: Phaser.Scene, x, y, handContainer: HandContainer, talkingBubbleText: Phaser.GameObjects.Text, firstFruit) {
        super(scene, x, y, "Peach_2");
        this.scene.add.existing(this);
        this.isFirstFruit = firstFruit;
        this.setDepth(12);
        this.setScale(0.15);
        this.setInteractive();
        this.handContainer = handContainer;
        this.talkingBubbleText = talkingBubbleText;

        // slice
        let slice = this.scene.add.image(this.x, this.y + 100, "Peach_Skin").setDepth(12).setScale(-0.15, 0.15).setOrigin(0, .5);
        slice.visible = false;
        // hand container
        this.handContainer.ShowSkinPeeler();
        this.scene.tweens.add({
            targets: this.handContainer,
            y: 620,
            x: this.handContainer.x - 10,
            duration: 800,
            onComplete: () => {
                slice.visible = true;
                //slice tween 
                this.scene.tweens.add({
                    targets: slice,
                    angle: -20,
                    duration: 200,
                    onComplete: () => {
                        hideObject(this.scene, [slice, this], 500, 500)
                        // dice the fruits
                        this.scene.time.addEvent({
                            delay: 600,
                            callback: () => {
                                this.DiceTheFruits();
                            }
                        })
                    }
                })

            }
        })
    }

    private DiceTheFruits(): void {

        // dice step 1
        let pear_3 = this.scene.add.image(this.x, this.y, "Peach_3").setScale(0.15).setDepth(12);
        let pear_4 = this.scene.add.image(this.x, 330, "Peach_4").setScale(0.15).setDepth(12);
        showText(this.scene, this.talkingBubbleText, "Dice the fruit");
        this.handContainer.ShowKnfie();
        this.handContainer.setPosition(this.x + 200, this.y - 100);
        this.isDiceStep1 = true;
        this.scene.tweens.add({
            targets: this.handContainer,
            x: this.x,
            y: 800,
            duration: 1000,
            onComplete: () => {
                // alphaTween(this.scene, pear_3, 0, 500);
                this.handContainer.setPosition(this.x + 100, this.y + 150);
                // this.DiceStep_2();
                pear_3.visible = false;
                this.scene.tweens.add({
                    targets: pear_4,
                    y: this.y + 50,
                    x: pear_3.x,
                    duration: 500,
                    onComplete: () => {
                        this.scene.tweens.add({
                            targets: this.handContainer,
                            x: this.handContainer.x + 40,
                            y: this.handContainer.y - 40,
                            duration: 500,
                            repeat: 0,
                            yoyo: true,
                            onComplete: () => {
                                pear_4.visible = false;
                                // let Diced_Pear = this.scene.add.image(pear_4.x, pear_4.y, "Diced_Apple_and_Pear_Small").setDepth(12).setScale(0.15);
                                this.addDicedContainer();
                                // simmer
                                this.handContainer.visible = false;
                                let soucepan = this.scene.add.image(this.x, this.y + 100, "Soucepan").setDepth(13).setScale(.1).setAlpha(0);
                                alphaTween(this.scene, soucepan, 1, 200, 500);
                                showText(this.scene, this.talkingBubbleText, "Simmer in a saucepen");
                                this.handContainer.setPosition(this.x + 120, this.y - 300);
                                this.handContainer.ShowOnlyHand();

                                this.diced_container.y = 300;
                                this.scene.time.addEvent({
                                    delay: 300,
                                    callback: () => {
                                        this.dicedFruitsAnim();
                                    }
                                })

                                this.scene.time.addEvent({
                                    delay: 2000,
                                    callback: () => {

                                        PlaySound(this.scene, "Simmer_sound");
                                        this.handContainer.visible = false;
                                        let steam = this.scene.add.image(this.x, this.y - 10, "Steam").setDepth(14).setScale(.1).setOrigin(0.5, 1);
                                        // steam tween
                                        this.scene.tweens.add({
                                            targets: steam,
                                            scaleY: 0.15,
                                            duration: 500,
                                            yoyo: true,
                                            repeat: 2,
                                            onComplete: () => {
                                                StopSound();
                                                // hide objects
                                                hideObject(this.scene, [steam, this.diced_container, soucepan], 100);
                                                this.MashTheFruit();
                                            }

                                        })

                                    }

                                })


                            }
                        })
                    }
                })
            }
        })
    }

    private addDicedContainer(): void {
        this.diced_container = this.scene.add.container(this.x, this.y).setDepth(12);

        for (let i = 0; i < 50; i++) {
            let dicedImg = this.scene.add.image(Phaser.Math.FloatBetween(-100, 100), Phaser.Math.FloatBetween(0, 100), "Diced_Peach_Small").setDepth(12).setScale(0.15);;
            dicedImg.angle = Phaser.Math.FloatBetween(-90, 290)
            this.diced_container.add(dicedImg);
        }

    }

    private dicedFruitsAnim() {
        for (let i = 0; i < this.diced_container.length; i++) {
            console.log("diced anim")
            this.scene.tweens.add({
                targets: this.diced_container.getAt(i),
                y: Phaser.Math.FloatBetween(390, 405),
                duration: 200,
                delay: i * 30,
            })
        }
    }


    private MashTheFruit(): void {
        let Diced_Pear = this.scene.add.sprite(this.x, this.y, "Diced_Avocado").setScale(0.15).setDepth(12);
        showText(this.scene, this.talkingBubbleText, "Mash the fruit");
        this.handContainer.setPosition(this.x + 30, this.y - 200);
        this.handContainer.ShowMasher();

        Diced_Pear.play("Peach_Mash_Anim");
        // hand tween
        this.scene.tweens.add({
            targets: this.handContainer,
            y: this.y - 60,
            duration: 600,
            repeat: 1,
            yoyo: true,
            onComplete: () => {
                hideObject(this.scene, [Diced_Pear], 500);
                this.handContainer.visible = false;
                if (this.isFirstFruit) {
                    this.scene.events.emit("clearLevel");
                } else {
                    // mix
                    this.MixTheFruts();
                }
            }


        })
    }

    private MixTheFruts(): void {
        showText(this.scene, this.talkingBubbleText, "Mix them up");
        this.fruitsContainer = this.scene.add.container(this.x, this.y).setDepth(120);
        this.bow = this.scene.add.image(0, 0, "Bow").setDepth(10).setScale(.15);
        let fruit_1 = this.scene.add.image(0, -95, "Apple_and_Pear_Puree_1").setDepth(11).setScale(.12);
        let fruit_2 = this.scene.add.image(-30, -80, "Avocado_Puree_1").setDepth(102).setScale(.1);

        this.fruitsContainer.add([this.bow, fruit_1, fruit_2]);

        this.handContainer.ShowSpoon();
        this.handContainer.setPosition(this.x + 300, this.y - 300);

        this.scene.tweens.add({
            targets: this.handContainer,
            x: this.x + 120,
            y: this.y - 170,
            yoyo: true,
            repeat: 1,
            duration: 500,
            onComplete: () => {
                this.handContainer.visible = false;
                // ready animation for portion
                this.scene.tweens.add({
                    targets: this.fruitsContainer,
                    x: 50,
                    y: this.y - 120,
                    duration: 500,
                    onComplete: () => {

                        fruit_2.visible = false;
                        this.PortionFruits(fruit_1);
                    }
                });

                this.FoodJar_Opened = this.scene.add.image(this.x + 70, this.y + 120, "FoodJar_Opened").setDepth(12).setScale(.13);
            }
        })

        tweenToPosition(this.scene, fruit_1, fruit_1.x - 20, fruit_1.y, 200, true, 4, false);
    }

    private PortionFruits(fruit_1: Phaser.GameObjects.Image): void {
        showText(this.scene, this.talkingBubbleText, "Portion them in Prep Jars");
        this.scene.tweens.add({
            targets: this.fruitsContainer,
            angle: 30,
            duration: 500
        })

        this.scene.tweens.add({
            targets: fruit_1,
            x: fruit_1.x + 80,
            y: fruit_1.y + 20,
            scaleY: .09,
            duration: 300
        })

        let juice = this.scene.add.image(this.x - 20, this.y + 220, "Peach_and_Pear_or_Apple_or_Avocado_Puree_1").setDepth(11).setOrigin(0.5, 1);
        juice.scaleX = 0.06;
        juice.scaleY = 0;
        this.scene.tweens.add({
            targets: juice,
            scaleY: .15,
            duration: 1000,
            onComplete: () => {
                hideObject(this.scene, [juice, fruit_1, this.bow, this.FoodJar_Opened]);
                this.scene.events.emit("clearLevel");
            }
        })

    }
}
