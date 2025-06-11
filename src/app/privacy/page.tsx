import Header from "@/components/shared/Header";

const PrivacyPage = () => {

  return (
    <>
      <Header />
      <section className="
      lg:w-[940px] mx-auto 
      lg:mb-[120px] 
      lg:my-[160px] 
      md:w-[684px] 
      w-[335px] 
      md:mt-[140px] 
      md:mb-[147px] 
      mt-[130px] 
      mb-[200px] 
      flex flex-col 
      gap-[30px]
      text-[var(--color-white)]
      ">
        <h1>개인정보처리방침</h1>
        <div>
          <p>운영자는 이용자의 개인정보를 중요시하며, 관련 법령을 준수하여 개인정보를 보호하고 있습니다.</p>
        </div>

        <div>
          <h2>1. 수집하는 개인정보 항목</h2>
          <ul>
            <li>이메일 주소, 이름, 프로필 사진</li>
            <li>서비스 이용기록, 접속 로그, 쿠키 등</li>
          </ul>
        </div>
        <div>
          <h2>2. 개인정보의 수집 및 이용목적</h2>
          <ul>
            <li>회원 관리 및 서비스 제공</li>
            <li>서비스 개선 및 신규 서비스 개발</li>
          </ul>
        </div>

        <div>
          <h2>3. 개인정보의 보유 및 이용기간</h2>
          <p>회원 탈퇴 시 또는 개인정보 수집 및 이용 목적이 달성된 후 지체 없이 파기합니다.</p>
        </div>

        <div>
          <h2>4. 개인정보의 제3자 제공</h2>
          <p>회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.</p>
        </div>

        <div>
          <h2>5. 개인정보보호 책임자</h2>
          <p>문의 사항은 아래 이메일로 연락 주시기 바랍니다.</p>
          <p>이메일: alwls824@gmail.com</p>
        </div>

        <p>최종 업데이트일: 2025-06-11</p>
      </section>
    </>
  );
};

export default PrivacyPage;
