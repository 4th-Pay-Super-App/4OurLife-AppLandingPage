import Image from "next/image";
import Link from "next/link";
import { Grain, SmoothScroll } from "@/components/landing/motion";
import { BusinessStory } from "./BusinessStory";
import { ConsumerChapter } from "./ConsumerChapter";
import { DownloadSection } from "./DownloadSection";
import { EverydayTools } from "./EverydayTools";
import { SiteNavigation } from "./SiteNavigation";
import styles from "./home.module.css";

export default function HomeExperience() {
  return (
    <SmoothScroll>
      <div className={styles.page}>
        <a className={styles.skipLink} href="#main-content">
          Skip to content
        </a>
        <Grain />
        <SiteNavigation />
        <main id="main-content">
          <ConsumerChapter />
          <EverydayTools />
          <BusinessStory />
          <DownloadSection />
        </main>
        <footer className={styles.footer}>
          <Link href="#top" className={styles.footerBrand} aria-label="4 Our Life, back to top">
            <Image src="/brand/4ol-logo.png" alt="" width={30} height={27} className={styles.brandLogo} />
            <span>4 OUR LIFE</span>
          </Link>
          <p>Everyday health. Care closer to home.</p>
          <nav aria-label="Footer">
            <Link href="#people">For you</Link>
            <Link href="#business">For business</Link>
            <Link href="/plans">Plans</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-service">Terms</Link>
            <a href="mailto:hello@4ourlife.com">Contact</a>
          </nav>
          <span className={styles.copyright}>© {new Date().getFullYear()} 4 Our Life · Ghana</span>
        </footer>
      </div>
    </SmoothScroll>
  );
}
