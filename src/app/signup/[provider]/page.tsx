"use client";
 
import { InputField } from '@/components/input/InputField';
import BaseButton from '@/components/shared/BaseButton';
import Image from 'next/image';
import Link from 'next/link';
import {  useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SimpleJoinForm, simpleJoinFormSchema } from '../validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';

const login_logo = "/signup_logo.svg";

export default function OAuthSignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider') ;
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const redirectUri = provider === 'google'
    ? process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
    : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  console.log('provider:', provider);
  console.log('email:', email);
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
    // 여기서 백엔드 API 호출하여 회원가입 처리
    
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signUp/${provider}`, {
          nickname: data.nickname,
          redirectUri,
          token
        });

        console.log('회원가입 성공:', response.data);

        // 회원가입 후 로그인 페이지 또는 메인으로 리다이렉트
        router.replace('/signin');
      } catch (error:  AxiosError | any) {
        if (error.response?.data?.message) {
          alert(`회원가입 실패: ${error.response.data.message}`);
        } else {
          alert('회원가입 중 오류가 발생했습니다.');
        }
        console.error('회원가입 실패 ❌', error);
      }
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
