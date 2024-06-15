import Phaser from "phaser";
import Preload from "./scenes/Preload";
import Menu from "./scenes/Menu";
import Nivel1 from "./scenes/Nivel1";
import GameOver from "./scenes/GameOver";
import Win from "./scenes/Win";
import Creditos from "./scenes/Creditos";
import HowToPlay from "./scenes/HowToPlay";
import UI from "./scenes/UI";
import FirebasePlugin from "./plugins/FirebasePlugin";
import Login from "./scenes/Login";
import WinCinematica from "./scenes/WinCinematica";
import TimeOutCinematica from "./scenes/TimeOutCinematica";
import 'buffer';

const config = { 
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  plugins: {
        global: [
          {
            key: "FirebasePlugin",
            plugin: FirebasePlugin,
            start: true,
            mapping: "firebase",
          },
        ],
      },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preload, Login, Menu, HowToPlay, Nivel1, GameOver, WinCinematica, TimeOutCinematica, Win, Creditos, UI],
};

export default new Phaser.Game(config);
