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
        <Header />
        <div className="max-w-[640px] w-full pt-[93px] pb-[93px] mx-auto min-h-[calc(100dvh-72px)] md:min-h-[calc(100dvh-102px)] flex justify-center items-center">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                id="login_email"
                label="이메일"
                type="email"
                placeholder="이메일을 입력해주세요"
                error={errors.email?.message}
                {...register('email')}
                className="mb-[39px]"
              />
              <InputField
                id="login_name"
                label="닉네임"
                type="text"
                placeholder="닉네임을 입력해주세요"
                error={errors.nickname?.message}
                {...register('nickname')}
                className="mb-[39px]"
              />
              <InputField
                id="login_pwd"
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요"
                withEyeToggle
                error={errors.password?.message}
                {...register('password')}
                className="mb-[59px]"
              />
              <InputField
                id="login_pwd_check"
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력해주세요"
                withEyeToggle
                error={errors.passwordConfirmation?.message}
                {...register('passwordConfirmation')}
                className="mb-[59px]"
              />
              <BaseButton
                disabled={!isValid}
                className="w-full h-[65px] font-semibold text-lg"
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
