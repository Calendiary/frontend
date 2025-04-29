import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // 환경변수에 설정된 API URL

// User 인터페이스 정의
interface User {
  id: number;
  email: string;
  nickname: string;
  password: string;
}

// 로그인 함수
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    
    // 이메일과 비밀번호를 확인하여 해당 사용자 반환
    const user = response.data.find((user) => user.email === email && user.password === password);
    
    if (user) {
      return user; // 로그인 성공 시 사용자 데이터 반환
    } else {
      // 로그인 실패 시 alert 표시
      alert('로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.');
      throw new Error('로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.');
    }
  } catch (error) {
    // AxiosError 타입을 지정
    if (error instanceof AxiosError) {
      // AxiosError의 메시지를 사용
      alert(`로그인 실패: ${error.message}`);
      throw new Error(`로그인 실패: ${error.message}`);
    } else {
      alert('로그인 실패');
      throw new Error('로그인 실패');
    }
  }
};

// 회원가입 함수
export const signUpUser = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    
    // 이메일 중복 체크
    const userExists = response.data.find((user) => user.email === email);
    
    if (userExists) {
      alert('이미 존재하는 이메일입니다.'); // 이메일 중복 경고
      throw new Error('이미 존재하는 이메일입니다.');
    }
    
    // 새로운 사용자 추가
    const newUser: User = {
      id: response.data.length + 1,  // 사용자 ID는 데이터를 기반으로 증가
      email,
      nickname: name,
      password,
    };
    
    // json-server에 새 사용자 데이터 추가
    await axios.post(`${API_URL}/users`, newUser);
    
    return newUser; // 회원가입 성공 시 새로운 사용자 데이터 반환
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(`회원가입 실패: ${error.message}`); // 회원가입 실패 시 경고 메시지 표시
      throw new Error(`회원가입 실패: ${error.message}`);
    } else {
      alert('회원가입 실패');
      throw new Error('회원가입 실패');
    }
  }
};
