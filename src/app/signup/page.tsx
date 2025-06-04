'use client';

import { InputField } from "@/components/input/InputField";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import BaseButton from "@/components/shared/BaseButton";
import Header from "@/components/shared/Header";

import { useSignUp } from "./useSignUp";
import { JoinForm, joinFormSchema } from "./validationSchema";
import { AuthResponse } from "../signin/validationSchema";

const SignUpPage = () => {
  const { mutate: signUp } = useSignUp({
    onSuccess: (data: AuthResponse) => {
      console.log('회원가입 완료되었습니다!');
      console.log(data);
    },
    onError: (error: any) => {
      console.error(error?.response?.data?.message || '회원가입 실패');
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
      </div>
    </>
  );
};

export default SignUpPage;
