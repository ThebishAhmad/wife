import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HexagonBackgroundProps {
  hexagonSize?: number;
  hexagonMargin?: number;
  className?: string;
}

export const HexagonBackground: React.FC<HexagonBackgroundProps> = ({
  hexagonSize = 80,
  hexagonMargin = 4,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawHexagons();
    };

    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const xPos = x + size * Math.cos(angle);
        const yPos = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255, 105, 180, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const drawHexagons = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const hexWidth = hexagonSize * 2 + hexagonMargin;
      const hexHeight = Math.sqrt(3) * hexagonSize + hexagonMargin;
      const cols = Math.ceil(canvas.width / (hexWidth * 0.75)) + 1;
      const rows = Math.ceil(canvas.height / hexHeight) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth * 0.75;
          const y = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0);
          
          // Create subtle opacity variation
          const baseOpacity = 0.15;
          const variation = Math.sin(Date.now() * 0.0005 + col * 0.5 + row * 0.5) * 0.1;
          const opacity = baseOpacity + variation;
          
          drawHexagon(x, y, hexagonSize, opacity);
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    let animationId: number;
    const animate = () => {
      drawHexagons();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [hexagonSize, hexagonMargin]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none', className)}
    />
  );
};
