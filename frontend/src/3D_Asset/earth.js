import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export function initThreeBackground(container, lightingConfig = {}, scaleConfig = {}) {
  // Default lighting config
  const config = {
    ambientIntensity: 0.4,
    directionalIntensity: 1.5,
    directionalPosition: { x: 5, y: 3, z: 5 },
    backgroundColor: 0x000000,
    ...lightingConfig
  }

  const scale = {
  earth: scaleConfig.earth || 1,
  airplane: scaleConfig.airplane || 0.02,
  cutHalf: scaleConfig.cutHalf !== undefined ? scaleConfig.cutHalf : true,
  earthPositionY: scaleConfig.earthPositionY || -0.5,  // ⬅️ TAMBAHIN INI
  ...scaleConfig
}


  const textureLoader = new THREE.TextureLoader()
  const earthtexture = textureLoader.load('/3d/earth/textures/Material.002_diffuse.jpeg')
  const earthRadius = 1
  const planeAltitude = 0.35
  let angle = Math.random() * Math.PI * 2
  
  earthtexture.flipY = false;
  earthtexture.colorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(config.backgroundColor)

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 4

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  container.appendChild(renderer.domElement)

  // LIGHT - now configurable
  scene.add(new THREE.AmbientLight(0xffffff, config.ambientIntensity))
  const dir = new THREE.DirectionalLight(0xffffff, config.directionalIntensity)
  dir.position.set(config.directionalPosition.x, config.directionalPosition.y, config.directionalPosition.z)
  scene.add(dir)

  // EARTH
  const geometry = new THREE.SphereGeometry(1, 64, 64)
  const material = new THREE.MeshStandardMaterial({
    map: earthtexture,
    roughness: 0.5,
    metalness: 0
  })
   const sphere = new THREE.Mesh(geometry, material)
  sphere.rotation.y = Math.PI
  sphere.scale.set(scale.earth, scale.earth, scale.earth)
  scene.add(sphere)

  // ✈️ AIRPLANE (GLB)
  const planeGroup = new THREE.Group()
  scene.add(planeGroup)


 

  const gltfLoader = new GLTFLoader()
  gltfLoader.load(
    '/3d/airplane-_low-poly/scene.gltf',
    (gltf) => {
      const airplane = gltf.scene
       airplane.scale.set(scale.airplane, scale.airplane, scale.airplane)
      
      // Adjust initial rotation based on your model
      // You may need to tweak these values depending on how your model is oriented
      airplane.rotation.set(-Math.PI / 6, 0, 0)
      
      airplane.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false
          child.receiveShadow = false
        }
      })
      planeGroup.add(airplane)
    }
  )

  // ⭐ STARFIELD
  const starCount = 2000
  const starGeometry = new THREE.BufferGeometry()
  const starPositions = new Float32Array(starCount * 3)
  
  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 100
    starPositions[i + 1] = (Math.random() - 0.5) * 100
    starPositions[i + 2] = -Math.random() * 100
  }
  
  starGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(starPositions, 3)
  )
  
  const starMaterial = new THREE.PointsMaterial({
    color: 0xbad7ff,
    size: 0.035,
    transparent: true,
    opacity: 0.7,
    depthWrite: false
  })
  
  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)

  function resetShootingStar(star) {
    star.position.set(
      (Math.random() - 0.5) * 20,
      Math.random() * 10 + 5,
      -Math.random() * 10
    )
  }

  // ☄️ SHOOTING STAR
  const shootingStars = []
  const shootingGeometry = new THREE.SphereGeometry(0.02, 8, 8)
  const shootingMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  
  for (let i = 0; i < 3; i++) {
    const star = new THREE.Mesh(shootingGeometry, shootingMaterial)
    resetShootingStar(star)
    scene.add(star)
    shootingStars.push({
      mesh: star,
      speed: 0.2 + Math.random() * 0.3
    })
  }

  

  function animate() {
    requestAnimationFrame(animate)

    // 🌍 earth rotation
    sphere.rotation.y += 0.002

    // ✈️ realistic elliptical orbit
    angle += 0.009
    
    const a = earthRadius + planeAltitude + 0.00001  // semi-major axis
    const b = a * 0.85  // ellipse
    
    const x = Math.cos(angle) * a
    const z = Math.sin(angle) * b
    
    // inclination (orbit tilt)
    const inclination = THREE.MathUtils.degToRad(19)
    const y = Math.sin(angle) * Math.sin(inclination) * 0.3
    
    planeGroup.position.set(x, y, z)
    
    // Calculate tangent vector (direction of travel)
    const tangentX = -Math.sin(angle) * a
    const tangentZ = Math.cos(angle) * b
    const tangentY = Math.cos(angle) * Math.sin(inclination) * 0.4

    
    
    // Normalize the tangent
    const tangent = new THREE.Vector3(tangentX, tangentY, tangentZ).normalize()
    
    // Up vector points away from Earth center
    const up = new THREE.Vector3(x, y, z).normalize()
    
    // Create rotation matrix to orient plane
    const matrix = new THREE.Matrix4()
    matrix.lookAt(new THREE.Vector3(0, 0, 0), tangent, up)
    planeGroup.quaternion.setFromRotationMatrix(matrix)
    
    // Add banking (roll) based on turn rate
    const turnDirection = Math.sign(-Math.sin(angle))
    planeGroup.rotateOnAxis(tangent, turnDirection * 0.15)

    // ⭐ starfield slow drift
    const positions = starGeometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] += 0.02
      if (positions[i + 2] > 5) {
        positions[i + 2] = -80
      }
    }
    starGeometry.attributes.position.needsUpdate = true
    stars.rotation.x += 0.0001

    // ☄️ shooting stars
    shootingStars.forEach(s => {
      s.mesh.position.x -= s.speed
      s.mesh.position.y -= s.speed * 0.5
      if (s.mesh.position.x < -15 || s.mesh.position.y < -10) {
        resetShootingStar(s.mesh)
      }
    })

    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  // Ganti bagian return di akhir function
return {
    cleanup: () => {
      renderer.dispose()
      container.removeChild(renderer.domElement)
    },
    updateScale: (newScale) => {
      if (newScale.earth) {
        sphere.scale.set(newScale.earth, newScale.earth, newScale.earth)
      }
      if (newScale.airplane && planeGroup.children[0]) {
        planeGroup.children[0].scale.set(newScale.airplane, newScale.airplane, newScale.airplane)
      }
    }
  }
}