import { Apple } from "../object/fruits/apple";
import { Avocado } from "../object/fruits/Avocado";
import { Peach } from "../object/fruits/peach";
import { Pear } from "../object/fruits/pear";
import { HandContainer } from "../object/handContainer";
import { hideObject, option, showObject, showText, tweenToPosition } from "./utils";

export class GameScene extends Phaser.Scene {
  private cupBoard: Phaser.GameObjects.Image;
  private wall: Phaser.GameObjects.Image;
  private tableWare: Phaser.GameObjects.Image;
  private pottedPlant: Phaser.GameObjects.Image;
  private desk: Phaser.GameObjects.Image;
  private foodJars: Phaser.GameObjects.Image;
  private apple_button: Phaser.GameObjects.Sprite;
  private peach_button: Phaser.GameObjects.Sprite;
  private avocado_button: Phaser.GameObjects.Sprite;
  private pear_button: Phaser.GameObjects.Sprite;

  private talkingBubble: Phaser.GameObjects.Image;
  private talkingBird: Phaser.GameObjects.Sprite;
  private talkingBubbleText: Phaser.GameObjects.Text;
  private talkingBubbleText2: Phaser.GameObjects.Text;

  private fruitList: Phaser.GameObjects.Sprite[];
  private fruits = {};
  private selectedFruit;

  private isLevelDone: boolean;
  private isGameOver: boolean;
  private avocado: Avocado;
  private pear: Pear;
  private apple: Apple;
  private peach: Peach;

  private handContainer: HandContainer;

  private centerX: number;
  private centerY: number;

  private matchedFruit = [];
  private targetFruit = [];
  private firstFruitsSelected: Boolean = false;

  constructor() {
    super({ key: "GameScene" });
  }

  init() {
    this.matchedFruit = [];
    this.targetFruit = [];
    this.isGameOver = false;
    this.createBackground();

    this.fruits = {
      Apple: -1,
      Avocado: -1,
      Peach: -1,
      Pear: -1,
    };
    this.centerX = this.sys.canvas.width / 2;
    this.centerY = this.sys.canvas.height / 2;

    this.anims.create({
      key: "step_01_bird_talking",
      delay: 10,
      frames: [
        { key: "Kea_1_Mouth_opened", duration: 80 },
        { key: "Kea_1_Mouth_closed", duration: 100 },
        { key: "Kea_1_Mouth_opened", duration: 80 },
        { key: "Kea_1_Mouth_closed", duration: 100 },
        { key: "Kea_1_Mouth_opened", duration: 120 },
        { key: "Kea_1_Mouth_closed", duration: 90 },
      ],
      frameRate: 8,
      repeat: 0, 
    });

    this.anims.create({
      key: "Avocado_Mash_Anim",
      delay: 10,
      frames: [
        { key: "Avocado_Puree_1", duration: 80 },
        { key: "Avocado_Puree_2", duration: 100 },
      ],
      frameRate: 8,
      repeat: 3, 
    });

    this.anims.create({
      key: "Pear_Mash_Anim",
      delay: 10,
      frames: [
        { key: "Apple_and_Pear_Puree_1", duration: 80 },
        { key: "Apple_and_Pear_Puree_2", duration: 80 },
        { key: "Apple_and_Pear_Puree_1", duration: 80 },
        { key: "Apple_and_Pear_Puree_2", duration: 80 }
      ],
      frameRate: 8,
      repeat: 2, 
    });

    this.anims.create({
      key: "Peach_Mash_Anim",
      delay: 10,
      frames: [
        { key: "Peach_and_Pear_or_Apple_or_Avocado_Puree_1", duration: 80 },
        { key: "Peach_and_Pear_or_Apple_or_Avocado_Puree_3", duration: 80 },
        { key: "Peach_and_Pear_or_Apple_or_Avocado_Puree_1", duration: 80 },
        { key: "Peach_and_Pear_or_Apple_or_Avocado_Puree_3", duration: 80 }
      ],
      frameRate: 8,
      repeat: 2, 
    });
  }

