'use client'
import * as THREE from 'three';
import { useEffect, useRef } from "react";

function MyThree() {
  const refContainer = useRef(null);
  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild(renderer.domElement);

    var geometry = new THREE.PlaneGeometry(2, 2);

    var material = new THREE.ShaderMaterial({
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

        // Cloud shader from Book of Shaders
        float random (in vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
        }

        float noise (in vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);

          // Four corners in 2D of a tile
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));

          // Smooth Interpolation

          // Cubic Hermine Curve.  Same as SmoothStep()
          vec2 u = f*f*(3.0-2.0*f);
          // u = smoothstep(0.0,1.0,f);

          // Mix 4 coorners percentages
          return mix(a, b, u.x) +
                  (c - a)* u.y * (1.0 - u.x) +
                  (d - b) * u.x * u.y;
        }

        #define OCTAVES 10
        float fbm (in vec2 st) {
          // Initial values
          float value = 0.0;
          float amplitude = .5;
          float frequency = 0.;
          //
          // Loop of octaves
          for (int i = 0; i < OCTAVES; i++) {
              value += amplitude * noise(st);
              st *= 2.;
              amplitude *= .5;
          }
          return value;
        }

        void main() {
          vec2 st = gl_FragCoord.xy/iResolution.xy;
          vec3 color = vec3(0.0);
          vec2 q = vec2(0.);
          q.x = fbm( st + 0.00*iTime);
          q.y = fbm( st + vec2(1.0));

          vec2 r = vec2(0.);
          r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*iTime );
          r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*iTime);

          float f = fbm(st+r);

          color = mix(vec3(0.101961,0.619608,0.666667),
                      vec3(0.666667,0.666667,0.498039),
                      clamp((f*f)*4.0,0.0,1.0));

          color = mix(color,
                      vec3(0,0,0.164706),
                      clamp(length(q),0.0,1.0));

          color = mix(color,
                      vec3(0.666667,1,1),
                      clamp(length(r.x),0.0,1.0));

          gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.0);
        }
      `
    });

    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 1;

    var animate = function () {
      requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.05;
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return (
    <div ref={refContainer}></div>
  );
}

export default MyThree
