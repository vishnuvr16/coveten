import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import styles from './Certifications.module.css'; // Importing styles from the CSS Module
import LiIcon from './LiIcon';

interface CertificationDetailsProps {
    title: string;
}

const CertificationDetails: React.FC<CertificationDetailsProps> = ({ title }) => {
    const liRef = useRef<HTMLLIElement>(null);

    // Callback ref instead of useRef<SVGElement>
    const iconRef = (node: SVGElement | null) => {
    };

    return (
        <li ref={liRef} className={styles.certificationItem}>
              <LiIcon reference={iconRef} />
            <motion.div 
                initial={{ y: 50 }} 
                whileInView={{ y: 0 }} 
                transition={{ duration: 0.5, type: "spring" }} 
                className={styles.certificationContent}
            >
                <h3 className={styles.certificationTitle}>{title}</h3>
            </motion.div>
        </li>
    );
};

const Certifications: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"],
    });

    const certifications = ['ISO 9001', 'ISO 14001', 'ISO 25001', 'NSC', 'DBIIT', 'MSME'];

    return (
        <div className={styles.certificationsSection}>
            <div ref={ref} className={styles.certificationsListContainer}>
                <motion.div 
                    style={{ scaleY: scrollYProgress }} 
                    className={styles.certificationsTimeline} 
                />
                <ul className={styles.certificationsList}>
                    {certifications.map((cert, index) => (
                        <CertificationDetails key={index} title={cert} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Certifications;  
