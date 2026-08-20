import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'pop' | 'none';
  duration?: number;
  className?: string;
  mode?: 'default' | 'letters' | 'words';
  staggerDelay?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = "",
  mode = 'default',
  staggerDelay = 0.025
}: ScrollRevealProps) {
  const getOffsets = () => {
    switch (direction) {
      case 'up': return { y: 40, x: 0 };
      case 'down': return { y: -40, x: 0 };
      case 'left': return { y: 0, x: 40 };
      case 'right': return { y: 0, x: -40 };
      case 'pop': return { y: 0, x: 0 };
      case 'none': return { y: 0, x: 0 };
      default: return { y: 40, x: 0 };
    }
  };

  const offsets = getOffsets();

  // Orchestration variants to stagger nested child elements automatically
  const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }
    }
  };

  const wordChildVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 11
      }
    }
  };

  const letterChildVariants = {
    hidden: { opacity: 0, scale: 0, y: 12, rotate: -3 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 10
      }
    }
  };

  // Helper to split text strings into individual popping letter/word spans
  const splitText = (
    text: string, 
    splitMode: 'letters' | 'words'
  ) => {
    const words = text.split(' ');
    
    return words.map((word, wordIdx) => {
      if (splitMode === 'words') {
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            <motion.span
              className="inline-block origin-bottom"
              variants={wordChildVariants}
            >
              {word}
            </motion.span>
            {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      } else {
        // letters
        const letters = Array.from(word);
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {letters.map((char, charIdx) => {
              return (
                <motion.span
                  key={charIdx}
                  className="inline-block origin-bottom"
                  variants={letterChildVariants}
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      }
    });
  };

  // Recursively process children to replace strings with individual animated letter/word spans
  const renderAndAnimate = (
    node: React.ReactNode, 
    splitMode: 'letters' | 'words'
  ): React.ReactNode => {
    if (node === null || node === undefined) {
      return node;
    }

    if (typeof node === 'string') {
      return splitText(node, splitMode);
    }
    
    if (typeof node === 'number') {
      return splitText(String(node), splitMode);
    }

    if (React.isValidElement(node)) {
      const props = node.props as any;
      if (props && props.children) {
        // Recursively map all child elements
        const animatedChildren = React.Children.map(props.children, (child) =>
          renderAndAnimate(child, splitMode)
        );
        return React.cloneElement(node as React.ReactElement, {
          ...props,
          children: animatedChildren,
        });
      }
    }

    return node;
  };

  if (mode === 'letters' || mode === 'words') {
    return (
      <motion.div 
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
        variants={parentVariants}
      >
        {renderAndAnimate(children, mode)}
      </motion.div>
    );
  }

  // Beautiful Spring Pop animation for standard elements
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: direction === 'none' ? 1 : 0.88, 
        y: offsets.y * 0.8, 
        x: offsets.x * 0.8 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        x: 0 
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ 
        type: "spring",
        stiffness: 120, // bouncy spring stiffness
        damping: 12,    // slight overshoot/settle bounce
        mass: 0.85,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
