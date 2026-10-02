# Frontend / Lab

프론트엔드 기술을 작은 인터랙티브 데모로 직접 체험하는 웹 실험실입니다. 각 데모에서 값을 조절하고 화면의 변화를 확인한 뒤, 실제 적용된 핵심 코드를 펼쳐 볼 수 있습니다.

## 데모

| 기술 | 체험 내용 |
| --- | --- |
| CSS Container Queries | 컨테이너 너비를 조절하면 카드가 가로형과 세로형으로 전환됩니다. |
| CSS Subgrid | 제목 길이가 달라도 설명과 하단 요소의 정렬을 유지합니다. |
| CSS Scroll Snap | 가로 갤러리를 스크롤하면 카드가 기준 위치에 맞춰집니다. |
| React 상태 관리 | 제품 수량을 변경하면 합계가 즉시 갱신됩니다. |
| CSS 3D Transforms | 슬라이더로 큐브의 회전 각도를 조절합니다. |

첫 화면에는 React Three Fiber로 구현한 WebGL 큐브도 있습니다. 드래그로 시점을 바꾸거나 자동 회전을 멈출 수 있습니다.

## 로컬 실행

Node.js와 npm이 설치된 환경에서 실행합니다.

```bash
git clone https://github.com/IMHOJEONG/fe-lab.git
cd fe-lab
npm install
npm run dev
```

터미널에 출력되는 로컬 주소로 접속합니다. 기본 주소는 `http://localhost:5173`이며, 해당 포트가 사용 중이면 달라질 수 있습니다.

저장소에는 기존 Bun 잠금 파일인 `bun.lockb`가 포함되어 있습니다. Bun을 사용하는 경우 `bun install`과 `bun run dev`로 실행할 수 있습니다.

## 명령어

```bash
npm run dev      # 개발 서버
npm run build    # TypeScript 검사 및 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint 검사
```

## 기술 구성

- React 18, TypeScript 5.6, Vite 6, SWC
- Three.js, React Three Fiber, Drei
- CSS Container Queries, Subgrid, Scroll Snap, 3D Transforms

이 프로젝트는 기술을 설명하는 체험용 예시입니다. 모든 의존성이 최신 버전으로 업그레이드된 프로젝트는 아닙니다. 폰트는 Google Fonts에서 불러오며, WebGL 데모는 WebGL을 지원하는 브라우저가 필요합니다.

## 주요 파일

```text
src/
├── App.tsx                  # 메인 화면과 WebGL 큐브
├── App.css                  # 화면 스타일과 CSS 데모 구현
└── components/
    └── TechDemos.tsx        # 인터랙티브 데모 5개와 핵심 코드
```

기존 3D 실험 컴포넌트와 상태 저장소도 남아 있지만, 현재 메인 화면의 데모는 위 파일을 중심으로 구성되어 있습니다.
