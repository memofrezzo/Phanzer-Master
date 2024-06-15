import Phaser from 'phaser';

export default class Alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    // Agrega el alien a la escena
    scene.add.existing(this);

    // Activa la física del alien
    scene.physics.add.existing(this);

    // Configura la velocidad de movimiento
    this.velocidad = 210; 
    const DIRECCION_IZQUIERDA = 1;
    const DIRECCION_DERECHA = 2;
    const DIRECCION_ARRIBA = 3;
    const DIRECCION_ABAJO = 4;

    // Array de coordenadas
    this.coordenadas = [
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 90 },  // Punto 2
      { x: 886, y: 90 },  // Punto 3
      { x: 886, y: 415 }, // Punto 4
      { x: 1340, y: 415 },  // Punto 5
      { x: 1340, y: 908 },  // Punto inicio
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 436 },  // Punto 7
      { x: 1340, y: 415 },  // Punto 5 
      { x: 886, y: 415 }, // Punto 4
      { x: 886, y: 90 },  // Punto 3
      { x: 342, y: 90 },  // Punto 2
      { x: 342, y: 918 }, // Punto 1
      { x: 1340, y: 908 },  // Punto inicio
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 90 },  // Punto 2
      { x: 886, y: 90 },  // Punto 3
      { x: 886, y: 415 }, // Punto 4
      { x: 1340, y: 415 },  // Punto 5
      { x: 1340, y: 908 },  // Punto inicio
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 436 },  // Punto 7
      { x: 1340, y: 415 },  // Punto 5 
      { x: 886, y: 415 }, // Punto 4
      { x: 886, y: 90 },  // Punto 3
      { x: 342, y: 90 },  // Punto 2
      { x: 342, y: 918 }, // Punto 1
      { x: 1340, y: 908 },  // Punto inicio
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 90 },  // Punto 2
      { x: 886, y: 90 },  // Punto 3
      { x: 886, y: 415 }, // Punto 4
      { x: 1340, y: 415 },  // Punto 5
      { x: 1340, y: 908 },  // Punto inicio
      { x: 342, y: 918 }, // Punto 1
      { x: 342, y: 436 },  // Punto 7
      { x: 1340, y: 415 },  // Punto 5 
      { x: 886, y: 415 }, // Punto 4
      { x: 886, y: 90 },  // Punto 3
      { x: 342, y: 90 },  // Punto 2
      { x: 342, y: 918 }, // Punto 1
      { x: 1340, y: 908 },  // Punto inicio
    ];

    // Índice actual en el array de coordenadas
    this.indiceCoordenadaActual = 0;

    // Dirección de movimiento (1 para avanzar, -1 para retroceder)
    this.direccionMovimiento = 1;

    // Temporizador para cambiar de coordenada

    // Variable para rastrear si el Alien ha completado un patrón
    this.completoPatron = false;
  }

  actualizar() {
    // Aquí debes usar this.coordenadas en lugar de coordenadasPatron1
    const coordenadaActual = this.coordenadas[this.indiceCoordenadaActual];

    // Calcula la dirección hacia la coordenada actual
    const direccionX = coordenadaActual.x - this.x;
    const direccionY = coordenadaActual.y - this.y;

    // Calcula la distancia al punto actual
    const distancia = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        coordenadaActual.x,
        coordenadaActual.y
    );

    // Normaliza la dirección
    const velocidadX = (direccionX / distancia) * this.velocidad;
    const velocidadY = (direccionY / distancia) * this.velocidad;

    // Actualiza la animación según la dirección
    if (Math.abs(velocidadX) > Math.abs(velocidadY)) {
        if (velocidadX > 0) {
            // Movimiento hacia la derecha
            this.play("rightA", true);
        } else {
            // Movimiento hacia la izquierda
            this.play("leftA", true);
        }
    } else {
        if (velocidadY > 0) {
            // Movimiento hacia abajo
            this.play("downA", true);
        } else {
            // Movimiento hacia arriba
            this.play("upA", true);
        }
    }

    // Mueve al Alien hacia la coordenada actual
    this.setVelocity(velocidadX, velocidadY);

    // Verifica si el Alien ha llegado a la coordenada actual
    if (distancia < 5) {
        // Cambia a la siguiente coordenada en la dirección actual
        this.indiceCoordenadaActual++;
    }
    // Buscar cómo funciona easyStar 
}
}