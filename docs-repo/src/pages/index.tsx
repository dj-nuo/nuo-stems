import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx("hero", styles.heroBanner)}
      style={{
        backgroundColor: "#0a0a0a",
        height: "100vh",
        paddingBottom: "300px",
      }}
    >
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{ borderRadius: "30px" }}
          >
            NUO-STEMS 4 docs 🚀
          </Link>
        </div>
        or
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/v3/"
            style={{ borderRadius: "30px" }}
          >
            NUO-STEMS 3 docs
          </Link>
        </div>
        or
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog"
            style={{ borderRadius: "30px" }}
          >
            Read the blog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  );
}
