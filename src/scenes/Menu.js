import Phaser from "phaser";
import { EN_US, ES_AR} from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";

export default class Menu extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("menu");
    const { Creditos, ComoJugar } = keys.Menu;
    this.creditos = Creditos;
    this.comoJugar = ComoJugar;
  }

  create() {
    // Fondo del menú
    this.game.canvas.requestFullscreen();
    const fondoMenu = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'fondoMenu');
    fondoMenu.setScale(this.cameras.main.width / fondoMenu.width, this.cameras.main.height / fondoMenu.height)
     //IDIOMAS
      // Agregar imágenes "Argentina", "Brazil" y "EEUU"
      const argentinaImage = this.add.image(this.cameras.main.centerX , this.cameras.main.height - 50, 'Argentina').setScale(1);
      const usaImage = this.add.image(this.cameras.main.centerX + 150, this.cameras.main.height - 49, 'EEUU').setScale(1);
      
      // Establecer interactividad para las imágenes
      argentinaImage.setInteractive();
      usaImage.setInteractive();
      
      // Configurar eventos para el mouse
      argentinaImage.on('pointerup', () => {
        this.getTranslations(ES_AR);
          });
      argentinaImage.on('pointerover', () => {
        selectOptionSound.play();
        argentinaImage.setScale(1.2);
      });
  
      argentinaImage.on('pointerout', () => {
        argentinaImage.setScale(1);
      });
      
      usaImage.on('pointerover', () => {
        selectOptionSound.play();
        usaImage.setScale(1.2);
      });
      
      usaImage.on('pointerout', () => {
        usaImage.setScale(1);
      });
      
      usaImage.on('pointerup', () => {
        this.getTranslations(EN_US);
      });
      
    // Logo Principal
    const selectOptionSound = this.sound.add('selectOption');
    const logo = this.add.image(this.cameras.main.centerX - 180, this.cameras.main.centerY + 60, 'Alien2').setScale(3).setOrigin(0.5);
    logo.setInteractive();
    logo.on('pointerover', () => {
      selectOptionSound.play();
      logo.setScale(3.5);
    });

    logo.on('pointerout', () => {
      logo.setScale(3);
    });
    logo.on('pointerup', () => {
      selectOptionSound.play();
      this.game.canvas.requestFullscreen();
      this.scene.start("howToPlay")
    });
    // Agregar el texto "Créditos" debajo del logo
    this.textoCreditos = this.add.text(this.cameras.main.centerX - 180, this.cameras.main.centerY + 235, getPhrase(this.creditos), {
      fontFamily: 'Arial',
      fontSize: 30,
      color: '#ffffff', // Color blanco
    });
    this.textoCreditos.setOrigin(0.5);
    this.textoCreditos.setInteractive();

    // Reproducir el video de créditos cuando se hace clic en "Créditos"
    this.textoCreditos.on('pointerup', () => {
      this.playCreditosVideo();
    });
    this.textoCreditos.on('pointerover', () => {
      selectOptionSound.play();
      this.textoCreditos.setScale(1.2);
    });

    this.textoCreditos.on('pointerout', () => {
      this.textoCreditos.setScale(1);
    });
}

  // Método para reproducir el video de créditos
  playCreditosVideo() {
    const video = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'Creditos'); // 'creditos' debe coincidir con el nombre que has usado en preload
    video.play();
    video.setScale(0.6);
    // Evento para volver al menú cuando el video termine
    video.on('complete', () => {
      this.scene.start('HowToPlay');
    });
  }

  update() {
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.textoCreditos.setText(getPhrase(this.creditos));
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
