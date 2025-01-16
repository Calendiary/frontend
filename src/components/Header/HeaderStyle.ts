import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  max-width: 600px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed; /* 상단 고정 */
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* 다른 요소 위에 렌더링 */
`;
