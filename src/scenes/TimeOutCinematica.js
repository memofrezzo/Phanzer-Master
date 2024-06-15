import Phaser from 'phaser';

export default class TimeOutCinematica extends Phaser.Scene {
  constructor() {
    super({ key: 'timeOutCinematica' });
  }

  init(data)  {
  this.time = data.time
  }

  create() {
    const video1 = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'cinematicaTimeOut').setScale(0.7);
    video1.play();
    //hacer un video con la música de alarmaCinemática

    video1.on('complete', () => {
        this.scene.start('GameOver', {time: this.time}); // Cambia 'Menu' al nombre de tu escena de menú
        });
  }
}