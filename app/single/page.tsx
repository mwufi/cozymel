'use client'
import * as THREE from 'three';
import { useEffect, useRef } from "react";

function MyThree() {
  const refContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight / 2), 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight / 2);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild(renderer.domElement);

    const createRectangle = (color1: string, color2: string, fbmFunction: string) => {
      const geometry = new THREE.PlaneGeometry(1, 5);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0.0 },
          
          iResolution: { value: new THREE.Vector3() }
        },
        vertexShader: `
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 iResolution;
          uniform float iTime;

          float random (in vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }

          float noise (in vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);

            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));

            vec2 u = f*f*(3.0-2.0*f);

            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          #define OCTAVES 10
          float fbm (in vec2 st) {
            float value = 0.0;
            float amplitude = .5;
            float frequency = 0.;
            for (int i = 0; i < OCTAVES; i++) {
                value += amplitude * noise(st);
                st *= 2.;
                amplitude *= .5;
            }
            return value;
          }

          void main() {
            vec2 st = gl_FragCoord.xy / iResolution.xy;
            vec3 color = mix(vec3(${color1}), vec3(${color2}), st.y);
            float f = ${fbmFunction}(st + vec2(iTime * 0.1, 0.0));
            color = mix(color, vec3(1.0), clamp(f, 0.0, 1.0));
            gl_FragColor = vec4(color, 1.0);
          }
        `
      });

      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);
      return material;
    };

    const materials = [
      createRectangle('1.0, 0.5, 0.5', '1.0, 0.8, 0.8', 'fbm'),
      createRectangle('0.0, 0.0, 1.0', '1.0, 1.0, 0.0', 'fbm'),
      createRectangle('1.0, 0.5, 0.5', '0.8, 0.2, 0.5', 'fbm'),
      createRectangle('0.5, 0.0, 0.5', '0.8, 0.5, 0.8', 'fbm'),
      createRectangle('0.0, 0.5, 1.0', '0.0, 0.8, 1.0', 'fbm')
    ];

    const planes = materials.map((material, index) => {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 5), material);
      plane.position.x = index * 1.2 - 2.4;
      scene.add(plane);
      return plane;
    });

    materials.forEach((material, index) => {
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight / 2, 1);
    });

    camera.position.z = 10;

    const animate = function () {
      requestAnimationFrame(animate);
      materials.forEach(material => {
        material.uniforms.iTime.value += 0.05;
      });
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return (
    <div ref={refContainer} style={{ width: '100vw', height: '50vh' }}></div>
  );
}

export default MyThree
