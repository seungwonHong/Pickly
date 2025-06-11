'use client';
import { InputField } from "@/components/input/InputField";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import BaseButton from "@/components/shared/BaseButton";
import { useSignUp } from "./useSignUp";
import { JoinForm, joinFormSchema } from "./validationSchema";
import { AuthResponse } from "../signin/validationSchema";
import { useState } from "react";
import NoticeModal from "@/components/shared/NoticeModal";
import ProductComparePlusModal from "@/features/productId/components/modal/ProductCompareModal/ProductComparePlusModal";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/features/productId/libs/useUserStore";

const SignUpPage = () => {
    const router = useRouter();
  
    const [modalOpen, setModalOpen] = useState(false);
    const [massage, setMassage] = useState("");
    
    const [noticeModalOpen, setNoticeModalOpen] = useState(false);
    const [noticeMassage, setNoticeMassage] = useState("");
  

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setMassage("");
  };

  const { mutate: signUp } = useSignUp({
    onSuccess: (data: AuthResponse) => {
      //로그인 성공시 '닉네임님 회원가입 되었습니다! ' 모달 활성화 후 1초 뒤 홈으로 이동 
      //zustand store에 유저 정보 저장
      setNoticeModalOpen(true);  
      setNoticeMassage(`${data.user.nickname}님 회원가입 되었습니다!`);

      useUserStore.getState().setUserData({
        id: data.user.id,
        nickname: data.user.nickname,
      });

      setTimeout(() => {
        router.push("/"); 
      }, 1000);    
      
    },
    onError: (error: any) => {
      setModalOpen(true);
      setMassage(error?.response?.data?.message || "회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  });
   
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<JoinForm>({
    mode: 'onBlur', // blur 시 유효성 검사
    resolver: zodResolver(joinFormSchema),
  });

  const onSubmit: SubmitHandler<JoinForm> = (data) => {
    signUp(data);
  };

  return (
    <>
      <div className="min-h-dvh">
        <div className="max-w-[440px] md:max-w-[640px] w-full pt-[93px] pb-[93px] mx-auto min-h-[100dvh] flex justify-center items-center">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div 
                className="mb-[39px]"
              >
              <InputField
                id="login_email"
                label="이메일"
                type="email"
                placeholder="이메일을 입력해주세요"
                error={errors.email?.message}
                {...register('email')}
                className="h-[55px] md:h-[70px] text-[14px] md:text-[16px]"
              />
              </div>
              <div 
                className="mb-[39px]"
              >
              <InputField
                id="login_name"
                label="닉네임"
                type="text"
                placeholder="닉네임을 입력해주세요"
                error={errors.nickname?.message}
                {...register('nickname')}
                className="h-[55px] md:h-[70px] text-[14px] md:text-[16px]"
              />
              </div>
              <div 
                className="mb-[39px]"
              >
              <InputField
                id="login_pwd"
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요"
                withEyeToggle
                error={errors.password?.message}
                {...register('password')}
                className="h-[55px] md:h-[70px] text-[14px] md:text-[16px]"
              />
              </div>
              <div 
                className="mb-[59px]"
              >
              <InputField
                id="login_pwd_check"
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력해주세요"
                withEyeToggle
                error={errors.passwordConfirmation?.message}
                {...register('passwordConfirmation')}
                className="h-[55px] md:h-[70px] text-[14px] md:text-[16px]"
              />
              </div>
              {/* RHF 사용시 별다른 옵션없이도 엔터시 submit */}
              <BaseButton
                disabled={!isValid}
                className="w-full h-[65px] font-semibold text-lg"
                type="submit"
              >
                회원가입
              </BaseButton>
            </form>
          </div>
        </div>
        <NoticeModal
          open={noticeModalOpen}
          setOpen={setNoticeModalOpen}
          message={noticeMassage}
        />
        <ProductComparePlusModal
          open={modalOpen}
          setOpen={setModalOpen}
          message={massage}
          buttonText="확인"
          onButtonClick={closeModal}
        />
      </div>
    </>
  );
};

export default SignUpPage;
