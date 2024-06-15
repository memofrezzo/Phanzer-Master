import Phaser from "phaser";

export default class Login extends Phaser.Scene {
firebase;

constructor() {
    super("login");
  }

  create() {
    console.log("asdasd");
   this.start = this.add.image(500, 300, "logoAnonimo").setScale(0.5) .setInteractive();
   this.start.setTint(0xffffff);
   this.start.on("pointerover", () => {
    this.game.canvas.style.cursor = "pointer"
}).on("pointerout", () => {
    this.game.canvas.style.cursor = "default";
}).on("pointerdown", () => {
    this.game.canvas.style.cursor = "default";
    this.firebase.signInAnonymously()
    .then(() => {
        this.game.canvas.requestFullscreen();
        this.scene.start("menu");});
});
  this.startG = this.add.image(250,300, "logoGoogle").setScale(0.04) .setInteractive();
  this.startG.on("pointerover", () => {
    this.game.canvas.style.cursor = "pointer"
}).on("pointerout", () => {
    this.game.canvas.style.cursor = "default";
}).on("pointerdown", () => {
        this.game.canvas.requestFullscreen();
    this.game.canvas.style.cursor = "default";
    this.firebase.signInWithGoogle()
    .then(() => {
        this.scene.start("menu");});
});
    }
}