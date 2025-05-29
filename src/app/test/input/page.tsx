'use client';

import { InputField } from "@/components/input/InputField";
import { Textbox } from "@/components/input/Textbox";
import { Textfield } from "@/components/input/Textfield";
import { useState } from "react";

export default function InputTestPage() {
  
  const [passwordBoxType, setPasswordBoxType] = useState(false);
  const handleEyeClick = () => setPasswordBoxType(!passwordBoxType);
  
  return (
    <div className="max-w-[1025px] h-full mx-auto mt-20">
      
      <p className="text-[var(--color-lightGray)]">
        현재는 유효성 검사하고있지 않습니다.  
        <br/>
        Textbox S 과 M 은 width를 제외하고는 차이가 크게 없습니다. 참고해서 사용에 따라 가져다 쓰시면 될거 같습니다.<br/>
        - Textbox는 글자수 카운트 부분이 필요해서 클라이언트 컨포넌드입니다.<br/>
        - 유효성 검사하고있지 않습니다. 글자 객수만 표기되고있습니다. form 이용한 예시 같이 올리겠습니다~ <br/>
      </p>
      <br/><br/>
      <h2 className="text-[var(--color-white)]">InputField</h2><br/>
      <InputField
        className='mb-4'
        id="login_email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
      />
      <br/>
      <InputField
        id="login_email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        error="잘못된 이메일입니다."
      />
      <br/>
      <InputField
        id="login_email"
        size="M"
        width={440}
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
      />
      <br/>
      <InputField
        id="login_email"
        size="S"
        width={335}
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
      />
      <br/>
      <InputField
        id="login_pwd"
        label="비밀번호"
        type={passwordBoxType ? "text" : "password" }
        placeholder="비밀번호를 입력해주세요"
        withEyeToggle
        eyeState={passwordBoxType} // eye 토글 상태 관리 필요시 별도 상태 선언
        onEyeToggle={handleEyeClick}
      />
      <br/>
      <InputField
        id="login_pwd"
        label="비밀번호"
        subText="최소 8자 이상"
        type={passwordBoxType ? "text" : "password" }
        placeholder="비밀번호를 입력해주세요"
        withEyeToggle
        eyeState={passwordBoxType} // eye 토글 상태 관리 필요시 별도 상태 선언
        onEyeToggle={handleEyeClick}
      />
      <br/>
      <InputField
        id="login_pwd"
        label="비밀번호"
        subText="최소 8자 이상"
        error="비밀번호가 일치하지 않습니다."
        type={passwordBoxType ? "text" : "password" }
        placeholder="비밀번호를 입력해주세요"
        withEyeToggle
        eyeState={passwordBoxType} // eye 토글 상태 관리 필요시 별도 상태 선언
        onEyeToggle={handleEyeClick}
      />
      <br/><br/>
      <h2 className="text-[var(--color-white)]">Textbox</h2><br/>
      <Textbox 
        placeholder='리뷰를 작성해 주세요'
        error={false}
        maxLength={300}
      />
      <br/>
      <Textbox 
        placeholder='리뷰를 작성해 주세요'
        error={true}
        maxLength={300}
      />
      <br/>
      <Textbox 
        className='mb-4'
        size="M"
        width={360}
        placeholder='리뷰를 작성해 주세요'
        error={false}
        maxLength={300}
      />
      <br/>
      <Textbox 
        className='mb-4'
        size="S"
        width={295}
        placeholder='리뷰를 작성해 주세요'
        error={false}
        maxLength={300}
      />
      <br/><br/>
      <h2 className="text-[var(--color-white)]">Textfield</h2>
      <br/>
      <Textfield 
        placeholder='상품명'
        error={false}
      />
      <br/>
      <Textfield 
        placeholder='상품명'
        error={true}
      />
      <br/>
      <Textfield 
        size="M"
        width={360}
        placeholder='상품명'
        error={false}
      />
      <br/>
      <Textfield 
        size="S"
        width={335}
        placeholder='상품명'
        error={false}
      />
      <br/>
      <br/>
    </div>
  )
}
