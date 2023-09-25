import { Rubik_Iso } from "next/font/google";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import itemService from "./gateway/services/itemService";

const rubik = Rubik_Iso({ weight: "400", subsets: ["latin"] });

export default function Page() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  function changeInput(e) {
    setName(e.target.value);
  }

  function include() {
    if (name === "") return alert("Digite um nome!");
    itemService
      .post({ name: name })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 422) {
          alert("Nome já cadastrado!");
        }
        if(error.response.status === 500){
          alert("Erro no servidor!")
        }
      });
  }

  function find() {
    if (name === "") return alert("Digite um nome!");
    itemService
      .get(name)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function findAll() {
    itemService
      .get()
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main className={styles.main}>
      <div className={styles.top}>
        <p className={rubik.className}>Include-Find App</p>
      </div>
      <div className={styles.middle}>
        <div className={styles.containerOptions}>
          <form className={styles.form}>
            <input
              maxLength={20}
              className={styles.input}
              type="text"
              placeholder="Nome"
              name="name"
              onChange={changeInput}
            />
          </form>
          <div className={styles.containerButtons}>
            <div className={styles.optionInclude} onClick={include}>
              Cadastrar
            </div>
            <div className={styles.optionFindAll} onClick={findAll}>
              Buscar Todos
            </div>
            <div className={styles.optionFind} onClick={find}>
              Buscar
            </div>
          </div>
        </div>
        <div className={styles.containerItems}>
          <p className={styles.list}>Resultado:</p>
          {items.map((item, index) => (
            <div className={styles.item} key={index}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={rubik.className}>2023 &copy;</p>
      </div>
    </main>
  );
}