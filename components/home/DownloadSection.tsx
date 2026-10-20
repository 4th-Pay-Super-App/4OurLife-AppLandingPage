import Image from "next/image";
import Link from "next/link";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { APP_STORE_QR, APP_STORE_URL, PLAY_STORE_QR, PLAY_STORE_URL } from "@/lib/store-links";
import { RevealLine, STAGGER } from "@/components/landing/motion";
import styles from "./home.module.css";

export function DownloadSection() {
  return (
    <section className={styles.download} id="get-the-app" aria-labelledby="download-heading">
      <span className={styles.downloadOrb} aria-hidden="true" />
      <div className={styles.downloadCopy}>
        <h2 id="download-heading">
          <RevealLine>Start where</RevealLine>
          <RevealLine delay={STAGGER.line}>
            <em>you are.</em>
          </RevealLine>
        </h2>
        <p>4 Our Life is on Google Play and the App Store. Scan a code, or tap a badge.</p>
        <div className={styles.downloadButtons}>
          <a className={styles.darkButton} href={APP_STORE_URL} target="_blank" rel="noreferrer">
            <SiApple className={styles.storeButtonLogo} aria-hidden="true" />
            Download on the App Store <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.outlineButton} href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
            <SiGoogleplay className={styles.storeButtonLogo} aria-hidden="true" />
            Get it on Google Play <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className={styles.businessInvite}>
          Run a care service?{" "}
          <Link href="mailto:hello@4ourlife.com?subject=4%20Our%20Life%20business%20interest">
            Talk to our team <span aria-hidden="true">↗</span>
          </Link>
        </p>
      </div>
      <div className={styles.qrGroup}>
        <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
          <Image src={APP_STORE_QR} width={118} height={118} alt="QR code: scan to open 4 Our Life on the App Store" />
          <span>App Store</span>
        </a>
        <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
          <Image src={PLAY_STORE_QR} width={118} height={118} alt="QR code: scan to open 4 Our Life on Google Play" />
          <span>Google Play</span>
        </a>
      </div>
    </section>
  );
}
