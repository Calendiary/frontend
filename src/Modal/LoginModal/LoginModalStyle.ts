import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalContent = styled.div`
  width: 90%;
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

export const KakaoButton = styled.button`
  width: 100%;
  background-color: #f7e600;
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f9e000;
  }
`;
