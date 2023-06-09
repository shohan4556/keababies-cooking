import { alphaTween, hideObject, option, PlaySound, rotateObject, showText, StopSound, tweenToPosition } from "../../scene/utils";
import { HandContainer } from "../handContainer";

export class Avocado extends Phaser.GameObjects.Image {

    private handContainer: HandContainer;
    private seed: Phaser.GameObjects.Image;
    private talkingBubbleText: Phaser.GameObjects.Text;
    private avocadoWithSeed: Phaser.GameObjects.Sprite;
    private isSeedRemoved: boolean;
    private isFirstFruit: boolean;
    private isMixed: boolean;
    private bow: Phaser.GameObjects.Image;
    private fruitsContainer: Phaser.GameObjects.Container;
    private FoodJar_Opened: Phaser.GameObjects.Image;

    private portioning: boolean;
    private isMashing: boolean;
    private isDiceStep1: boolean;
    private isDiceStep2: boolean;
    private isSlicing: boolean;

     constructor(scene, x, y, handContainer: HandContainer, talkingBubbleText: Phaser.GameObjects.Text, firstFruit){

        super(scene, x, y, "Avocado_2");
        this.scene.add.existing(this);
        this.handContainer = handContainer;
        this.talkingBubbleText = talkingBubbleText;
        this.isFirstFruit = firstFruit;
        this.setDepth(12);
        this.setScale(0.1);
        this.angle = 30;
        this.avocadoWithSeed = this.scene.add.sprite(x + 5, y, "Avocado_3").setDepth(10).setScale(0.1);
        this.avocadoWithSeed.visible = false;
        this.seed = this.scene.add.image(x, y, "Avocado_Seed").setDepth(12).setScale(.15);
        this.seed.visible = false;


            //tweenToPosition(this.scene, handContainer, handContainer.x + 100, handContainer.y + 100);
            this.avocadoWithSeed.visible = true;
            rotateObject(this.scene, this, 10, x - 60, y + 50);
            this.scene.tweens.add({
                targets: handContainer, 
                x: this.x,
                y: this.y + 200,
                duration: 500,
                onComplete: ()=>{
                  //  handContainer.visible = false;
                    hideObject(this.scene, this, 500);

                    this.scene.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            this.avocadoWithSeed.setScale(0.15);
                            showText(this.scene, this.talkingBubbleText, 'Remove the seed');


                            this.scene.tweens.add({
                                targets: this.avocadoWithSeed,
                                x: this.avocadoWithSeed.x,
                                duration: 500,
                                onComplete: ()=>{
                                    this.avocadoWithSeed.setPosition(x, y);
                                    this.avocadoWithSeed.setTexture("Avocado_Without_Seed");
                                    this.seed.visible = true;
                                    handContainer.ShowSpoon();
                                    handContainer.setPosition(this.avocadoWithSeed.x + 260, this.avocadoWithSeed.y - 120);

                                    PlaySound(this.scene, "remove_seed");
                                    handContainer.visible = true;
                                    tweenToPosition(this.scene, this.handContainer, this.avocadoWithSeed.x, this.avocadoWithSeed.y, 1000);
                                    //seed pos change
                                    this.scene.tweens.add({
                                        targets: this.seed,
                                        x: this.seed.x - 200,
                                        y: this.seed.y + 100,
                                        duration: 600,
                                        onComplete:()=>{
                                            StopSound();
                                           //tweenToPosition(this.scene, this.seed, this.seed.x, 300);
                                           this.scene.tweens.add({
                                               targets: this.seed,
                                               y: 300,
                                               duration: 500,
                                               onComplete:()=>{
                                                handContainer.visible = false;
                                                this.isSeedRemoved = true;
                                                this.mashTheFruits();
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

     private mashTheFruits(): void{
        this.avocadoWithSeed.setInteractive();
        showText(this.scene, this.talkingBubbleText, 'Mash the fruit');
        this.avocadoWithSeed.setTexture("Avocado_Puree_1");
        this.handContainer.visible = true;
        this.handContainer.setPosition(this.x + 150, this.y - 250);
        this.handContainer.ShowMasher();

               // tweenToPosition(this.scene, this.handContainer, this.handContainer.x, this.handContainer.y + 100, 100, true, 100, true)
                this.scene.tweens.add({
                    targets: this.handContainer,
                    x: this.handContainer.x,
                    y: this.handContainer.y + 70,
                    yoyo: true,
                    repeat: 3,
                    duration: 200, 
                    onComplete: ()=>{
                        hideObject(this.scene, [this.avocadoWithSeed, this.seed]);
                        this.handContainer.visible = false;
                        this.handContainer.visible = false;
                        if(this.isFirstFruit){
                            this.scene.events.emit("clearLevel");
                        }else{
                           // mix
                           this.MixTheFruts();
                        }
                    }
                })

                this.avocadoWithSeed.play("Avocado_Mash_Anim");
 
        

        
     }

     private MixTheFruts(): void {
        showText(this.scene, this.talkingBubbleText, "Mix them up");
        this.fruitsContainer = this.scene.add.container(this.x, this.y).setDepth(120);
        this.bow = this.scene.add.image(0, 0, "Bow").setDepth(10).setScale(.15);
        let fruit_1 = this.scene.add.image(0, -95, `${option.firstFruitName}_Puree_1`).setDepth(11).setScale(.12);
        let fruit_2 = this.scene.add.image(-30, -80, `${option.currentFruitName}_Puree_1`).setDepth(102).setScale(.1);

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
                    onComplete: ()=>{
                        this.handContainer.visible = false;
                        // ready animation for portion
                        this.scene.tweens.add({
                            targets: this.fruitsContainer,
                            x: 50,
                            y: this.y - 120,
                            duration: 500,
                            onComplete: ()=>{
                              
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
                    onComplete: ()=>{
                        hideObject(this.scene, [juice, fruit_1, this.bow, this.FoodJar_Opened]);
                        this.scene.events.emit("clearLevel");
                    }
                   })

    }


     preUpdate(){
         
     }
}