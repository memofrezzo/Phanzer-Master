export default class Camaras extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture) {
    super(scene, scene.cameras.main.width / 2, scene.cameras.main.height / 2, null);
    // Coordenadas de las posiciones de las cámaras
    this.camaraPosiciones = [
      { x: 342, y: 918 }, // Punto 1
      { x: 886, y: 415 }, // Punto 4
      { x: 1350, y: 705}
    ];

    // Asigna la visibilidad inicial
    this.cambiarCamara(1); // Muestra la primera cámara al inicio
  }

  actualizar() {
    // Agregar eventos de teclado para cambiar entre las cámaras al presionar los números 1, 2, 3 y 4
    this.scene.input.keyboard.on('keydown-ONE', () => {
      this.cambiarCamara(1);
    });

    this.scene.input.keyboard.on('keydown-TWO', () => {
      this.cambiarCamara(2);
    });

    this.scene.input.keyboard.on('keydown-THREE', () => {
      this.cambiarCamara(3);
    });
  }

  cambiarCamara(numero) {
    if (numero >= 1 && numero <= this.camaraPosiciones.length) {
      const nuevaPosicion = this.camaraPosiciones[numero - 1];
      // Mueve la cámara principal a la nueva posición instantáneamente
      this.scene.cameras.main.stopFollow(); // Detiene el seguimiento del jugador
      this.scene.cameras.main.setPosition(nuevaPosicion.x, nuevaPosicion.y);
    }
  }
}
