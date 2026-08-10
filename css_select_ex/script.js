/**
 * CSS 속성 선택자 & 명시도 대시보드 코어 스크립트
 */

// DOM 요소 탐색 및 초기화 인터페이스 선언
const themeBtn = document.getElementById('themeBtn');
const classInput = document.getElementById('classInput');
const targetElement = document.getElementById('targetElement');

const badges = {
  prefix: document.getElementById('m-prefix'),
  suffix: document.getElementById('m-suffix'),
  sub: document.getElementById('m-sub'),
  word: document.getElementById('m-word'),
  dash: document.getElementById('m-dash')
};

/**
 * 1. 다크 스킨 스위치 모듈 비즈니스 로직
 */
themeBtn.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    themeBtn.textContent = '다크 모드';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '라이트 모드';
  }
});

/**
 * 2. 실시간 문자열 서브스트링 매칭 연산 제어 스캐너 엔진
 */
function processSubstringMatching() {
  const val = classInput.value.trim();
  targetElement.textContent = `<div class="${val || 'empty'}">`;

  // 활성화 배지 클래스 풀 세트 초기화 리셋 처리
  Object.values(badges).forEach(badge => badge.classList.remove('active'));

  if (!val) {
    targetElement.style.borderColor = 'var(--border-color)';
    targetElement.style.backgroundColor = 'var(--code-bg)';
    return;
  }

  let isMatched = false;

  // 서브스트링 세부 패턴 매칭 조건 탐색 및 상태값 변경
  if (val.startsWith('btn')) { 
    badges.prefix.classList.add('active'); 
    isMatched = true; 
  }
  if (val.endsWith('action')) { 
    badges.suffix.classList.add('active'); 
    isMatched = true; 
  }
  if (val.includes('act')) { 
    badges.sub.classList.add('active'); 
    isMatched = true; 
  }
  
  // 단어(공백 분리) 단위 스캔 검색 배열 연산
  const wordArray = val.split(/\s+/);
  if (wordArray.includes('active')) { 
    badges.word.classList.add('active'); 
    isMatched = true; 
  }
  
  // 대시(-) 기반 언어셋 등 네임스페이스 스캔 검색 연산
  if (val === 'btn' || val.startsWith('btn-')) { 
    badges.dash.classList.add('active'); 
    isMatched = true; 
  }

  // 매칭 여부에 따라 타겟 컴포넌트 실시간 UI 비주얼 가시성 업데이트 피드백
  if (isMatched) {
    targetElement.style.borderColor = 'var(--success)';
    targetElement.style.backgroundColor = 'rgba(16, 185, 129, 0.08)';
  } else {
    targetElement.style.borderColor = 'var(--border-color)';
    targetElement.style.backgroundColor = 'var(--code-bg)';
  }
}

// 스캐너 핸들러 이벤트 바인딩 리스너 가동
classInput.addEventListener('input', processSubstringMatching);
window.addEventListener('DOMContentLoaded', processSubstringMatching);