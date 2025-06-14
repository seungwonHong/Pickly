import { useParams } from 'next/navigation';

export default function OAuthSignUpPage() {
  const params = useParams();
  const provider = params.provider; // "google" or "kakao"

  return (
    <div>
      <h1>{provider} 간편회원가입 페이지</h1>
      {/* 여기에 provider별 UI 조건부 렌더링 가능 */}
    </div>
  );
}
