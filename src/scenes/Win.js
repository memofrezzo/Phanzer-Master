import Phaser from "phaser";
import { EN_US, ES_AR } from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
export default class Win extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  firebase;
  constructor() {
    super("win");
    const { GoBack, TiempoRestante } = keys.Win;
    this.tiempoRestante = TiempoRestante;
    this.volverAlMenuPrincipal = GoBack;
  }

  init(data) {
    const time = data.time;
    const user = this.firebase.getUser();
    this.firebase.saveGameData(user.uid, {
      name: user.displayName || user.uid,
      time: time,
      createdAt: new Date(),
    });
  }
  
    create() {
    const fondoGameOver = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'gameOver');
    fondoGameOver.setScale(this.cameras.main.width / fondoGameOver.width, this.cameras.main.height / fondoGameOver.height)
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Mensaje de Game Over
    this.puntajes = this.add.text(centerX, centerY - 190, getPhrase(this.tiempoRestante), {
      fontFamily: "Amatic SC, cursive",
        fontSize: "48px",
        color: "#fce5cd",
    });
    this.puntajes.setOrigin(0.5);
    
    // Botón de Volver al Menú Principal
    this.botonVolverMenu = this.add.text(centerX, centerY + 200, getPhrase(this.volverAlMenuPrincipal), {
      fontFamily: "Amatic SC, cursive",
        fontSize: "24px",
        color: "#fce5cd",
    });
    this.botonVolverMenu.setOrigin(0.5);

    // Agranda el texto cuando el mouse se acerca al botón
    this.botonVolverMenu.on('pointerover', () => {
      this.botonVolverMenu.setScale(1.2); // Escala el texto al 120%
    });

    // Achica el texto cuando el mouse se aleja del botón
    this.botonVolverMenu.on('pointerout', () => {
      this.botonVolverMenu.setScale(1); // Restaura la escala original
    });

    this.botonVolverMenu.setInteractive(); // Habilita la interacción con el botón
    this.botonVolverMenu.on('pointerdown', () => {
      this.scene.start('menu');
    });
    let scrollY = 250;
    // agregar los 10 mejores highscore
    this.firebase.getHighScores().then((scores) => {
      console.log(scores);
      scores.forEach((doc) => {
        this.add
          .text(400, scrollY, `${doc.name} - ${doc.time}`, {
            fontFamily: "Amatic SC, cursive",
            fontSize: 24,
            color: "#fce5cd",
          })
          .setOrigin(0.5);
        scrollY += 30;
      });
    })
     
  }
  playCreditosVideo() {
    const video = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'Creditos'); // 'creditos' debe coincidir con el nombre que has usado en preload
    video.play();
    video.setScale(0.6);
    // Evento para volver al menú cuando el video termine
    video.on('complete', () => {
      this.scene.start('menu');
    });
  }
  update() {
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.botonVolverMenu.setText(getPhrase(this.volverAlMenuPrincipal));
      this.puntajes.setText(getPhrase(this.tiempoRestante));
    }
  }
  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED;
  };
  async getTranslations(language) {
    this.language = language;
    this.#wasChangedLanguage = FETCHING;
    await getTranslations(language, this.updateWasChangedLanguage);
  }
}
