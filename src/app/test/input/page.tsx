'use client';

import { Textbox } from "@/components/input/Textbox";
import { Textfield } from "@/components/input/Textfield";

export default function InputTestPage() {
  
  return (
    <div className="max-w-[1025px] h-full mx-auto mt-20">
      
      <p className="text-[var(--color-lightGray)]">
        현재는 유효성 검사하고있지 않습니다.  
        <br/>
        Textbox S 과 M 은 width를 제외하고는 차이가 그게 없습니다. 참고해서 사용에 따라 가져다 쓰시면 될거 같습니다.<br/>
        - Textbox는 글자수 카운트 부분이 필요해서 클라이언트 컨포넌드입니다.<br/>
        - 지금 상태에서는 300글자 제한하고 있지는 않습니다. 글자 객수만 표기되고있습니다. form 이용한 예시 같이 올리겠습니다~ <br/>
      </p>


      <Textbox 
        className='mb-4'
        placeholder='리뷰를 작성해 주세요'
        error={false}
        maxLength={300}
      />

      <Textbox 
        className='mb-4'
        placeholder='리뷰를 작성해 주세요'
        error={true}
        maxLength={300}
      />

      <Textbox 
        className='mb-4'
        size="M"
        width={360}
        placeholder='리뷰를 작성해 주세요'
        error={false}
        maxLength={300}
      />

      <Textbox 
        className='mb-4'
        size="S"
        width={295}
        placeholder='리뷰를 작성해 주세요'
        error={false}
        maxLength={300}
      />


      <br/>
      <br/>
      <br/>
      <Textfield 
        className='mb-4'
        placeholder='상품명'
        error={false}
      />

      <Textfield 
        className='mb-4'
        placeholder='상품명'
        error={true}
      />

      <Textfield 
        size="M"
        width={360}
        className='mb-4'
        placeholder='상품명'
        error={false}

      />
      
      <Textfield 
        size="S"
        width={335}
        className='mb-4'
        placeholder='상품명'
        error={false}
      />

    </div>
  )
}