  create() {
    this.Step_01();

    this.handContainer = new HandContainer(this, this.centerX, this.centerY);
    this.handContainer.visible = false;

    //  this.add.image(this.centerX, this.centerY, "Avocado_3").setDepth(90);

    const gameScene = this.scene.get("GameScene");
    gameScene.events.on(
      "clearLevel",
      () => {
        if (this.firstFruitsSelected) {
          showText(this, this.talkingBubbleText, "Select the second fruit");
        } else {
          console.log("level done 0");

          // this.Step_01();
          this.talkingBird = this.add
            .sprite(260, 580, "Kea_1_Mouth_closed")
            .setScale(0.12).setDepth(100);

          this.talkingBird.play("step_01_bird_talking");
          const talkSfx = this.sound.add('kea_talk');
          talkSfx.play({ loop: false });

          this.isLevelDone = true;
          this.isGameOver = true;

          //? reward logic 
          let matched = 0;
          for (let i = 0; i < this.targetFruit.length; i++) {
            for (let j = 0; j < this.matchedFruit.length; j++) {
              const target = this.targetFruit[i];
              const selected = this.matchedFruit[j];
              if (target === selected) {
                matched += 1
              }
            }
          }

          console.log(matched, this.matchedFruit);
          let reward = 2;
          if (matched == 1) reward = 3;
          if (matched >= 2) reward = 5;

          // this.talkingBubbleText.depth += 1;
          // this.talkingBubbleText2.setVisible(false);
          showText(this, this.talkingBubbleText, `Way to go! \nYou just scored $${reward} \nKeaBabies store credit`);

          this.time.addEvent({
            delay: 4000,
            callback: () => {
              console.log('open url');
              if (matched >= 2) window.open('https://keagifts.typeform.com/to/COuyykWz', '_self');
              if (matched == 1) window.open('https://keagifts.typeform.com/to/gCkAww64', '_self');
              if (matched <= 0) window.open('https://keagifts.typeform.com/to/TPeb8f1z', '_self');
              // this.scene.start("GameScene");
              // this.isLevelDone = false;
            },
          });

          this.HideAllFruits();
          hideObject(this, [this.desk, this.cupBoard]);
          showObject(
            this,
            [
              this.talkingBubbleText,
              this.talkingBubble,
              this.talkingBird,
              this.wall,
              this.tableWare,
              this.pottedPlant,
              this.foodJars,
            ],
            350
          );
          this.cupBoard = this.add.image(200, 580, "Cupboard").setDepth(0);
          this.cupBoard.setScale(0.26);
          this.talkingBird.setDepth(1);
          //showText(this, this.talkingBubbleText, "Pick the first ingredient");
        }

        this.fruitList.forEach((item) => {
          item.setVisible(true);
        });
      },
      this
    );
  }

  private createBackground(): void {
    this.cupBoard = this.add.image(200, 580, "Cupboard");
    this.cupBoard.setScale(0.26);
    this.wall = this.add.image(150, 112, "Window");
    this.wall.setScale(0.1);
    this.tableWare = this.add.image(515, 340, "Tableware").setScale(0.12).setDepth(3);
    this.pottedPlant = this.add.image(270, 316, "PottedPlant").setScale(0.12).setDepth(3);
    this.desk = this.add.image(270, 877, "Desk").setScale(0.128);
    this.desk.setDepth(2);
    this.foodJars = this.add.image(40, 705, "FoodJars").setScale(0.1);
    this.foodJars.setDepth(4);
  }

