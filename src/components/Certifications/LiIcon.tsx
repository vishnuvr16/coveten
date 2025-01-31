import React, { RefCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './LiIcon.module.css';  // Using module CSS in Next.js

interface LiIconProps {
  reference?: RefCallback<SVGElement>;
}

const LiIcon: React.FC<LiIconProps> = ({ reference }) => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    return (
        <figure className={styles['li-icon']}>
            <svg
                className={styles['li-icon-svg']}
                width="75"
                height="75"
                viewBox="0 0 100 100"
                ref={(node) => {
                    ref(node as SVGElement | null); // Correct ref typing for SVGElement
                    if (reference && typeof reference === 'function') {
                        reference(node as SVGElement | null); // Pass the SVGElement ref
                    }
                }}
            >
                {/* Outer static circle */}
                <circle
                    cx="75"
                    cy="50"
                    r="20"
                    className={styles['li-icon-circle']}
                />
                {/* Outer animated circle */}
                <motion.circle
                    cx="75"
                    cy="50"
                    r="20"
                    className={styles['li-icon-motion-circle']}
                    initial={{ pathLength: 0, fill: 'none' }}
                    animate={{
                        pathLength: inView ? 1 : 0,
                        fill: inView ? '#f5f5f5' : 'none',
                    }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
                {/* Inner pulse circle */}
                <circle
                    cx="75"
                    cy="50"
                    r="10"
                    className={styles['li-icon-pulse-circle']}
                />
            </svg>
        </figure>
    );
};

export default LiIcon;
