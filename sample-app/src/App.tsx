import { useState } from 'react'
import { CrossfadeImage } from '@ienlab/react-library'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>라이브러리 샘플 애플리케이션</h1>
          <p>react-library 컴포넌트 사용 예시</p>
          
          <div style={{ margin: '20px 0' }}>
            <h2>Image 컴포넌트 사용 예시</h2>
            <CrossfadeImage
              src="https://picsum.photos/200/300"
              alt="Placeholder Image"
              width={300}
              height={200}
            />
          </div>
          
          <div>
            <button
              type="button"
              className="counter"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
