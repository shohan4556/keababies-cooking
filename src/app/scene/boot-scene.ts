export class BootScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;
  private loadingText: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "BootScene",
    });
  }

  preload(): void {
    console.log('version 0.01');

    this.load.image('Cupboard', 'assets/Background/Cupboard.png');
    this.load.image('Desk', 'assets/Background/Desk.png');
    this.load.image('FoodJars', 'assets/Background/FoodJars.png');
    this.load.image('PottedPlant', 'assets/Background/PottedPlant.png');
    this.load.image('TalkingBubble', 'assets/Background/TalkingBubble.png');
    this.load.image('Tableware', 'assets/Background/Tableware.png');
    this.load.image('Wall', './assets/Background/Wal.png');
    this.load.image('Window', 'assets/Background/Window.png');
    this.load.image('Kea_1_Mouth_closed', 'assets/Talkingbird/Kea_1_Mouth_closed.png');
    this.load.image('Kea_1_Mouth_opened', 'assets/Talkingbird/Kea_1_Mouth_opened.png');
    this.load.image('Kea_2_Mouth_closed', 'assets/Talkingbird/Kea_2_Mouth_closed.png');
    this.load.image('Kea_2_Mouth_opened', 'assets/Talkingbird/Kea_2_Mouth_opened.png');

    this.load.image('FoodJar_Opened', 'assets/FoodJar/FoodJar_Opened.png');
    this.load.image('FoodJar_Closed', 'assets/FoodJar/FoodJar_Closed.png');

    //fruits

    //Apple
    this.load.image('Apple_Skin', 'assets/Fruits/Apple/Apple_Skin.png');
    this.load.image('Apple_1', 'assets/Fruits/Apple/Apple_1.png');
    this.load.image('Apple_2', 'assets/Fruits/Apple/Apple_2.png');
    this.load.image('Apple_3', 'assets/Fruits/Apple/Apple_3.png');
    this.load.image('Apple_4', 'assets/Fruits/Apple/Apple_4.png');

    //Avocado
    this.load.image('Avocado_Seed', 'assets/Fruits/Avocado/Avocado_Seed.png');
    this.load.image('Avocado_1', 'assets/Fruits/Avocado/Avocado_1.png');
    this.load.image('Avocado_2', 'assets/Fruits/Avocado/Avocado_2.png');
    this.load.image('Avocado_3', 'assets/Fruits/Avocado/Avocado_3.png');
    this.load.image('Avocado_Without_Seed', 'assets/Fruits/Avocado/Avocado_Without_Seed.png');

    //Apple_and_Pear_Puree
    this.load.image('Apple_and_Pear_Puree_1', 'assets/Fruits/Diced_Fruits_and_Puree/Apple_and_Pear_Puree_1.png');
    this.load.image('Apple_and_Pear_Puree_2', 'assets/Fruits/Diced_Fruits_and_Puree/Apple_and_Pear_Puree_2.png');
    this.load.image('Apple_and_Pear_Puree_3', 'assets/Fruits/Diced_Fruits_and_Puree/Apple_and_Pear_Puree_3.png');

    //Avocado_and_Pear_or_Apple_Puree
    this.load.image('Avocado_and_Pear_or_Apple_Puree_1', 'assets/Fruits/Diced_Fruits_and_Puree/Avocado_and_Pear_or_Apple_Puree_1.png');
    this.load.image('Avocado_and_Pear_or_Apple_Puree_2', 'assets/Fruits/Diced_Fruits_and_Puree/Avocado_and_Pear_or_Apple_Puree_2.png');
    this.load.image('Avocado_and_Pear_or_Apple_Puree_3', 'assets/Fruits/Diced_Fruits_and_Puree/Avocado_and_Pear_or_Apple_Puree_3.png');

    //Avocado_Puree
    this.load.image('Avocado_Puree_1', 'assets/Fruits/Diced_Fruits_and_Puree/Avocado_Puree_1.png');
    this.load.image('Avocado_Puree_2', 'assets/Fruits/Diced_Fruits_and_Puree/Avocado_Puree_2.png');

    //Diced_Apple_and_Pear_Large AND Small
    this.load.image('Diced_Apple_and_Pear_Large', 'assets/Fruits/Diced_Fruits_and_Puree/Diced_Apple_and_Pear_Large.png');
    this.load.image('Diced_Apple_and_Pear_Small', 'assets/Fruits/Diced_Fruits_and_Puree/Diced_Apple_and_Pear_Small.png');

    //Diced_Avocado
    this.load.image('Diced_Avocado', 'assets/Fruits/Diced_Fruits_and_Puree/Diced_Avocado.png');

    //Diced_Peach_Large and small
    this.load.image('Diced_Peach_Large', 'assets/Fruits/Diced_Fruits_and_Puree/Diced_Peach_Large.png');
    this.load.image('Diced_Peach_Small', 'assets/Fruits/Diced_Fruits_and_Puree/Diced_Peach_Small.png');

    //Peach_and_Pear_or_Apple_or_Avocado_Puree
    this.load.image('Peach_and_Pear_or_Apple_or_Avocado_Puree_1', 'assets/Fruits/Diced_Fruits_and_Puree/Peach_and_Pear_or_Apple_or_Avocado_Puree_1.png');
    this.load.image('Peach_and_Pear_or_Apple_or_Avocado_Puree_2', 'assets/Fruits/Diced_Fruits_and_Puree/Peach_and_Pear_or_Apple_or_Avocado_Puree_2.png');
    this.load.image('Peach_and_Pear_or_Apple_or_Avocado_Puree_3', 'assets/Fruits/Diced_Fruits_and_Puree/Peach_and_Pear_or_Apple_or_Avocado_Puree_3.png');
    this.load.image('slice', 'assets/slice.png');


    //Peach_Puree
    this.load.image('Peach_Puree_1', 'assets/Fruits/Diced_Fruits_and_Puree/Peach_Puree_1.png');
    this.load.image('Peach_Puree_2', 'assets/Fruits/Diced_Fruits_and_Puree/Peach_Puree_2.png');

    //Peach
    this.load.image('Peach_Skin', 'assets/Fruits/Peach/Peach_Skin.png');
    this.load.image('Peach_1', 'assets/Fruits/Peach/Peach_1.png');
    this.load.image('Peach_2', 'assets/Fruits/Peach/Peach_2.png');
    this.load.image('Peach_3', 'assets/Fruits/Peach/Peach_3.png');
    this.load.image('Peach_4', 'assets/Fruits/Peach/Peach_4.png');

    //Pear
    this.load.image('Pear_Skin', 'assets/Fruits/Pear/Pear_Skin.png');
    this.load.image('Pear_1', 'assets/Fruits/Pear/Pear_1.png');
    this.load.image('Pear_2', 'assets/Fruits/Pear/Pear_2.png');
    this.load.image('Pear_3', 'assets/Fruits/Pear/Pear_3.png');
    this.load.image('Pear_4', 'assets/Fruits/Pear/Pear_4.png');

    // hand
    this.load.image('Kea_Hand', 'assets/Little_Kea_Hand/Little_Kea_Hand.png');

    // Kitchen_Tools
    this.load.image('Bow', 'assets/Kitchen_Tools/Bow.png');
    this.load.image('Knife', 'assets/Kitchen_Tools/Knife.png');
    this.load.image('Masher', 'assets/Kitchen_Tools/Masher.png');
    this.load.image('SkinPeeler', 'assets/Kitchen_Tools/SkinPeeler.png');
    this.load.image('Soucepan', 'assets/Kitchen_Tools/Soucepan.png');
    this.load.image('Spoon', 'assets/Kitchen_Tools/Spoon.png');
    this.load.image('Steam', 'assets/Steam/Steam.png');

    // load audio
    this.load.audio('bg_music', ['assets/music/Background_music.mp3']);
    this.load.audio('game_ui', ['assets/music/Game_UI.mp3']);
    this.load.audio('mix_sound', ['assets/music/Mix_sound.mp3']);
    this.load.audio('pouring_sound', ['assets/music/Pouring_sound.mp3']);
    this.load.audio('remove_seed', ['assets/music/Remove_seed_sound.mp3']);
    this.load.audio('Simmer_sound', ['assets/music/Simmer_sound.mp3']);
    this.load.audio('Mash_sound', ['assets/music/Mash_sound.mp3']);

    this.load.audio('kea_talk', ['assets/sfx/kea.mp3']);
    this.load.audio('chop_pean', ['assets/sfx/chop_peal.mp3']);

    // plugins
    this.load.script('webfont', '../src/assets/plugins/webfont.js');


    this.load.on('complete', this.complete, this);

  }

  create() { }

  complete(): void {
    // console.log('complete', this.scene.systems.plugins);
    // WebFont.load({
    //   google: {
    //     families: ['Poppins', 'Nosifer', 'Poppins-Bold'],
    //   },
    //   custom: {
    //     families: ['Poppins', 'Poppins-Bold'],
    //   },
    // });
    // this.scene.start("IntroScene");
    this.scene.start('GameScene');
  }

}
