import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

const FRIENDLY_AUTH_ERRORS = {
  "auth/invalid-email": "Email invalido.",
  "auth/invalid-credential": "Email ou senha invalidos.",
  "auth/user-not-found": "Conta nao encontrada.",
  "auth/wrong-password": "Senha incorreta.",
  "auth/email-already-in-use": "Este email ja esta em uso.",
  "auth/weak-password": "A senha deve ter no minimo 6 caracteres.",
  "auth/too-many-requests": "Muitas tentativas. Tente novamente daqui a pouco.",
  "auth/network-request-failed": "Falha de rede. Verifique sua conexao.",
};

export const initAuthPersistence = async () => {
  await setPersistence(auth, browserLocalPersistence);
};

export const signUpWithEmail = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return signOut(auth);
};

export const mapAuthError = (error) => {
  const code = error?.code;
  return (
    FRIENDLY_AUTH_ERRORS[code] ||
    "Falha ao autenticar. Tente novamente."
  );
};
