import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';
import type { Group } from 'three';
import './App.css';
import TechDemos from './components/TechDemos';

function Sculpture({ playing }: { playing: boolean }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => { if (group.current && playing) group.current.rotation.y += delta * 0.22; });
  return <group ref={group} rotation={[0.22, 0.4, 0.12]}>
    {Array.from({ length: 27 }, (_, i) => {
      const x = i % 3, y = Math.floor(i / 3) % 3, z = Math.floor(i / 9);
      return <RoundedBox key={i} args={[0.84, 0.84, 0.84]} radius={0.09} smoothness={4} position={[(x - 1) * 0.98, (y - 1) * 0.98, (z - 1) * 0.98]}>
        <meshStandardMaterial color={['#c2aeff', '#8763d8', '#a58be9'][(x + y + z) % 3]} roughness={0.28} metalness={0.18} />
      </RoundedBox>;
    })}
  </group>;
}

function App() {
  const [playing, setPlaying] = useState(true);

  return <div className="site-shell">
    <header className="site-header"><a className="brand" href="#"><span className="brand-icon">✳</span> frontend<span className="brand-light"> / lab</span></a><nav aria-label="메인 메뉴"><a className="nav-active" href="#explore">기술 데모</a><a href="#playground">플레이그라운드</a><a href="#about">소개 <span>↗</span></a></nav><span className="edition"><i /> ALWAYS EXPLORING</span></header>
    <main>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span /> A SPACE FOR CURIOUS DEVELOPERS</div><h1>웹의 다음을,<br />직접 <span className="serif-word">경험하다.</span></h1><p>빠르게 변하는 프론트엔드, 더 깊이 이해하는 방법.<br />작은 컴포넌트를 직접 조작하고, 적용된 코드를 확인하세요.</p><div className="hero-actions"><a className="primary-button" href="#explore">데모 둘러보기 <span>↗</span></a><a className="text-button" href="#playground">먼저 만져보기 <span>→</span></a></div><div className="hero-footnote"><span>01 — 05</span><span className="small-line" /> IDEAS INTO INTERACTIONS</div></div>
        <div className="playground" id="playground"><div className="demo-heading"><span><i /> LIVE EXPERIMENT</span><span>001 / CUBE STUDY</span></div><ErrorBoundary fallback={<div className="canvas-fallback">3D 미리보기를 불러오지 못했습니다.</div>}><Canvas camera={{ position: [5, 4, 6], fov: 40 }} dpr={[1, 1.5]} fallback={<div className="canvas-fallback">WebGL을 지원하는 브라우저에서 확인해 주세요.</div>}><ambientLight intensity={1.5} /><directionalLight position={[3, 5, 4]} intensity={3} /><directionalLight position={[-4, 0, 2]} intensity={1} color="#d8c5ff" /><Sculpture playing={playing} /><OrbitControls enableZoom={false} enablePan={false} autoRotate={false} /></Canvas></ErrorBoundary><span className="orbit-label label-top">form</span><span className="orbit-label label-bottom">interaction</span><div className="demo-bottom"><span>↔ 드래그해서 회전해 보세요</span><button aria-label={playing ? '자동 회전 멈추기' : '자동 회전 시작하기'} onClick={() => setPlaying(!playing)}>{playing ? 'Ⅱ' : '▷'}</button></div></div>
      </section>
      <div className="tech-strip"><span>BUILT FOR THE MODERN WEB</span><span>React</span><span>TypeScript</span><span>Vite</span><span>Three.js</span><span>Web Platform <b>↗</b></span></div>
      <section className="explore" id="explore"><div className="section-top"><div><div className="eyebrow">SMALL DEMOS, BIG IDEAS</div><h2>작은 데모로 배우는 프론트엔드</h2></div><p>동작을 바꾸고, 그 뒤의 코드를 확인하세요.</p></div><p className="verification-scope">검증 범위: Chrome의 Blink 엔진에서 데스크톱·모바일 크기로 실행한 결과</p><TechDemos /></section>
      <section className="about" id="about"><span>KEEP BUILDING. KEEP WONDERING.</span><p>읽는 것에서 끝나지 않는,<br /><strong>프론트엔드 탐험의 시작.</strong></p><a href="#playground">실험으로 돌아가기 ↗</a></section>
    </main><footer><span>✳ frontend / lab</span><span>작은 실험에서 시작되는 새로운 가능성.</span><span>CONCEPT PREVIEW · 2026</span></footer>

  </div>;
}
export default App;
