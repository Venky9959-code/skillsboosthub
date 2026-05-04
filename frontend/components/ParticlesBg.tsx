"use client";
import Particles from "react-tsparticles";

export default function ParticlesBg() {
  return (
    <Particles
      options={{
        particles: {
          number: { value: 40 },
          size: { value: 2 },
          move: { speed: 1 },
        },
      }}
      className="absolute inset-0"
    />
  );
}