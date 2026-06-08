"use client";

import styles from "./NdaForm.module.css";
import type { NdaFormData } from "../../types";

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

export default function NdaForm({ data, onChange }: NdaFormProps) {
  const set = (key: keyof NdaFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [key]: e.target.value });

  const handlePrint = () => window.print();

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <p className={styles.logo}>Pre-Legal</p>
        <h1 className={styles.title}>Mutual NDA Creator</h1>
        <p className={styles.subtitle}>Fill in the details to generate your agreement.</p>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Party 1 (Disclosing)</h2>

          <div className={styles.field}>
            <label className={styles.label}>Full name or company name</label>
            <input className={styles.input} value={data.party1Name} onChange={set("party1Name")} placeholder="Acme Corporation" />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Street address</label>
            <input className={styles.input} value={data.party1Address} onChange={set("party1Address")} placeholder="123 Main St" />
          </div>

          <div className={styles.row3}>
            <div className={styles.field}>
              <label className={styles.label}>City</label>
              <input className={styles.input} value={data.party1City} onChange={set("party1City")} placeholder="New York" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>State</label>
              <input className={styles.input} value={data.party1State} onChange={set("party1State")} placeholder="NY" maxLength={2} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>ZIP</label>
              <input className={styles.input} value={data.party1Zip} onChange={set("party1Zip")} placeholder="10001" maxLength={10} />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Party 2 (Receiving)</h2>

          <div className={styles.field}>
            <label className={styles.label}>Full name or company name</label>
            <input className={styles.input} value={data.party2Name} onChange={set("party2Name")} placeholder="Beta Inc." />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Street address</label>
            <input className={styles.input} value={data.party2Address} onChange={set("party2Address")} placeholder="456 Oak Ave" />
          </div>

          <div className={styles.row3}>
            <div className={styles.field}>
              <label className={styles.label}>City</label>
              <input className={styles.input} value={data.party2City} onChange={set("party2City")} placeholder="Los Angeles" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>State</label>
              <input className={styles.input} value={data.party2State} onChange={set("party2State")} placeholder="CA" maxLength={2} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>ZIP</label>
              <input className={styles.input} value={data.party2Zip} onChange={set("party2Zip")} placeholder="90001" maxLength={10} />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Agreement Details</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Effective date</label>
              <input className={styles.input} type="date" value={data.effectiveDate} onChange={set("effectiveDate")} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Duration (e.g. 2 years)</label>
              <input className={styles.input} value={data.duration} onChange={set("duration")} placeholder="2 years" />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Purpose of disclosure</label>
            <textarea
              className={styles.textarea}
              value={data.purpose}
              onChange={set("purpose")}
              placeholder="Evaluating a potential business partnership between the parties."
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Governing state</label>
            <input className={styles.input} value={data.governingState} onChange={set("governingState")} placeholder="Delaware" />
          </div>
        </section>
      </form>

      <div className={styles.footer}>
        <button className={styles.downloadBtn} onClick={handlePrint}>
          Download as PDF
        </button>
      </div>
    </aside>
  );
}
