import Phaser from "phaser";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInAnonymously,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBppuIn0qUOcZqw7Gqg21IKYXcW22vp46c",
  authDomain: "the-infiltrator-2023.firebaseapp.com",
  projectId: "the-infiltrator-2023",
  storageBucket: "the-infiltrator-2023.appspot.com",
  messagingSenderId: "846715789407",
  appId: "1:846715789407:web:b02e79a96ef3a78aa13bea"  
};

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
    this.auth = getAuth(app);
    this.onLoggedInCallback = () => {};

    this.authStateChangedUnsubscribe = onAuthStateChanged(this.auth, (user) => {
      if (user && this.onLoggedInCallback) {
        this.onLoggedInCallback();
      }
    });
  }

  destroy() {
    this.authStateChangedUnsubscribe();
    super.destroy();
  }

  onLoggedIn(callback) {
    this.onLoggedInCallback = callback;
  }

  async saveGameData(userId, data) {
    console.log(userId, data);
    await setDoc(doc(this.db, "game-data", userId), data);
    /* await addDoc(collection(this.db, "game-data"), {
      name: data.name,
      time: data.time,
    }) */
  }

  async getHighGameData() {
    const q = query(
      collection(this.db, "game-data"),
      orderBy("time", "desc"),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const scores = [];
    querySnapshot.forEach((d) => {
      console.log(d.data());
      scores.push(d.data());
    });

    console.log("scores",scores);

    return scores;
  }

  async loadGameData(userId) {
    const snap = await getDoc(doc(this.db, "game-data", userId));
    return snap.data();
  }

  
  async signInAnonymously() {
    const credentials = await signInAnonymously(this.auth);
    return credentials.user;
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(this.auth, provider);
    return credentials.user;
  }

  getUser() {
    return this.auth.currentUser;
  }

 

  async getHighScores() {
    const q = query(
      collection(this.db, "game-data"),
      orderBy("time", "desc"),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    const scores = [];
    querySnapshot.forEach((d) => {
      console.log(d.data());
      scores.push(d.data());
    });

    console.log("scores",scores);

    return scores;
  }
}
  