"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setComplete(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const characters = words.split("").map((char, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: complete ? 1 : 0,
        y: complete ? 0 : 10,
      }}
      transition={{
        duration: 0.2,
        delay: complete ? i * 0.1 : 0,
      }}
    >
      {char}
    </motion.span>
  ));

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="flex items-center justify-center space-x-1">
          {characters}
        </div>
      </div>
    </div>
  );
}; 