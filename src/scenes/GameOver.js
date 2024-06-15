import Phaser from "phaser";
import { EN_US, ES_AR } from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";
export default class GameOver extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("GameOver");
    const { GoBack, JuegoTerminado, Reiniciar } = keys.GameOver;
    this.reiniciar = Reiniciar;
    this.juegoTerminado = JuegoTerminado;
    this.volverAlMenuPrincipal = GoBack;
  }

  create() {
    const fondoGameOver = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'gameOver');
    fondoGameOver.setScale(this.cameras.main.width / fondoGameOver.width, this.cameras.main.height / fondoGameOver.height)
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Mensaje de Game Over
    this.mensajeGameOver = this.add.text(centerX, centerY - 50, getPhrase(this.juegoTerminado), {
      fontFamily: 'Arial',
      fontSize: 48,
      color: '#8b0000', // Color rojo
    });
    this.mensajeGameOver.setOrigin(0.5);

    // Botón de Restart
    this.botonRestart = this.add.text(centerX, centerY + 50, getPhrase(this.reiniciar), {
      fontFamily: 'Arial',
      fontSize: 24,
      color: '#ffffff', // Color blanco
    });
    this.botonRestart.setOrigin(0.5);

    // Agranda el texto cuando el mouse se acerca al botón
    this.botonRestart.on('pointerover', () => {
      this.botonRestart.setScale(1.2); // Escala el texto al 120%
    });

    // Achica el texto cuando el mouse se aleja del botón
    this.botonRestart.on('pointerout', () => {
      this.botonRestart.setScale(1); // Restaura la escala original
    });

    this.botonRestart.setInteractive(); // Habilita la interacción con el botón
    this.botonRestart.on('pointerdown', () => {
      // Cuando se hace clic en el botón Restart, reinicia el nivel1
      this.scene.start('Nivel1');
    });

    // Botón de Volver al Menú Principal
    this.botonVolverMenu = this.add.text(centerX, centerY + 100, getPhrase(this.volverAlMenuPrincipal), {
      fontFamily: 'Arial',
      fontSize: 24,
      color: '#ffffff', // Color blanco
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
      // Cuando se hace clic en el botón de volver al menú principal, cambia a la escena del menú
      this.scene.start('menu');
    });
  }
  update() {
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.mensajeGameOver.setText(getPhrase(this.juegoTerminado));
      this.botonRestart.setText(getPhrase(this.reiniciar));
      this.botonVolverMenu.setText(getPhrase(this.volverAlMenuPrincipal));
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
