import Phaser from "phaser";
import Jugador from "../Components/Jugador";
import Alien from "../Components/Alien";
import Placar from "../Components/Placar";
import Puerta from "../Components/Puerta";
import Camaras from "../Components/Camaras";
import { EN_US, ES_AR } from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";

export default class Nivel1 extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("Nivel1");
    const { Tiempo } = keys.Nivel1;
    this.tiempo = Tiempo;
    this.camaraPosiciones = [
      { x: 400, y: 415 }, // Punto 1
      { x: 1270, y: 420 }, // Punto 4
      { x: 1290, y: 780}
    ];
  }

  create() {
    this.timer = this.time.addEvent({
      delay: 1000, 
      callback: this.updateTime,
      callbackScope: this,
      loop: true
     }); 
    this.countdown = 120;
    this.add.image(this.cameras.main.centerX + 331, this.cameras.main.centerY + 192, 'tilesPlataforma');
    const mapa = this.make.tilemap({ key: "mapa" });
      //const capaFondo = mapa.addTilesetImage("mapa2", "tilesFondo");
      const capaPlataform = mapa.addTilesetImage("tilesPlataforma", "tilesPlataforma");
      this.sonidoDeFondo2 = this.sound.add('sonidoDeFondo2');
      this.grito = this.sound.add('grito');
      this.door = this.sound.add('door');
      this.alarma = this.sound.add('alarma');
      this.alarmaCinematica = this.sound.add('alarmaCinematica');
      this.sonidoDeFondo2.play({ loop: true });
      //const FondoLayer = mapa.createLayer("background", capaFondo, 0, 0);
      const PlataformaLayer = mapa.createLayer("platform", capaPlataform, 0, 0);
      PlataformaLayer.setCollisionByProperty({ collision: true });
    this.placar1 = new Placar(this, 240, 258, "armario", "armarioAbiertoI") .setScale(0.8); 
    this.placar2 = new Placar(this, 779, 258, "armario", "armarioAbiertoI") .setScale(0.8);   
    this.placar3 = new Placar(this, 57, 710, "armario", "armarioAbiertoD") .setScale(0.8); 
    this.placar4 = new Placar(this, 475, 705, "armario", "armarioAbiertoD") .setScale(0.8);  
    this.placar5 = new Placar(this, 1230, 705, "armario", "armarioAbiertoI") .setScale(0.8); 
    this.placares = this.physics.add.group();
    this.add.existing(this.placar1);
    this.add.existing(this.placar2);
    this.add.existing(this.placar3);
    this.add.existing(this.placar4);
    this.add.existing(this.placar5);
    this.puerta1 = new Puerta(this, 544, 333, "puertaCerrada", "puertaAbierta").setDepth(2);
    this.puerta2 = new Puerta(this, 224, 786, "puertaCerrada", "puertaAbierta").setDepth(2);
    this.puerta3 = new Puerta(this, 548, 493, "puertaCerrada", "puertaAbierta").setDepth(2);
    this.puerta4 = new Puerta(this, 1157, 785, "puertaCerrada", "puertaAbierta").setDepth(2);
    this.puertaFinal = new Puerta(this, 1234, 335, "puertaFinalCerrada", "puertaFinalAbierta").setDepth(2);
    this.add.existing(this.puerta1);
    this.add.existing(this.puerta2);  
    this.add.existing(this.puerta3);
    this.add.existing(this.puerta4);    
    this.jugador = new Jugador(this, 144, 176, 'PJ').setScale(0.7) .setDepth(1);
    this.jugador.setSize(42, 60);  
    this.add.existing(this.jugador);
    this.alien = new Alien(this, 1324, 902, 'Alien').setScale(1);
    this.add.existing(this.alien);
    this.zonaCamaras1 = this.add.rectangle(100, 100, 100, 100, 0xff0000, 0.01).setDepth(1);
    this.camarasZona1 = this.physics.add.image(840, 700, "zonaCamaras").setDepth(2);
    this.camarasZona2 = this.physics.add.image(236, 139, "zonaCamaras").setDepth(2);
    this.zonaCamaras1.setPosition(840, 700); 
    this.zonaCamaras2 = this.add.rectangle(100, 100, 100, 100, 0xff0000, 0.01).setDepth(1);
    this.physics.add.existing(this.zonaCamaras1);
    this.camarasZona1.setImmovable(true);
    this.camarasZona2.setImmovable(true);
    this.physics.add.existing(this.zonaCamaras2);
    this.zonaCamaras2.setPosition(236, 139);
    this.imagenesCamaras = [
      "camara1", 
      "camara2", 
      "camara3", 
    ];
    this.textoTiempo = this.add.text(250, 190, getPhrase(this.tiempo), {
      fontSize: "13px",
      color: "#ffffff",
    });
    this.textoTiempo.setDepth(3)
    this.textoTiempo.setScrollFactor(0);
    this.tiempoInicial = this.add.text(380, 190, this.countdown.toString(), {
      fontSize: "13px",
      color: "#ffffff",
    });
    this.tiempoInicial.setScrollFactor(0);
  this.salidaGroup = this.physics.add.group();
  this.salida = this.salidaGroup.create(1215, 90, "salida").setScale(0.3).setDepth(2);
  this.add.existing(this.salida);
    // Configura las colisiones con la figura geométrica
    this.physics.add.collider(this.jugador, this.placar1, this.interactuarPlacar1, null);
    this.physics.add.collider(this.jugador, this.placar2, this.interactuarPlacar2, null);
    this.physics.add.collider(this.jugador, this.placar3, this.interactuarPlacar3, null);
    this.physics.add.collider(this.jugador, this.placar4, this.interactuarPlacar4, null);
    this.physics.add.collider(this.jugador, this.placar5, this.interactuarPlacar5, null);
    this.physics.add.collider(this.jugador, this.puerta1, this.interactuarPuerta1, null);
    this.physics.add.collider(this.jugador, this.puerta2, this.interactuarPuerta2, null);
    this.physics.add.collider(this.jugador, this.puerta3, this.interactuarPuerta3, null);
    this.physics.add.collider(this.jugador, this.puerta4, this.interactuarPuerta4, null);
    this.physics.add.collider(this.jugador, this.puertaFinal, this.interactuarPuertaFinal, null);
    this.physics.add.collider(this.jugador, this.alien, this.colisionConAlien, null, this);
    this.physics.add.collider(this.jugador, this.salida, this.colisionSalida, null, this);
    this.physics.add.collider(this.jugador, PlataformaLayer); 
    this.physics.add.collider(this.jugador, this.camarasZona1); 
    this.physics.add.collider(this.jugador, this.camarasZona2);
    this.cameras.main.startFollow(this.jugador);
    this.cameras.main.setZoom(2.5); //cámara zoom
     this.input.keyboard.on("keydown-E", (event) => {
      if (event.repeat) return; 
      this.jugador.isEPressed = true;
  });
  this.input.keyboard.on("keyup-E", () => {
      this.jugador.isEPressed = false;
  });
}

  interactuarPlacar1(jugador, placar1) {
    if (placar1.llaveDisponible && jugador.isEPressed && placar1.estado==='cerrado') {
      jugador.recogerLlave();
      placar1.abrir(); 
      placar1.llaveDisponible = false;
      console.log("llave1");
    }
  }
  interactuarPlacar2(jugador, placar2) {
    if (placar2.llaveDisponible && jugador.isEPressed && placar2.estado==='cerrado') {
      jugador.recogerLlave();
      placar2.abrir();
      placar2.llaveDisponible = false; 
      console.log("llave2");
    }
  }
  interactuarPlacar3(jugador, placar3) {
    if (placar3.llaveDisponible && jugador.isEPressed&& placar3.estado==='cerrado') {
      jugador.recogerLlave();
      placar3.abrir(); 
      placar3.llaveDisponible = false; 
      console.log("llave2");
    }
  }
  interactuarPlacar4(jugador, placar4) {
    if (placar4.llaveDisponible && jugador.isEPressed&& placar4.estado==='cerrado') {
      jugador.recogerLlave();
      placar4.abrir();
      placar4.llaveDisponible = false;
      console.log("llave2");
    }
  }
  interactuarPlacar5(jugador, placar5) {
    if (placar5.llaveDisponible && jugador.isEPressed&& placar5.estado==='cerrado') {
      jugador.recogerLlave();
      placar5.abrir(); 
      placar5.llaveDisponible = false; 
      console.log("llave2");
    }
  }

  interactuarPuerta1 = (jugador, puerta1) => {
    if (jugador.llaves > 0 && puerta1.estado === "cerrada") {
      puerta1.abrir();
      this.door.play();
      jugador.llaves--;
      puerta1.body.checkCollision.none = true;
    }
  }
  interactuarPuerta2 = (jugador, puerta2) => {
    if (jugador.llaves > 0 && puerta2.estado === "cerrada") {
      puerta2.abrir();
      this.door.play();
      jugador.llaves--;
      puerta2.body.checkCollision.none = true;
    }
  }
  
  interactuarPuerta3 = (jugador, puerta3) => {
    if (jugador.llaves > 0 && puerta3.estado === "cerrada") {
      puerta3.abrir();
      this.door.play();
      jugador.llaves--;
      puerta3.body.checkCollision.none = true;
    }
  }
  
  interactuarPuerta4 = (jugador, puerta4) => {
    if (jugador.llaves > 0 && puerta4.estado === "cerrada") {
      puerta4.abrir();
      this.door.play();
      jugador.llaves--;
      puerta4.body.checkCollision.none = true;
    }
  }
  
  interactuarPuertaFinal = (jugador, puertaFinal) => {
    if (jugador.llavesAgarradas === 6) {
      puertaFinal.abrir();
      this.door.play();
      puertaFinal.body.checkCollision.none = true;
    }
  }

  actualizarCamaras() {
    console.log("actualizar");
    this.imagenCamaraActual = this.add.image(400, 415, this.imagenesCamaras[0]).setScale(0.2).setDepth(2);
    // Eliminar la imagen de la cámara actual si existe
    if (this.imagenCamaraActual) {
      this.imagenCamaraActual.destroy();
    }
  
    // Agregar eventos de teclado para cambiar entre las cámaras al presionar los números 1, 2 y 3
    this.input.keyboard.on('keydown-ONE', () => {
      this.imagenCamaraActual.destroy();
      this.imagenCamaraActual = this.add.image(400, 415, this.imagenesCamaras[0]).setScale(0.2).setDepth(2);
      this.cambiarCamara(1);
    });
  
    this.input.keyboard.on('keydown-TWO', () => {
      this.imagenCamaraActual.destroy();
      this.imagenCamaraActual = this.add.image(1270, 420, this.imagenesCamaras[1]).setScale(0.2).setDepth(2);
      this.cambiarCamara(2);
    });
  
    this.input.keyboard.on('keydown-THREE', () => {
      this.imagenCamaraActual.destroy();
      this.imagenCamaraActual = this.add.image(1290, 780, this.imagenesCamaras[2]).setScale(0.2).setDepth(2);
      this.cambiarCamara(3);
    });
  
    // Evento para regresar a la cámara principal
    this.input.keyboard.on('keydown-E', () => {
        this.imagenCamaraActual.destroy();
      this.cameras.main.startFollow(this.jugador);
    });
  }

  cambiarCamara(numero) {
    if (numero >= 1 && numero <= this.camaraPosiciones.length) {
      const nuevaPosicion = this.camaraPosiciones[numero - 1];
      this.cameras.main.stopFollow();
      this.cameras.main.pan(nuevaPosicion.x, nuevaPosicion.y, 1, 'Quad.easeIn', false);
    }
  }

  updateTime() {
    this.countdown--;
    this.tiempoInicial.setText(""+ this.countdown).setDepth(3);
    if (this.countdown === 0) {
      this.sonidoDeFondo2.stop();
      this.alarma.stop();
      this.scene.start ("timeOutCinematica");
    }
}
  update() {
    const isOverlapping1 = this.physics.overlap(this.jugador, this.zonaCamaras1);
    if (isOverlapping1) {
   this.actualizarCamaras();
   this.zonaCamaras1.setPosition(900, 700); 
    }
    const isOverlapping2 = this.physics.overlap(this.jugador, this.zonaCamaras2);
    if (isOverlapping2) {
   this.actualizarCamaras();
   this.zonaCamaras2.setPosition(270, 139); 
    }
    if (this.jugador.llavesAgarradas === 5) {
      this.physics.pause();
      this.jugador.abrirPuertaFinal();
      this.jugador.llavesAgarradas++;
      this.cameras.main.stopFollow();
      this.time.delayedCall(1500, () => {
      this.cameras.main.pan(1210, 194, 1500, 'Quad.easeIn', false);
    });
      this.time.delayedCall(4000, () => {
      this.cameras.main.pan(this.jugador.x, this.jugador.y, 1000, 'Quad.easeIn', false);
      this.cameras.main.startFollow(this.jugador);
    });
    this.time.delayedCall(5000, () => {
      this.physics.resume();
      this.alarma.play();
      this.alarma.play({ loop: true });
    });
    }
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.textoTiempo.setText(getPhrase(this.tiempo));
    }
    this.jugador.actualizar();
    this.alien.actualizar();
    const distancia = Phaser.Math.Distance.Between(this.jugador.x, this.jugador.y, this.alien.x, this.alien.y);
  const distanciaMaxima = 600; 
  const volumenMaximo = 100;
  const volumen = Phaser.Math.Clamp(1 - distancia / distanciaMaxima, 0, 1) * volumenMaximo + 10;
  this.sonidoDeFondo2.setVolume(0.01 * volumen);
  }
  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED;
  };
  async getTranslations(language) {
    this.language = language;
    this.#wasChangedLanguage = FETCHING;
    await getTranslations(language, this.updateWasChangedLanguage);
  }
  colisionSalida(jugador, salida) {
    this.sonidoDeFondo2.stop();
    this.alarma.stop();
    this.scene.start('winCinematica', {
      time: this.countdown  
    });
  }
  colisionConAlien() {
    this.sonidoDeFondo2.stop();
    this.alarma.stop();
    this.grito.play();
    this.scene.start('GameOver');
  }
}