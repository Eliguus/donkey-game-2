import { useEffect, useRef, useState } from 'react'
import './Projectile.css'

const Character = () => {
  const element = useRef(null)
  const [jump, setJump] = useState(null)
  const [currentDirection, setCurrentDirection] = useState(null)

  useEffect(() => {
    const handleKeyPress = (event) => {
      const rect = element.current.getBoundingClientRect()

      // Calculate the next jump direction based on the current position
      switch (event.key) {
        case 'ArrowUp':
          if (currentDirection === 'ArrowLeft') {
            // If the current direction is left, perform left jump
            setJump({
              offsetPath: `path("M${rect.left},${rect.top} C${rect.left - 50},${rect.top - 50} ${rect.left + 50},${rect.top - 50} ${rect.left},${rect.top}")`,
              animation: `move 3000ms infinite alternate ease-in-out`,
              width: `40px`,
              height: `40px`,
              background: `cyan`
            })
            setCurrentDirection('ArrowLeft')
          } else if (currentDirection === 'ArrowRight') {
            // If the current direction is right, perform right jump
            setJump({
              offsetPath: `path("M${rect.left},${rect.top} C${rect.left + 50},${rect.top - 50} ${rect.left - 50},${rect.top - 50} ${rect.left},${rect.top}")`,
              animation: `move 3000ms infinite alternate ease-in-out`,
              width: `40px`,
              height: `40px`,
              background: `cyan`
            })
            setCurrentDirection('ArrowRight')
          } else {
            // Otherwise, perform regular up-down jump
            setJump({
              offsetPath: `path("M${rect.left},${rect.top} C20,100 200,0 200,100")`,
              animation: `move 3000ms infinite alternate ease-in-out`,
              width: `40px`,
              height: `40px`,
              background: `cyan`
            })
            setCurrentDirection('ArrowUp')
          }
          break
        case 'ArrowLeft':
          // Perform left jump
          setJump({
            offsetPath: `path("M${rect.left},${rect.top} C${rect.left - 50},${rect.top - 50} ${rect.left - 50},${rect.top + 50} ${rect.left - 100},${rect.top} C${rect.left - 150},${rect.top - 50} ${rect.left - 150},${rect.top + 50} ${rect.left - 200},${rect.top}")`,
			animation: `move 3000ms infinite alternate ease-in-out`,
            width: `40px`,
            height: `40px`,
            background: `cyan`
          })
          setCurrentDirection('ArrowLeft')
          break
        case 'ArrowRight':
          // Perform right jump
          setJump({
            offsetPath: `path("M${rect.left},${rect.top} C${rect.left + 50},${rect.top - 50} ${rect.left + 50},${rect.top + 50} ${rect.left + 100},${rect.top} C${rect.left + 150},${rect.top - 50} ${rect.left + 150},${rect.top + 50} ${rect.left + 200},${rect.top}")`,
			animation: `move 3000ms infinite alternate ease-in-out`,
            width: `40px`,
            height: `40px`,
            background: `cyan`
          })
          setCurrentDirection('ArrowRight')
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentDirection])

  return (
    <div>
      <div ref={element} style={jump}></div>
      <button>skalkas</button>
    </div>
  )
}

export default Character
