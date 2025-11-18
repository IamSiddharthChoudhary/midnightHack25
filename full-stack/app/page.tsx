"use client"
import { BgComponent } from "@/components/silkbg";
import { useEffect, useRef, useState } from "react";

const strings = [
  "PRIVATE QUOTES.\nPUBLIC PROOF.\nZERO LEAKAGE.",
  "WIN THE DEAL.\nKEEP YOUR PRICE\nA SECRET.",
  "BID IN SHADOWS.\nWIN IN THE LIGHT.\nZK POWERED.",
  "THE MOST PRIVATE\nRFQ SYSTEM EVER\nBUILT.",
  "YOUR PRICE IS\nYOUR SECRET.\nFOREVER.",
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    hero.innerHTML = strings[index].replace(/\n/g, "<br>");

    const startTextCycle = () => {
      let iterations = 0;
      const currentIndex = index;
      const nextIndex = (currentIndex + 1) % strings.length;
      const nextText = strings[nextIndex];
      const nextTextLines = nextText.split("\n");

      const interval = setInterval(() => {
        const animatedLines = nextTextLines.map((line, lineIndex) => {
          return line
            .split("")
            .map((letter, i) => {
              if (i < iterations) {
                return letter;
              }
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        });

        hero.innerHTML = animatedLines.join("<br>");

        iterations += 1;

        if (
          iterations > Math.max(...nextTextLines.map((line) => line.length))
        ) {
          clearInterval(interval);
          setIndex(nextIndex);
        }
      }, 50);
    };

    const initialTimeout = setTimeout(startTextCycle, 3000);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, [index, strings]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video background */}
      <video 
        src="./bg2.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      
      {/* Three.js background with distortion */}
      <div className="absolute top-0 left-0 w-full h-full">
        <BgComponent />
      </div>
      
      {/* Text content - positioned above but with pointer-events disabled */}
      <div className="absolute top-0 left-0 flex flex-col items-center justify-center h-full w-full px-4 pointer-events-none">
        <div className="flex items-center justify-center mb-16 pointer-events-none">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl space-mono-bold font-mono text-center whitespace-pre-line wrap-break-word leading-tight pointer-events-none select-none"
            ref={heroRef}
          />
        </div>
      </div>
    </div>
  );
}