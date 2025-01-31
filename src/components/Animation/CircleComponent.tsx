'use client'
import React from 'react';
import styles from './CircleComponent.module.css'; 

const supportingStandards = [
    'MIL', 'DO 160', 'ASTM', 'ASME', 'NABL',
    'FDA', 'ISO', 'ISI', 'CE', 'NADCAP'
];

const CircleComponent = () => {
  return (
    <section className={`md:p-20 p-5  ${styles['hexagon-gallery']}`}>
      {supportingStandards.map((standard, index) => (
        <div className={styles['hex']} key={index}>
          <span className={styles['hex-text']}>{standard}</span>
        </div>
      ))}
    </section>
  );
};

export default CircleComponent;
