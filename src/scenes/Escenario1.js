import Phaser from "phaser";
export default class Escenario1 extends Phaser.Scene {
    constructor() {
      super("escenario1");
    }
  
    create() {
      // Fondo del nivel
      this.add.image(0, 0, "fondoEscenario1").setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);  
      // Crear tanques
      this.tank1 = this.physics.add.sprite(100, 100, 'tank1');
      this.tank2 = this.physics.add.sprite(300, 100, 'tank2');
      this.tank1 = this.physics.add.sprite(200, 150, 'tank1');
      this.tank2 = this.physics.add.sprite(200, 200, 'tank2');
      // Configurar cámara fija
      this.cameras.main.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);
  
      // Configurar controles para tanques
      this.cursors1 = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
      });
  
      this.cursors2 = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        right: Phaser.Input.Keyboard.KeyCodes.RIGHT
      });
    }
  
    update() {
      this.handleTankMovement(this.tank1, this.cursors1);
      this.handleTankMovement(this.tank2, this.cursors2);
    }
  
    handleTankMovement(tank, cursors) {
      if (cursors.up.isDown) {
        tank.setVelocityY(-100);
      } else if (cursors.down.isDown) {
        tank.setVelocityY(100);
      } else {
        tank.setVelocityY(0);
      }
  
      if (cursors.left.isDown) {
        tank.setVelocityX(-100);
      } else if (cursors.right.isDown) {
        tank.setVelocityX(100);
      } else {
        tank.setVelocityX(0);
      }
    }
  
    createPlayerInterface() {
      // Crear interfaz del jugador 1
      let graphics = this.add.graphics();
      graphics.fillStyle(0x000000, 0.7);
      graphics.fillRect(10, this.cameras.main.height - 110, 300, 100);
      
      // Crear interfaz del jugador 2
      graphics.fillRect(this.cameras.main.width - 310, this.cameras.main.height - 110, 300, 100);
    }
  
    createHealthBars() {
      // Crear barra de vida del jugador 1
      this.healthBar1 = this.add.graphics();
      this.healthBar1.fillStyle(0xff0000, 1);
      this.healthBar1.fillRect(10, 10, 300, 30);
  
      // Crear barra de vida del jugador 2
      this.healthBar2 = this.add.graphics();
      this.healthBar2.fillStyle(0xff0000, 1);
      this.healthBar2.fillRect(this.cameras.main.width - 310, 10, 300, 30);
    }
  
    createTimer() {
        this.timerText = this.add.text(this.cameras.main.width / 2, 10, '35', {
          fontSize: '32px',
          color: '#ffffff',
          align: 'center'
        }).setOrigin(0.5, 0);
        this.timerRect = this.add.graphics();
        this.timerRect.fillStyle(0xff0000, 1);
        this.timerRect.fillRect(this.cameras.main.width / 2 - 150, 50, 300, 30);
    }
  }