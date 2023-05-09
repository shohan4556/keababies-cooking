import {
  alphaTween,
  hideObject,
  showText,
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

  constructor(
    scene: Phaser.Scene,
    x,
    y,
    handContainer: HandContainer,
    talkingBubbleText: Phaser.GameObjects.Text,
    firstFruit
  ) {
    super(scene, x, y, "Peach_2");
    this.scene.add.existing(this);
    this.isFirstFruit = firstFruit;
    this.setDepth(13);
    this.setScale(0.15);
    this.setInteractive();
    this.handContainer = handContainer;
    this.talkingBubbleText = talkingBubbleText;
    this.on(
      "pointerdown",
      () => {
        this.disableInteractive();

        // hand container
        this.handContainer.ShowSkinPeeler();
        this.scene.tweens.add({
          targets: this.handContainer,
          y: this.x + 350,
          x: this.handContainer.x,
          duration: 500,
          onComplete: () => {
            this.visible = false;
            // dice the fruits
            this.DiceTheFruits();
          },
        });
      },
      this.scene
    );
  }

  private DiceTheFruits(): void {
    // dice step 1
    let pear_3 = this.scene.add
      .image(this.x, this.y, "Peach_3")
      .setScale(0.15)
      .setDepth(12);
    showText(this.scene, this.talkingBubbleText, "Dice the fruits");
    this.handContainer.ShowKnfie();
    this.handContainer.setPosition(this.x + 200, this.y - 100);
    pear_3.setInteractive();
    pear_3.on("pointerdown", () => {
      pear_3.disableInteractive();
      if(!this.isDiceStep1){
        this.isDiceStep1 = true;
        this.scene.tweens.add({
          targets: this.handContainer,
          x: this.x,
          y: this.y + 200,
          duration: 500,
          onComplete: () => {
            alphaTween(this.scene, pear_3, 0, 500);
            this.handContainer.setPosition(this.x + 100, this.y - 100);
            this.DiceStep_2();
          },
        });
      }
    });
  }

  private DiceStep_2() {
    let pear_4 = this.scene.add
      .image(this.x, this.y + 100, "Peach_4")
      .setScale(0.15)
      .setDepth(12);
    pear_4.setInteractive();
    pear_4.on("pointerdown", () => {
      pear_4.disableInteractive();
      if(!this.isDiceStep2){
        this.isDiceStep2 = true;
        this.DiceStep_3(pear_4);
      }
    });
  }

  private DiceStep_3(pear_4: Phaser.GameObjects.Image) {
    this.scene.tweens.add({
      targets: this.handContainer,
      x: this.x,
      y: this.y + 200,
      duration: 500,
      onComplete: () => {
        pear_4.setTexture("Diced_Avocado");
        alphaTween(this.scene, pear_4, 0, 200, 0);
        //this.Simmer();
        this.MashTheFruit();
      },
    });
  }

  private Simmer(): void {
    let soucepan = this.scene.add
      .image(this.x, this.y + 100, "Soucepan")
      .setDepth(13)
      .setScale(0.1)
      .setAlpha(0);
    alphaTween(this.scene, soucepan, 1, 500, 1000);
    showText(this.scene, this.talkingBubbleText, "Simmer in a saucepen");
    this.handContainer.setPosition(this.x + 100, this.y - 300);
    this.handContainer.ShowOnlyHand();
    let Diced_Pear = this.scene.add
      .image(this.x, this.y - 200, "Diced_Avocado")
      .setScale(0.1)
      .setDepth(12)
      .setAlpha(0);
    alphaTween(this.scene, Diced_Pear, 1, 500, 500);
    Diced_Pear.setInteractive();
    Diced_Pear.on("pointerdown", () => {
      Diced_Pear.disableInteractive();
      this.SimmerStep_1(Diced_Pear, soucepan);
    });
  }

  // simmer step 1
  private SimmerStep_1(
    diced_Pear: Phaser.GameObjects.Image,
    soucepan: Phaser.GameObjects.Image
  ): void {
    // dice pear tween
    this.scene.tweens.add({
      targets: diced_Pear,
      y: this.y + 60,
      duration: 1000,
    });

    // hand container tween
    this.scene.tweens.add({
      targets: this.handContainer,
      y: this.y,
      duration: 1000,
      onComplete: () => {
        this.handContainer.visible = false;
        let steam = this.scene.add
          .image(this.x, this.y - 10, "Steam")
          .setDepth(14)
          .setScale(0.1)
          .setOrigin(0.5, 1);
        // steam tween
        this.scene.tweens.add({
          targets: steam,
          scaleY: 0.15,
          duration: 500,
          yoyo: true,
          repeat: 2,
          onComplete: () => {
            // hide objects
            hideObject(this.scene, [steam, diced_Pear, soucepan], 500);
            this.MashTheFruit();
          },
        });
      },
    });
  }

  private MashTheFruit(): void {
    let Diced_Pear = this.scene.add
      .sprite(this.x, this.y, "Diced_Apple_and_Pear_Large")
      .setScale(0.65)
      .setDepth(12);
    showText(this.scene, this.talkingBubbleText, "Mash the fruit");
    this.handContainer.setPosition(this.x + 30, this.y - 200);
    this.handContainer.ShowMasher();
    Diced_Pear.setInteractive();
    Diced_Pear.on("pointerdown", () => {
      if(!this.isMashing){
        this.isMashing = true;
        Diced_Pear.setScale(0.15);
        Diced_Pear.disableInteractive();
        // mash animation
        Diced_Pear.play("Avocado_Mash_Anim");
        // hand tween
        this.scene.tweens.add({
          targets: this.handContainer,
          y: this.y - 60,
          duration: 500,
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
          },
        });
      }
    });
  }

  private MixTheFruts(): void {
    showText(this.scene, this.talkingBubbleText, "Mix them up");
    this.fruitsContainer = this.scene.add
      .container(this.x, this.y)
      .setDepth(120);
    this.bow = this.scene.add.image(0, 0, "Bow").setDepth(10).setScale(0.15);
    let fruit_1 = this.scene.add
      .image(0, -95, "Apple_and_Pear_Puree_1")
      .setDepth(11)
      .setScale(0.12);
    let fruit_2 = this.scene.add
      .image(-30, -80, "Avocado_Puree_1")
      .setDepth(102)
      .setScale(0.1);

    this.fruitsContainer.add([this.bow, fruit_1, fruit_2]);

    this.handContainer.ShowSpoon();
    this.handContainer.setPosition(this.x + 300, this.y - 300);

    this.bow.setInteractive();
    this.bow.on("pointerdown", () => {
      //this.bow.disableInteractive();
      if (!this.isMixed) {
        this.isMixed = true;
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
              },
            });

            this.FoodJar_Opened = this.scene.add
              .image(this.x + 70, this.y + 120, "FoodJar_Opened")
              .setDepth(12)
              .setScale(0.13);
          },
        });

        tweenToPosition(
          this.scene,
          fruit_1,
          fruit_1.x - 20,
          fruit_1.y,
          200,
          true,
          4,
          false
        );
      }
    });
  }

  private PortionFruits(fruit_1: Phaser.GameObjects.Image): void {
    showText(this.scene, this.talkingBubbleText, "Portion them in Prep Jars");
    this.bow.on("pointerdown", () => {
      this.bow.disableInteractive();
      if(!this.portioning){
        this.portioning = true;
        if (this.isMixed) {
          this.scene.tweens.add({
            targets: this.fruitsContainer,
            angle: 30,
            duration: 500,
          });
  
          this.scene.tweens.add({
            targets: fruit_1,
            x: fruit_1.x + 80,
            y: fruit_1.y + 20,
            scaleY: 0.09,
            duration: 300,
          });
  
          let juice = this.scene.add
            .image(
              this.x - 20,
              this.y + 220,
              "Peach_and_Pear_or_Apple_or_Avocado_Puree_1"
            )
            .setDepth(11)
            .setOrigin(0.5, 1);
          juice.scaleX = 0.06;
          juice.scaleY = 0;
          this.scene.tweens.add({
            targets: juice,
            scaleY: 0.15,
            duration: 1000,
            onComplete: () => {
              hideObject(this.scene, [
                juice,
                fruit_1,
                this.bow,
                this.FoodJar_Opened,
              ]);
              this.scene.events.emit("clearLevel");
            },
          });
        }
      }

    });
  }
}