  private Step_01(): void {
    this.talkingBubble = this.add
      .image(240, 200, "TalkingBubble")
      .setScale(0.11)
      .setAlpha(0).setDepth(10);
    this.talkingBird = this.add
      .sprite(260, 580, "Kea_1_Mouth_closed")
      .setScale(0.12).setDepth(1);

    //? why ?
    const fruits = {
      "avocado and pear": "Avocado & Pear",
      "peach and pear": "Peach & Pear",
      "avocado and peach": "Avocado & Peach",
    };
    const values = Object.values(fruits);
    const prop = values[Math.floor(Math.random() * values.length)].trim();
    this.targetFruit.push(prop.split('&')[0].trim());
    this.targetFruit.push(prop.split('&')[1].trim());

    // console.log('targetFruit', this.targetFruit[0]);
    console.log(this.targetFruit);

    const talkSfx = this.sound.add('kea_talk');
    talkSfx.play({ loop: true });

    // if (!this.isGameOver) {
    this.talkingBubbleText = this.add
      .text(250, 160, `Let's get started! \nPlease make me a \n${prop} Puree`, {
        fontSize: "28px",
        color: "black",
        fontFamily: "Poppins-Regular",
      })
      .setOrigin(0.5)
      .setAlpha(0).setDepth(11);

    // this.talkingBubbleText2 = this.add.text(90, 195, `${prop} Puree`, {
    //   fontSize: "28px",
    //   color: "black",
    //   fontFamily: "Poppins-Bold",
    // }).setAlpha(0);
    // }
    this.talkingBird.on("animationstart", () => {
      showObject(this, [this.talkingBubbleText, this.talkingBubble], 350);
    });

    this.talkingBird.on("animationcomplete-step_01_bird_talking", () => {
      talkSfx.stop();
      hideObject(
        this,
        [
          this.talkingBubbleText,
          this.talkingBubble,
          this.talkingBird,
          this.cupBoard,
          this.wall,
          this.tableWare,
          this.pottedPlant,
          this.foodJars,
        ],
        350
      );
      if (this.isLevelDone) {
        console.log("level done 1");
      } else {
        if (!this.isGameOver) {
          this.Step_02();
        }
      }
    });

    // todo add sound here
    // todo set timeout here
    this.talkingBird.play("step_01_bird_talking");
  }

  private Step_02(): void {
    this.cupBoard = this.add
      .image(200, 600, "Cupboard")
      .setScale(0.26)
      .setAlpha(0)
      .setDepth(2);
    this.desk = this.add
      .image(270, 600, "Desk")
      .setScale(0.24)
      .setDepth(2)
      .setAlpha(0);

    this.talkingBubble = this.add
      .image(260, 30, "TalkingBubble")
      .setScale(0.1)
      .setRotation(9.6)
      .setAlpha(1)
      .setDepth(19);
    this.talkingBubbleText = this.add
      .text(260, 60, "Pick the first ingredient", {
        fontSize: "24px",
        color: "black",
        fontFamily: "Poppins-Regular",
      })
      .setOrigin(0.5)
      .setDepth(20);

    tweenToPosition(this, this.cupBoard, this.cupBoard.x, 160);
    tweenToPosition(this, this.desk, this.desk.x, 600);
    showObject(this, [this.talkingBubble, this.talkingBubbleText], 300);

    this.Step_03();
  }

  private Step_03(): void {
    // spawn fruits objects
    this.apple_button = this.add
      .sprite(150, 450, "Apple_1")
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(2);
    this.apple_button.setName("Apple");
    this.apple_button.setInteractive();
    this.apple_button.on(
      "pointerdown",
      () => {
        this.Step_04(this.apple_button);
      },
      this
    );

    this.avocado_button = this.add
      .sprite(400, 450, "Avocado_1")
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(2);
    this.avocado_button.setName("Avocado");
    this.avocado_button.setInteractive();
    this.avocado_button.on(
      "pointerdown",
      () => {
        this.Step_04(this.avocado_button);
      },
      this
    );

    this.peach_button = this.add
      .sprite(150, 700, "Peach_1")
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(2);
    this.peach_button.setName("Peach");
    this.peach_button.setInteractive();
    this.peach_button.on(
      "pointerdown",
      () => {
        this.peach_button.visible = false;
        this.Step_04(this.peach_button);
      },
      this
    );

    this.pear_button = this.add
      .sprite(400, 700, "Pear_1")
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(2);
    this.pear_button.setName("Pear");
    this.pear_button.setInteractive();
    this.pear_button.on(
      "pointerdown",
      () => {
        this.Step_04(this.pear_button);
      },
      this
    );

    // store all the fruits reference
    this.fruitList = [
      this.apple_button,
      this.avocado_button,
      this.peach_button,
      this.pear_button,
    ];
  }

