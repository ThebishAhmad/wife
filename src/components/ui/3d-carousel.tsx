import { useEffect, useRef, useState, ReactNode } from "react";
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { cn } from "@/lib/utils";

interface CarouselProps {
  items: string[];
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
}

export const Carousel3D = ({
  items,
  width = 450,
  height = 600,
  className = "",
  containerClassName = "",
}: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<CSS3DRenderer | null>(null);
  const carouselRef = useRef<THREE.Object3D | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const rotationVelocityRef = useRef(0);
  const targetRotationRef = useRef(0);

  const sensitivity = 0.005;
  const radius = 750;

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(50, 1, 1, 5000);
    camera.position.z = 550;
    camera.position.y = 70;
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new CSS3DRenderer();
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    renderer.setSize(containerWidth, containerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create carousel
    const carousel = new THREE.Object3D();
    carouselRef.current = carousel;
    scene.add(carousel);

    // Add items
    items.forEach((image, index) => {
      const element = document.createElement("div");
      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
      element.className = "rounded-lg shadow-2xl";
      element.style.backgroundImage = `url(${image})`;
      element.style.backgroundSize = "cover";
      element.style.backgroundPosition = "center";

      const object = new CSS3DObject(element);
      const angle = (index / items.length) * Math.PI * 2;
      object.position.setFromSphericalCoords(radius, Math.PI / 2, angle);
      object.lookAt(carousel.position);

      carousel.add(object);
    });

    // Initial rotation
    carousel.rotation.x = THREE.MathUtils.degToRad(20);

    // Animation loop for continuous rotation
    const animate = () => {
      if (!isDragging) {
        rotationVelocityRef.current *= 0.95; // Damping
        carousel.rotation.y += rotationVelocityRef.current;
        
        if (Math.abs(rotationVelocityRef.current) < 0.0001) {
          rotationVelocityRef.current += 0.001; // Slow continuous rotation
        }
      }
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [items, width, height]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    currentXRef.current = clientX;
    rotationVelocityRef.current = 0;
  };

  const handleDrag = (clientX: number) => {
    if (!isDragging || !carouselRef.current) return;
    const deltaX = clientX - currentXRef.current;
    currentXRef.current = clientX;
    
    carouselRef.current.rotation.y += -deltaX * sensitivity;
    rotationVelocityRef.current = -deltaX * sensitivity;
    
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-[60vh] relative", containerClassName)}
    >
      <div
        className={cn("absolute top-[40%] translate-y-[-50%] left-0 w-full h-[80%] z-[100]", className)}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onMouseMove={(e) => handleDrag(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        onTouchMove={(e) => {
          e.preventDefault();
          handleDrag(e.touches[0].clientX);
        }}
      />
    </div>
  );
};
