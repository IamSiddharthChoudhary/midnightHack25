"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function BgComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  
  const materialsRef = useRef<{
    fluidMaterial: THREE.ShaderMaterial | null;
    displayMaterial: THREE.ShaderMaterial | null;
  }>({ fluidMaterial: null, displayMaterial: null })
  
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, lastMoveTime: 0 })

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const vertexShader = `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fluidShader = `
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec4 iMouse;
      uniform int iFrame;
      uniform sampler2D iPreviousFrame;
      uniform float uBrushSize;
      uniform float uBrushStrength;
      uniform float uFluidDecay;
      uniform float uTrailLength;
      uniform float uStopDecay;
      varying vec2 vUv;

      vec2 ur, U;

      float ln(vec2 p, vec2 a, vec2 b) {
        return length(p - a - (b - a) * clamp(dot(p - a, b - a) / dot(b - a, b - a), 0.0, 1.0));
      }
      
      vec4 t(vec2 v, int a, int b) {
        return texture2D(iPreviousFrame, fract((v + vec2(float(a), float(b))) / ur));
      }
      
      vec4 t(vec2 v) {
        return texture2D(iPreviousFrame, fract(v / ur));
      }

      float area(vec2 a, vec2 b, vec2 c) {
        float A = length(b - c), B = length(c - a), C = length(a - b), s = 0.5 * (A + B + C);
        return sqrt(max(0.0, s * (s - A) * (s - B) * (s - C))); 
      }

      void main() {
        U = vUv * iResolution;
        ur = iResolution.xy;

        if (iFrame < 1) {
          float w = 0.5 + sin(0.2 * U.x) * 0.5;
          float q = length(U - 0.5 * ur);
          gl_FragColor = vec4(0.1 * exp(-0.001 * q), 0.0, w, 1.0);
        } else {
          vec2 v = U;
          vec2 A = v + vec2(1, 1);
          vec2 B = v + vec2(1, -1);
          vec2 C = v + vec2(-1, 1);
          vec2 D = v + vec2(-1, -1);

          // Reduced iterations from 8 to 4 for better performance
          for (int i = 0; i < 4; i++) {
            v -= t(v).xy;
            A -= t(A).xy;
            B -= t(B).xy;
            C -= t(C).xy;
            D -= t(D).xy;
          }

          vec4 me = t(v);
          vec4 n = t(v, 0, 1);
          vec4 e = t(v, 1, 0);
          vec4 s = t(v, 0, -1);
          vec4 w = t(v, -1, 0);
          vec4 ne = 0.25 * (n + e + s + w);
          me = mix(t(v), ne, vec4(0.15, 0.15, 0.95, 0.0));
          me.z = me.z - 0.01 * ((area(A, B, C) + area(B, C, D)) - 4.0);

          vec4 pr = vec4(e.z, w.z, n.z, s.z);
          me.xy = me.xy + 100.0 * vec2(pr.x - pr.y, pr.z - pr.w) / ur;

          me.xy *= uFluidDecay;
          me.z *= uTrailLength;
          
          if (iMouse.z > 0.0) {
            vec2 mousePos = iMouse.xy;
            vec2 mousePrev = iMouse.zw;
            vec2 mouseVel = mousePos - mousePrev;
            float velMagnitude = length(mouseVel);
            float q = ln(U, mousePos, mousePrev);
            vec2 m = mousePos - mousePrev;
            float l = length(m);
            if (l > 0.0) m = min(10.0, 10.0) * m / l;

            float brushSizeFactor = 1e-4 / uBrushSize;
            float strengthFactor = 0.03 * uBrushStrength;

            float falloff = exp(-brushSizeFactor * q * q * q);
            falloff = pow(falloff, 0.5);

            me.xyz += strengthFactor * falloff * vec3(m, 10.0);

            if (velMagnitude < 2.0) {
              float distToCursor = length(U - mousePos);
              float influence = exp(-distToCursor * 0.01);
              float cursorDecay = mix(1.0, uStopDecay, influence);
              me.xy *= cursorDecay;
              me.z *= cursorDecay;
            }
          }

          gl_FragColor = clamp(me, -0.4, 0.4);
        }
      }
    `

    const displayShader = `
      uniform float iTime;
      uniform vec2 iResolution;
      uniform sampler2D iFluid;
      uniform float uDistortionAmount;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;
      uniform float uColorIntensity;
      uniform float uSoftness;
      varying vec2 vUv;

      void main() {
        vec2 fragCoord = vUv * iResolution;

        vec4 fluid = texture2D(iFluid, vUv);
        vec2 fluidVel = fluid.xy;

        float mr = min(iResolution.x, iResolution.y);
        vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;

        uv += fluidVel * (0.5 * uDistortionAmount);

        float d = -iTime * 0.5;
        float a = 0.0;
        
        // Reduced iterations from 8 to 5 for better performance
        for (float i = 0.0; i < 5.0; ++i) {
          a += cos(i - d - a * uv.x);
          d += sin(uv.y * i + a);
        }

        d += iTime * 0.5;

        float mixer1 = cos(uv.x * d) * 0.5 + 0.5;
        float mixer2 = cos(uv.y * a) * 0.5 + 0.5;
        float mixer3 = sin(d + a) * 0.5 + 0.5;

        float smoothAmount = clamp(uSoftness * 0.1, 0.0, 0.9);
        mixer1 = mix(mixer1, 0.5, smoothAmount);
        mixer2 = mix(mixer2, 0.5, smoothAmount);
        mixer3 = mix(mixer3, 0.5, smoothAmount);

        vec3 col = mix(uColor1, uColor2, mixer1);
        col = mix(col, uColor3, mixer2);
        col = mix(col, uColor4, mixer3 * 0.4);

        col *= uColorIntensity;

        gl_FragColor = vec4(col, 1.0);
      }
    `

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for better performance
      powerPreference: "high-performance"
    })
    rendererRef.current = renderer

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)) // Limit pixel ratio
    canvasRef.current.appendChild(renderer.domElement)

    // Reduced resolution for fluid simulation (50% of screen size)
    const fluidWidth = Math.floor(window.innerWidth * 0.5)
    const fluidHeight = Math.floor(window.innerHeight * 0.5)

    const fluidTarget1 = new THREE.WebGLRenderTarget(
      fluidWidth,
      fluidHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.HalfFloatType, // Use HalfFloat instead of Float for better performance
      }
    )

    const fluidTarget2 = new THREE.WebGLRenderTarget(
      fluidWidth,
      fluidHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.HalfFloatType,
      }
    )

    let currentFluidTarget = fluidTarget1
    let previousFluidTarget = fluidTarget2
    let frameCount = 0
    let lastFrameTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    const fluidMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(fluidWidth, fluidHeight),
        },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: 25 },
        uBrushStrength: { value: 0.5 },
        uFluidDecay: { value: 0.98 },
        uTrailLength: { value: 0.8 },
        uStopDecay: { value: 0.85 },
      },
      vertexShader,
      fragmentShader: fluidShader,
    })

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        iFluid: { value: null },
        uDistortionAmount: { value: 2.5 },
        uColor1: { value: new THREE.Vector3(0.0392156862745098, 0.043137254901960784, 0.043137254901960784) },
        uColor2: { value: new THREE.Vector3(0.5607843137254902, 0.5607843137254902, 0.4) },
        uColor3: { value: new THREE.Vector3(0.0392156862745098, 0.0392156862745098, 0.0392156862745098) },
        uColor4: { value: new THREE.Vector3(0.07058823529411765, 0.07058823529411765, 0.07058823529411765) },
        uColorIntensity: { value: 1.0 },
        uSoftness: { value: 1.0 }
      },
      vertexShader,
      fragmentShader: displayShader,
    })

    materialsRef.current = { fluidMaterial, displayMaterial }

    const geometry = new THREE.PlaneGeometry(2, 2)
    const fluidPlane = new THREE.Mesh(geometry, fluidMaterial)
    const displayPlane = new THREE.Mesh(geometry, displayMaterial)

    function animate(currentTime: number) {
      animationFrameRef.current = requestAnimationFrame(animate)

      // Frame rate limiting
      const deltaTime = currentTime - lastFrameTime
      if (deltaTime < frameInterval) {
        return
      }
      lastFrameTime = currentTime - (deltaTime % frameInterval)

      const time = performance.now() * 0.001
      fluidMaterial.uniforms.iTime.value = time
      displayMaterial.uniforms.iTime.value = time
      fluidMaterial.uniforms.iFrame.value = frameCount

      if (performance.now() - mouseRef.current.lastMoveTime > 100) {
        fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0)
      }

      fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture

      renderer.setRenderTarget(currentFluidTarget)
      renderer.render(fluidPlane, camera)

      displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture

      renderer.setRenderTarget(null)
      renderer.render(displayPlane, camera)

      const temp = currentFluidTarget
      currentFluidTarget = previousFluidTarget
      previousFluidTarget = temp

      frameCount++
    }

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      renderer.setSize(width, height)
      displayMaterial.uniforms.iResolution.value.set(width, height)

      const newFluidWidth = Math.floor(width * 0.5)
      const newFluidHeight = Math.floor(height * 0.5)
      
      fluidMaterial.uniforms.iResolution.value.set(newFluidWidth, newFluidHeight)
      fluidTarget1.setSize(newFluidWidth, newFluidHeight)
      fluidTarget2.setSize(newFluidWidth, newFluidHeight)
      frameCount = 0
    }

    window.addEventListener("resize", handleResize)
    animate(0)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      renderer.dispose()
      fluidTarget1.dispose()
      fluidTarget2.dispose()
      geometry.dispose()
      fluidMaterial.dispose()
      displayMaterial.dispose()
      materialsRef.current = { fluidMaterial: null, displayMaterial: null }
      rendererRef.current = null
    }
  }, [])

  useEffect(() => {
    const canvas = rendererRef.current?.domElement
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!materialsRef.current.fluidMaterial) return

      const rect = canvas.getBoundingClientRect()

      mouseRef.current.prevX = mouseRef.current.x
      mouseRef.current.prevY = mouseRef.current.y

      // Scale mouse coordinates to fluid resolution
      const scaleX = materialsRef.current.fluidMaterial.uniforms.iResolution.value.x / rect.width
      const scaleY = materialsRef.current.fluidMaterial.uniforms.iResolution.value.y / rect.height

      mouseRef.current.x = (e.clientX - rect.left) * scaleX
      mouseRef.current.y = (rect.height - (e.clientY - rect.top)) * scaleY
      mouseRef.current.lastMoveTime = performance.now()

      materialsRef.current.fluidMaterial.uniforms.iMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y,
        mouseRef.current.prevX,
        mouseRef.current.prevY
      )
    }

    const handleMouseLeave = () => {
      if (materialsRef.current.fluidMaterial) {
        materialsRef.current.fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0)
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      <div ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />
    </div>
  )
}