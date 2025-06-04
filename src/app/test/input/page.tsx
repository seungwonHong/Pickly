'use client';

import { InputField } from "@/components/input/InputField";
import { Textbox } from "@/components/input/Textbox";

export default function InputTestPage() {
  
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
        id="login_email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <InputField
        id="login_email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        error="잘못된 이메일입니다."
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <InputField
        id="login_email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <InputField
        id="login_email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <InputField
        id="login_pwd"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        withEyeToggle
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <InputField
        id="login_pwd"
        label="비밀번호"
        subText="최소 8자 이상"
        placeholder="비밀번호를 입력해주세요"
        withEyeToggle
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <InputField
        id="login_pwd"
        label="비밀번호"
        subText="최소 8자 이상"
        error="비밀번호가 일치하지 않습니다."
        placeholder="비밀번호를 입력해주세요"
        withEyeToggle
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <InputField
        id="login_pwd"
        placeholder="비밀번호를 입력해주세요"
        withEyeToggle
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <InputField
        id="login_pwd"
        subText="최소 8자 이상"
        placeholder="비밀번호를 입력해주세요"
        withEyeToggle
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <InputField
        id="login_pwd"
        subText="최소 8자 이상"
        error="비밀번호가 일치하지 않습니다."
        placeholder="비밀번호를 입력해주세요"
        withEyeToggle
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/><br/>
      <h2 className="text-[var(--color-white)]">Textbox</h2><br/>
      <Textbox 
        placeholder='리뷰를 작성해 주세요'
        maxLength={300}
        className="mb-4 md:w-[360px] lg:h-[170px] md:h-[60px] w-[295px] h-[155px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <Textbox 
        placeholder='리뷰를 작성해 주세요'
        error="내용을 입력해주세요."
        maxLength={300}
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
      />
      <br/>
      <Textbox 
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
        placeholder='리뷰를 작성해 주세요'
        maxLength={300}
      />
      <br/>
      <Textbox 
        className="mb-4 md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
        placeholder='리뷰를 작성해 주세요'
        maxLength={300}
      />
      <br/>
      <br/>
    </div>
  )
}
