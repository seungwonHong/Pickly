"use client";
 
import { InputField } from '@/components/input/InputField';
import BaseButton from '@/components/shared/BaseButton';
import Image from 'next/image';
import Link from 'next/link';
import {  useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SimpleJoinForm, simpleJoinFormSchema } from '../validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { kakaoJoinRedirecteUrl, kakaoJoinUrl, login_logo } from '@/features/productId/auth';
import { useKakaoJoinMutation } from '../useSignUp';

export default function OAuthSignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider');
  const token = searchParams.get('code') || '';
         
  console.log('provider:', provider);
  console.log('token:', token);

  const { mutate: oAuthJoin } = useKakaoJoinMutation({ 
    onSuccess: (data) => {
      toast.success(`${data.user.nickname}님 환영합니다!`);
      setTimeout(() => {
        router.replace("/homepage");
      }, 1500);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message;
        console.log(message);

      if (message === "잘못된 인가 코드입니다.") {
        toast.error(message);
        console.log(`잘못된 인가 코드입니다 리다이렉트 페이지로 이동합니다.`);
        window.location.replace(kakaoJoinRedirecteUrl);
      }
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SimpleJoinForm>({
    mode: "onChange", // blur 시 유효성 검사
    resolver: zodResolver(simpleJoinFormSchema),
  });
 

  const onSubmit: SubmitHandler<SimpleJoinForm> = async (data) => {
    console.log('Form Data:', data);    
    oAuthJoin({
      nickname: data.nickname,
      redirectUri: kakaoJoinUrl,
      token: token,
      provider: "kakao",
    });
    localStorage.setItem("joinTempData", JSON.stringify(data));
  };

  return (
    <>
      <div className={`min-h-dvh bg-[url('/signup_bg.jpg')] bg-cover bg-center bg-no-repeat`}>
        <div className="max-w-[440px] md:max-w-[640px] w-full mx-auto pt-[93px] pb-[93px] min-h-[100dvh] flex justify-center items-center">
          <div className="w-full px-[20px] lg:px-[0px]">
            <div className="flex justify-center items-center mb-[25px]">
              <Link href="/" >
                <Image
                  src={login_logo}
                  width={193}
                  height={133}
                  alt="홈으로이동"
                />
              </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-[39px]">
                <InputField
                  id="login_name"
                  label="닉네임"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  error={errors.nickname?.message}
                  subText="최대 10자 가능"
                  {...register("nickname")}
                  className="h-[55px] md:h-[70px] text-[14px] md:text-[16px] shadow-lg"
                />
              </div>
              {/* RHF 사용시 별다른 옵션없이도 엔터시 submit */}
              <BaseButton
                disabled={!isValid}
                className="w-full h-[65px] font-semibold text-lg"
                type="submit"
              >
                가입하기
              </BaseButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}  