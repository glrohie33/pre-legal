import styles from "./NdaDocument.module.css";
import type { NdaFormData } from "../../types";

interface NdaDocumentProps {
  data: NdaFormData;
}

function Blank({ value, placeholder }: { value: string; placeholder: string }) {
  if (value.trim()) {
    return <span className={`${styles.blank} ${styles.filled}`}>{value}</span>;
  }
  return <span className={styles.blank}>{placeholder}</span>;
}

function formatAddress(address: string, city: string, state: string, zip: string): string {
  const parts = [address, city, [state, zip].filter(Boolean).join(" ")].filter(Boolean);
  return parts.join(", ") || "";
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function NdaDocument({ data }: NdaDocumentProps) {
  const party1Address = formatAddress(data.party1Address, data.party1City, data.party1State, data.party1Zip);
  const party2Address = formatAddress(data.party2Address, data.party2City, data.party2State, data.party2Zip);
  const effectiveDate = formatDate(data.effectiveDate);

  return (
    <div className={styles.wrapper}>
      <article className={styles.page}>
        <h1 className={styles.docTitle}>Mutual Non-Disclosure Agreement</h1>
        <p className={styles.docSubtitle}>Confidential</p>

        <div className={styles.parties}>
          <p className={styles.para}>
            This Mutual Non-Disclosure Agreement (the &ldquo;Agreement&rdquo;) is entered into as of{" "}
            <Blank value={effectiveDate} placeholder="[Effective Date]" /> (the &ldquo;Effective Date&rdquo;), by and between:
          </p>
          <br />
          <p className={styles.para}>
            <strong>Party 1:</strong> <Blank value={data.party1Name} placeholder="[Party 1 Name]" />
            {party1Address && (
              <>, located at <Blank value={party1Address} placeholder="" /></>
            )}
            ; and
          </p>
          <br />
          <p className={styles.para}>
            <strong>Party 2:</strong> <Blank value={data.party2Name} placeholder="[Party 2 Name]" />
            {party2Address && (
              <>, located at <Blank value={party2Address} placeholder="" /></>
            )}
            .
          </p>
          <br />
          <p className={styles.para}>
            Each of Party 1 and Party 2 may be referred to herein individually as a &ldquo;Party&rdquo; and collectively as the
            &ldquo;Parties.&rdquo;
          </p>
        </div>

        <hr className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>1. Purpose</h2>
          <p className={styles.para}>
            The Parties wish to explore a potential business relationship for the purpose of{" "}
            <Blank value={data.purpose} placeholder="[describe the purpose of disclosure]" /> (the &ldquo;Purpose&rdquo;). In
            connection with this Purpose, each Party may disclose to the other certain confidential and proprietary information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>2. Definition of Confidential Information</h2>
          <p className={styles.para}>
            &ldquo;Confidential Information&rdquo; means any data or information that is proprietary to the disclosing Party and not
            generally known to the public, whether in tangible or intangible form, including but not limited to: business plans,
            trade secrets, financial data, customer lists, technical specifications, and any other information designated as
            confidential.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>3. Obligations of Receiving Party</h2>
          <p className={styles.para}>
            Each Party agrees to: (a) hold the other Party&rsquo;s Confidential Information in strict confidence; (b) not disclose
            such information to any third party without prior written consent; (c) use the Confidential Information solely for the
            Purpose; and (d) protect the Confidential Information using at least the same degree of care used to protect its own
            confidential information, but in no event less than reasonable care.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>4. Exclusions</h2>
          <p className={styles.para}>
            The obligations in Section 3 do not apply to information that: (a) is or becomes publicly known through no breach of
            this Agreement; (b) was rightfully known to the receiving Party prior to disclosure; (c) is independently developed by
            the receiving Party without use of the Confidential Information; or (d) is required to be disclosed by law or court
            order, provided the receiving Party gives prompt written notice to the disclosing Party.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>5. Term</h2>
          <p className={styles.para}>
            This Agreement shall commence on the Effective Date and shall remain in effect for{" "}
            <Blank value={data.duration} placeholder="[e.g. 2 years]" /> unless earlier terminated by either Party upon thirty
            (30) days&rsquo; written notice. The confidentiality obligations shall survive termination of this Agreement for a
            period of{" "}<Blank value={data.duration} placeholder="[e.g. 2 years]" />.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>6. Return of Information</h2>
          <p className={styles.para}>
            Upon request by the disclosing Party, the receiving Party shall promptly return or destroy all Confidential
            Information, including all copies, notes, and summaries thereof, and certify such destruction in writing.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>7. No License</h2>
          <p className={styles.para}>
            Nothing in this Agreement grants either Party any right, title, or interest in or to the other Party&rsquo;s
            Confidential Information, or any intellectual property rights therein, except as expressly provided herein.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>8. Governing Law</h2>
          <p className={styles.para}>
            This Agreement shall be governed by and construed in accordance with the laws of the State of{" "}
            <Blank value={data.governingState} placeholder="[Governing State]" />, without regard to its conflict of laws
            principles.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>9. Entire Agreement</h2>
          <p className={styles.para}>
            This Agreement constitutes the entire agreement between the Parties with respect to its subject matter and supersedes
            all prior and contemporaneous agreements, representations, and understandings. Amendments must be in writing and signed
            by both Parties.
          </p>
        </section>

        <hr className={styles.divider} />

        <p className={styles.para}>
          <strong>IN WITNESS WHEREOF</strong>, the Parties have executed this Mutual Non-Disclosure Agreement as of the Effective
          Date first written above.
        </p>

        <div className={styles.signatureBlock}>
          <div className={styles.sigParty}>
            <p className={styles.sigName}>
              <Blank value={data.party1Name} placeholder="[Party 1 Name]" />
            </p>
            <div className={styles.sigLine}>Signature</div>
            <div className={styles.sigLine}>Printed Name</div>
            <div className={styles.sigLine}>Title</div>
            <div className={styles.sigLine}>Date</div>
          </div>

          <div className={styles.sigParty}>
            <p className={styles.sigName}>
              <Blank value={data.party2Name} placeholder="[Party 2 Name]" />
            </p>
            <div className={styles.sigLine}>Signature</div>
            <div className={styles.sigLine}>Printed Name</div>
            <div className={styles.sigLine}>Title</div>
            <div className={styles.sigLine}>Date</div>
          </div>
        </div>
      </article>
    </div>
  );
}
