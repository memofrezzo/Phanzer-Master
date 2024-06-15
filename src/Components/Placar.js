import Phaser from "phaser";

export default class Placar extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, keyCerrado, keyAbierto) {
    super(scene, x, y, keyCerrado);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true); // Inicialmente, la puerta no se puede atravesar
    this.setActive(true); 
    this.estado = 'cerrado'; // Inicialmente, la puerta está cerrada
    this.keyCerrado = keyCerrado;
    this.keyAbierto = keyAbierto;
    this.llaveDisponible = true;
    this.setSize(60, 100);
    this.setOrigin(0.5, 0.5);
  }
  abrir() {
    if (this.estado === 'cerrado') {
        this.estado = 'abierto';
        this.setTexture(this.keyAbierto);
    }
}
}
