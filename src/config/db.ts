import admin from "firebase-admin";
import { config } from "./";
import credentials from "../keys.json";

admin.initializeApp({
  credential: admin.credential.cert(credentials as any),
  databaseURL: config.firebaseConfig.databaseURL,
});

const db = admin.firestore();
export {
  db
}