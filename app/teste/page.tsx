"use client";

import { apiLogin } from "../../config/teste";

export default function Teste() {
  async function testeLogin() {
    try {
      const data = await apiLogin("manuel@imagehub.com", "12345678");
      console.log("Login OK", data);
    } catch (err) {
      console.error(err);
    }
  }

  //   testeLogin();

  return (
    <div>
      <h1>Teste</h1>
      <button onClick={testeLogin}>Testar</button>
    </div>
  );
}
