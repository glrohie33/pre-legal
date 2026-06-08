"use client";

import { useState } from "react";
import NdaForm from "./components/NdaForm/NdaForm";
import NdaDocument from "./components/NdaDocument/NdaDocument";
import { EMPTY_FORM, type NdaFormData } from "./types";
import styles from "./page.module.css";

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(EMPTY_FORM);

  return (
    <main className={styles.container}>
      <NdaForm data={formData} onChange={setFormData} />
      <NdaDocument data={formData} />
    </main>
  );
}
