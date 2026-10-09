import React, { useEffect, useState } from 'react';

/**
 * DecryptedText - Component terinspirasi dari reactbits.dev
 * Ringan, tanpa library berat, menggunakan setInterval dan random characters.
 */
export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 12,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><',
  className = '',
  parentClassName = '',
  animateOn = 'view', // 'view' or 'hover'
  revealDirection = 'start',
  sequential = true,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    let interval;
    let iteration = 0;

    const startAnimation = () => {
      iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        setDisplayText(() =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (sequential) {
                if (index < iteration) {
                  return text[index];
                }
              } else {
                if (iteration >= maxIterations) {
                  return text[index];
                }
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        iteration += 1;

        if (iteration > (sequential ? text.length + 3 : maxIterations)) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, speed);
    };

    if (animateOn === 'view' && !hasAnimated) {
      startAnimation();
      setHasAnimated(true);
    } else if (animateOn === 'hover' && isHovering) {
      startAnimation();
    }

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, characters, animateOn, isHovering, sequential]);

  return (
    <span
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => {
        if (animateOn === 'hover') setIsHovering(true);
      }}
      onMouseLeave={() => {
        if (animateOn === 'hover') setIsHovering(false);
      }}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}
