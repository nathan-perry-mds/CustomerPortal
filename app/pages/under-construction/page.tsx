import React from 'react';
import Head from 'next/head';
import styles from '../../styles/under-construction.module.css';

const UnderConstruction = () => {
  return (
    <>
      <Head>
        <title>MDS Coating Customer Portal Under Construction</title>
        <meta name="description" content="MDS Coating Customer Portal is under construction. Stay tuned for updates." />
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>MDS Coating Customer Portal</h1>
          <h2 className={styles.subtitle}>Under Construction</h2>
          <p className={styles.text}>We are working hard to bring you a new and improved experience. Stay tuned for updates!</p>
        </div>
      </div>
    </>
  );
};

export default UnderConstruction;
