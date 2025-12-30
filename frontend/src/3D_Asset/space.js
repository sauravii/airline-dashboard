import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function SpaceBackground({ containerRef }) {
  const animationId = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const starsRef = useRef(null)
  const nebulaRef = useRef(null)
  const clockRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // ===== SCENE =====
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    )
    camera.position.z = 4
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    rendererRef.current = renderer
    containerRef.current.appendChild(renderer.domElement)

    // ===== LIGHT =====
    scene.add(new THREE.AmbientLight(0xffffff, 0.25))

    // ===== STARFIELD =====
    const starCount = 2000
    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(starCount * 3)

    for (let i = 0; i < starPositions.length; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 120
      starPositions[i + 1] = (Math.random() - 0.5) * 120
      starPositions[i + 2] = -Math.random() * 120
    }

    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    )

    const starMaterial = new THREE.PointsMaterial({
      color: 0xbad7ff,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
      depthWrite: false
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    starsRef.current = stars
    scene.add(stars)

    // ===== NEBULA =====
    const nebulaCount = 800
    const nebulaGeometry = new THREE.BufferGeometry()
    const nebulaPositions = new Float32Array(nebulaCount * 3)
    const nebulaColors = new Float32Array(nebulaCount * 3)

    const colors = [
      new THREE.Color(0x6a5acd),
      new THREE.Color(0x4169e1),
      new THREE.Color(0x00bfff)
    ]

    for (let i = 0; i < nebulaCount; i++) {
      const i3 = i * 3
      nebulaPositions[i3] = (Math.random() - 0.5) * 80
      nebulaPositions[i3 + 1] = (Math.random() - 0.5) * 80
      nebulaPositions[i3 + 2] = -Math.random() * 80

      const c = colors[Math.floor(Math.random() * colors.length)]
      nebulaColors[i3] = c.r
      nebulaColors[i3 + 1] = c.g
      nebulaColors[i3 + 2] = c.b
    }

    nebulaGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(nebulaPositions, 3)
    )
    nebulaGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(nebulaColors, 3)
    )

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 0.6,
      transparent: true,
      opacity: 0.08,
      vertexColors: true,
      depthWrite: false
    })

    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial)
    nebulaRef.current = nebula
    scene.add(nebula)

    // ===== ANIMATE =====
    const clock = new THREE.Clock()
    clockRef.current = clock
    let isRunning = true

    const animate = () => {
      if (!isRunning) return
      
      animationId.current = requestAnimationFrame(animate)
      const delta = clock.getDelta()

      if (starsRef.current) {
        starsRef.current.rotation.y += delta * 0.03
        starsRef.current.rotation.x += delta * 0.015
      }

      if (nebulaRef.current) {
        nebulaRef.current.rotation.y += delta * 0.01
        nebulaRef.current.rotation.x += delta * 0.005
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    // ===== RESIZE =====
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }
    window.addEventListener('resize', handleResize)

    // ===== CLEANUP =====
    return () => {
      isRunning = false
      
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }

      window.removeEventListener('resize', handleResize)

      starGeometry.dispose()
      starMaterial.dispose()
      nebulaGeometry.dispose()
      nebulaMaterial.dispose()
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }

      if (containerRef.current && rendererRef.current?.domElement) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement)
        } catch (e) {
          // Element already removed
        }
      }
    }
  }, [])

  return null
}