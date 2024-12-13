"use client";
import { useEffect, useRef } from "react";
import { cn } from "../../../utils/cn";

export const BackgroundBeams = ({
  className,
}: {
  className?: string;
}) => {
  const beamsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = beamsRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const effect = new BeamEffect(canvas, ctx);

    function animate() {
      effect.animate();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      effect.destroy();
    };
  }, []);

  return (
    <canvas
      ref={beamsRef}
      className={cn("pointer-events-none", className)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    ></canvas>
  );
};

class BeamEffect {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  beams: Beam[];
  numberOfBeams: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.beams = [];
    this.numberOfBeams = 10;
    this.initialize();
  }

  initialize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.createBeams();
  }

  createBeams() {
    for (let i = 0; i < this.numberOfBeams; i++) {
      this.beams.push(new Beam(this.canvas));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.beams.forEach((beam) => {
      beam.update();
      beam.draw(this.ctx);
    });
  }

  destroy() {
    this.beams = [];
  }
}

class Beam {
  canvas: HTMLCanvasElement;
  x!: number;
  y!: number;
  width!: number;
  height!: number;
  speed!: number;
  opacity!: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.width = Math.random() * 2 + 0.2;
    this.height = Math.random() * 200 + 100;
    this.speed = Math.random() * 0.5 + 0.1;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.y -= this.speed;
    if (this.y + this.height < 0) {
      this.reset();
      this.y = this.canvas.height;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.strokeStyle = `rgba(147, 51, 234, ${this.opacity})`;
    ctx.lineWidth = this.width;
    ctx.stroke();
  }
} 