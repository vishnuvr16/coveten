'use client'
import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// TypeScript interface for props
interface AnimatedTitleProps {
  text: string;
  onAnimationComplete?: () => void;
}

// Styled-components for Title, Word, and Character
const Title = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  color: lightseagreen;

 @media (max-width: 768px) { 
    font-size: 1.8rem;
    white-space: nowrap;
    margin-top:1em;
  }



  @media (max-width: 640px) { 
    font-size: 2rem;
    white-space: nowrap;
    margin-top:1em;
  }

   @media (max-width: 300px) { 
    font-size: 1.5rem;
    white-space: nowrap;
    margin-top:1em;
  }
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(motion.span)`
  display: inline-block;
  margin-right: -0.05em;
`;

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, onAnimationComplete }) => {
  const ctrls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible").then(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      });
    } else {
      ctrls.start("hidden");
    }
  }, [ctrls, inView, onAnimationComplete]);

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <Title aria-label={text} role="heading">
      {text.split(" ").map((word, wordIndex) => (
        <Word
          ref={ref}
          aria-hidden="true"
          key={wordIndex}
          initial="hidden"
          animate={ctrls}
          variants={wordAnimation}
          transition={{
            delayChildren: wordIndex * 0.25,
            staggerChildren: 0.05,
          }}
        >
          {word.split("").map((character, charIndex) => (
            <Character
              aria-hidden="true"
              key={charIndex}
              variants={characterAnimation}
            >
              {character}
            </Character>
          ))}
        </Word>
      ))}
    </Title>
  );
};

export default AnimatedTitle;
