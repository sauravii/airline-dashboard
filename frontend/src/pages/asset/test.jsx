import { useEffect, useRef } from 'react'
import { initThreeBackground } from '../../3D_Asset/earth.js'

export default function TestScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const cleanup = initThreeBackground(containerRef.current)
    return cleanup
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        background: '#111'
      }}
    />
  )
}
