import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  // escena para optimiozar tiempos
  // carga el preload solo una vez y sirve para todo el juego
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.spritesheet("PJ", "./assets/Images/SpritesheetPJ.png", {
      frameWidth: 64,
      frameHeight: 88,
    });
    this.load.spritesheet("Alien", "./assets/Images/SpritesheetAlien.png", {
      frameWidth: 65,
      frameHeight: 63,
    });

    // load assets
    // rest of immages
    this.load.image("PersonajePrincipal", "./assets/Images/PersonajePrincipal.png");
    this.load.image("llaveAgarrada", "./assets/Images/llave.png");
    this.load.tilemapTiledJSON("mapa", "./assets/tilemap/tutorial.json");
    this.load.image("tilesPlataforma", "./assets/Images/Nmapa1.jpg");
    this.load.image("tilesFondo", "./assets/images/Nmapa1.jpg");
    //this.load.image("tilesPlataforma", "./assets/images/mapa1.png");
    this.load.image("Alien2", "./assets/Images/Alien2.png");
    this.load.image("fondoMenu", "./assets/Images/fondoMenu.png");
    this.load.image("Logo", "./assets/Images/Logo.jpeg");
    this.load.image("Github", "./assets/Images/Github.png");
    this.load.image("FondoJuego", "./assets/Images/FondoJuego.png");
    this.load.image("puertaAbierta", "./assets/Images/puertaAbierta.png");
    this.load.image("puertaCerrada", "./assets/Images/puertaCerrada.png");
    this.load.image("puertaFinalAbierta", "./assets/Images/PuertaFinalAbierta.png");
    this.load.image("puertaFinalCerrada", "./assets/Images/PuertaFinalCerrada.png");
    this.load.image("mueble", "./assets/Images/mueble.png");
    this.load.image("armario", "./assets/Images/armario.png");
    this.load.image("logoGoogle", "./assets/Images/logoGoogle.png");
    this.load.image("logoAnonimo", "./assets/Images/logoAnonimo.png");
    this.load.image("armarioAbiertoD", "./assets/Images/armarioAbiertoD.png");
    this.load.image("armarioAbiertoI", "./assets/Images/armarioAbiertoI.png");
    this.load.image("salida", "./assets/Images/salida.png");
    this.load.image("howToPlay", "./assets/Images/HowToPlay.png");
    this.load.image("puertaFinalCerrada", "./assets/Images/PuertaFinalCerrada.png");
    this.load.image("puertaFinalAbierta", "./assets/Images/PuertaFinalAbierta.png");
    this.load.image("camara1", "./assets/Images/Camara1.png");
    this.load.image("camara2", "./assets/Images/Camara2.png");
    this.load.image("camara3", "./assets/Images/Camara3.png");
    this.load.image("zonaCamaras", "./assets/Images/zonaCamaras.png");
    //this.load.image("ControlsInfiltrator", "./assets/Images/Controls.png");
    this.load.image("Donaciones", "./assets/Images/Donaciones.png");
    this.load.image("Argentina", "./assets/Images/Argentina.png");
    this.load.image("EEUU", "./assets/Images/EEUU.png");
      
      //this.load.image("tilesFondo", "./assets/Images/mapa2asd.png");
      this.load.image("PersonajePrincipal", "./assets/Images/boceto pj.png");
      this.load.image("gameOver", "./assets/Images/gameOver.png");
    // Audio
    this.load.audio("selectOption", "./assets/Audio/selectOption.mp3");
    this.load.audio("alarmaCinematica", "./assets/Audio/alarmaCinematica.mp3");
    this.load.audio("alarma", "./assets/Audio/alarma.mp3");
    this.load.audio("grito", "./assets/Audio/grito.mp3");
    this.load.audio("sonidoDeFondo", "./assets/Audio/sonidoDeFondo.mp3");
    this.load.audio("sonidoDeFondo2", "./assets/Audio/sonidoDeFondo2.mp3");
    this.load.audio("door", "./assets/Audio/door.mp3");

    // video
    this.load.video("Creditos", "./assets/Images/Creditos.mp4" );
    this.load.video('agarrarLlave', './assets/Images/agarrarLlave.mp4');
    this.load.video('videoLuz', './assets/Images/videoLuz.mp4');
    this.load.video('cinematicaFinal', './assets/Images/cinematicaFinal.mp4');
    this.load.video('HowToPlay', './assets/Images/HowToPlay.mp4');
    this.load.video('tutorial', './assets/Images/Tutorial.mp4');
    this.load.video('cinematicaTimeOut', './assets/Images/cinematicaTimeOut.mp4');
  }
  

  create() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("PJ", { start: 1, end: 3}),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("PJ", { start:11, end: 13 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("PJ", { start:8, end: 9 }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("PJ", { start:5, end: 6 }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: "quiet",
      frames: [
        { key: "PJ", frame: 4 },
      ],
      frameRate: 1,
      repeat: -1,
    });

    //alien
    this.anims.create({
      key: "leftA",
      frames: this.anims.generateFrameNumbers("Alien", { start: 0, end: 2}),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "rightA",
      frames: this.anims.generateFrameNumbers("Alien", { start:7, end: 9 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "upA",
      frames: this.anims.generateFrameNumbers("Alien", { start:5, end: 6 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "downA",
      frames: this.anims.generateFrameNumbers("Alien", { start:3, end: 4 }),
      frameRate: 5,
      repeat: -1,
    });
    this.scene.start("login");
  }
}