  private Step_04(selectedFruit: Phaser.GameObjects.Sprite): void {
    this.fruitList.forEach((item) => {
      item.setVisible(false);
    });

    if (this.firstFruitsSelected) {
      option.currentFruitName = selectedFruit.name;
      this.firstFruitsSelected = false;
    } else {
      console.log("First fruits "+selectedFruit.name)
      option.firstFruitName = selectedFruit.name;
      this.firstFruitsSelected = true;
    }

    this.fruitList[selectedFruit.name] = 1;
    this.matchedFruit.push(selectedFruit.name);
    //? selected fruit here 
    console.log("Step_04:Selected Fruit", selectedFruit.name, this.fruitList);
    


    selectedFruit.setPosition(this.cameras.main.centerX, -110);
    this.selectedFruit = selectedFruit;

    if (selectedFruit.name === "Apple") {
      //selectedFruit.setTexture('Apple_Skin').setScale(0.1);
      // selectedFruit.setVisible(true);
      this.handleApple();
    }

    if (selectedFruit.name === "Avocado") {
      selectedFruit.setTexture("Avocado_2").setScale(0.06);
      // selectedFruit.setVisible(true);
      this.handleAvocado();
    }

    if (selectedFruit.name === "Pear") {
      selectedFruit.setTexture("Avocado_2").setScale(0.06);
      // selectedFruit.setVisible(true);
      this.handlePear();
    }

    if (selectedFruit.name === "Peach") {
      // selectedFruit.setTexture('Peach_2').setScale(0.06);
      selectedFruit.setVisible(false);

      this.handlePeach();
    }
  }

  private handlePeach() {
    showText(this, this.talkingBubbleText, "Slice the fruit in half");
    this.peach = new Peach(
      this,
      this.centerX,
      this.centerY + 200,
      this.handContainer,
      this.talkingBubbleText,
      this.firstFruitsSelected
    );
  }

  private handleAvocado() {
    // Avocado_Seed, Avocado_1, Avocado_2, Avocado_3, Avocado_Without_Seed
    console.log("handleAvocado");
    this.avocado = new Avocado(
      this,
      this.centerX,
      this.centerY + 200,
      this.handContainer,
      this.talkingBubbleText,
      this.firstFruitsSelected
    );
    this.avocado.visible = false;
    showText(this, this.talkingBubbleText, "Slice the fruit in half");
    this.handContainer.visible = true;
    this.handContainer.setPosition(this.centerX + 150, this.centerY + 100);
    this.avocado.visible = true;
  }

  private handlePear(): void {
    showText(this, this.talkingBubbleText, "Peel the fruit");
    this.pear = new Pear(
      this,
      this.centerX,
      this.centerY + 200,
      this.handContainer,
      this.talkingBubbleText,
      this.firstFruitsSelected
    );
  }

  private handleApple(): void {
    showText(this, this.talkingBubbleText, "Peel the fruit");
    this.apple = new Apple(
      this,
      this.centerX,
      this.centerY + 200,
      this.handContainer,
      this.talkingBubbleText,
      this.firstFruitsSelected
    );
  }

  update(time: number, delta: number): void { }

  private HideAllFruits() {
    this.fruitList.forEach((element) => {
      element.visible = false;
    });
    hideObject(
      this,
      [
        this.apple_button,
        this.pear_button,
        this.peach_button,
        this.avocado_button,
      ],
      0
    );
  }
}
