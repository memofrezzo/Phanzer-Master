import Phaser from 'phaser';

export default class WinCinematica extends Phaser.Scene {
  constructor() {
    super({ key: 'winCinematica' });
  }

  init(data)  {
  this.time = data.time
  }

  create() {
    const video1 = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'cinematicaFinal').setScale(0.6);
    video1.play();
    //hacer un video con la música de alarmaCinemática

    video1.on('complete', () => {
      const video2 = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'Creditos').setScale(0.6);
      video2.play();

      video2.on('complete', () => {
        this.scene.start('win', {time: this.time}); // Cambia 'Menu' al nombre de tu escena de menú
      });
    });
  }
}