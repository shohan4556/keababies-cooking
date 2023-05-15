export function alphaAndPositionTween(scene, objectToHide, objectToShow, duration) {
  scene.tweens.add({
    targets: objectToHide,
    alpha: 0,
    duration: duration,
    ease: Phaser.Math.Easing.Linear,
  });

  scene.tweens.add({
    targets: objectToShow,
    alpha: 1,
    duration: duration,
    ease: Phaser.Math.Easing.Linear,
  });
}

export function showText(scene, object, text, duration = 250, delay = 0) {
  object.setText(text);
  scene.tweens.add({
    targets: object,
    delay: delay,
    alpha: { from: 0, to: 1 },
    duration: duration,
    ease: Phaser.Math.Easing.Linear,
  });
}

export function hideObject(scene, objectToHide, duration = 250, delay = 0, pos?) {
  scene.tweens.add({
    targets: objectToHide,
    delay: delay,
    alpha: 0,
    duration: duration,
    ease: Phaser.Math.Easing.Linear,
  });
}

export function showObject(scene, objectToShow, duration = 250, delay = 0, pos?) {
  scene.tweens.add({
    targets: objectToShow,
    delay: delay,
    onComplete: () => { },
    alpha: 1,
    duration: duration,
    ease: Phaser.Math.Easing.Linear,
  });
}

export function rotateObject(scene, objectToRotate, angle, x, y, duration = 500) {
  // console.log('rotateObject', y);
  scene.tweens.add({
    targets: objectToRotate,
    angle: angle,
    alpha: 1,
    x: x === undefined ? objectToRotate.x : x,
    y: y === undefined ? objectToRotate.y : y,
    duration: duration,
    ease: Phaser.Math.Easing.Linear,
    onStart: () => { },
  });
}

export function scaleTweens(scene, objectToScale, targetScale = 0.1, duration = 300, isYoyo = false) {
  // objectToScale.setScale(0);
  scene.tweens.add({
    targets: objectToScale,
    scale: targetScale,
    alpha: 1,
    duration: duration,
    yoyo: isYoyo,
    ease: Phaser.Math.Easing.Linear,
    onStart: () => { },
  });
}

export function tweenToPosition(scene, objectToAnimate, x, y, time = 300, isYoyo = false, yoyoDelay = 0, isLooping = false, callback = null) {
  const tween = scene.tweens.add({
    targets: objectToAnimate,
    x: { value: x },
    y: { value: y },
    ease: Phaser.Math.Easing.Linear,
    duration: time,
    yoyo: isYoyo,
    hold: yoyoDelay,
    repeat: isLooping ? -1 : 0,
    alpha: 1,
    onComplete: () => {
      // const parentContainer = objectToAnimate.letterParent;
      // if (parentContainer) {
      //   objectToAnimate.setPosition(0, 0);
      //   parentContainer.add(objectToAnimate);
      // }
      if (callback) callback();
    },
  });

  return tween;
}

export function alphaTween(scene, objectToTween, alpha, duration, delay?) {
  //   console.log('alphaTween', objectToTween);
  scene.tweens.add({
    targets: objectToTween,
    alpha: alpha,
    duration: duration,
    delay: delay,
    ease: Phaser.Math.Easing.Linear,
  });
}

// export function scaleTweens(scene, target, tweenDuration, scaleValue, isRepeat = 0) {
//   scene.tweens.add({
//     targets: target,
//     duration: tweenDuration,
//     scale: scaleValue,
//     repeat: isRepeat,
//     yoyo: true,
//     ease: Phaser.Math.Easing.Sine.InOut,
//   });
// }

export function shuffle(s) {
  var arr = s.split(''); // Convert String to array
  var n = arr.length; // Length of the array

  for (var i = 0; i < n - 1; ++i) {
    var j = getRandomInt(n); // Get random of [0, n-1]

    var temp = arr[i]; // Swap arr[i] and arr[j]
    arr[i] = arr[j];
    arr[j] = temp;
  }

  s = arr.join(''); // Convert Array to string
  return s; // Return shuffled string
}

export function spawnObject(scene, x, y, key, isVisible = true, depth = 10) {
  const sp = scene.add.sprite(x, y, key);
  sp.setDepth(depth);
  sp.setScale(0.1);
  sp.setVisible(isVisible);
  return sp;
}

export function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}

export function randomIntegerBetween(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let currentCookingSound;
export function PlaySound(scene: Phaser.Scene, soundName, isLoop = false) {
  currentCookingSound = scene.sound.add(soundName);
  currentCookingSound.play();
  if (isLoop) {
    currentCookingSound.loop = isLoop;
  }
}

export function StopSound() {
  currentCookingSound.stop();
}

export let option = {
  firstFruitName: "",
  currentFruitName: "",
}

