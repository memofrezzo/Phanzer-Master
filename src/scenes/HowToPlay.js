import Phaser from "phaser";
import { EN_US, ES_AR } from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
export default class HowToPlay extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("howToPlay");
  }

  create() {
    const video1 = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'tutorial').setScale(0.85);
    video1.play();
    //hacer un video con la música de alarmaCinemática

    video1.on('complete', () => {
      this.scene.start("Nivel1");
    });
  }
}
