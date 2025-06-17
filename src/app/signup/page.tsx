<<<<<<< HEAD
'use client';

import { InputField } from "@/components/input/InputField";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from "next/link";

import BaseButton from "@/components/shared/BaseButton";

import { useSignUp } from "./useSignUp";
import { JoinForm, joinFormSchema } from "./validationSchema";
import { AuthResponse } from "../signin/validationSchema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const login_logo = "/signup_logo.svg";

const SignUpPage = () => {
    const router = useRouter();
  

=======
"use client";
import { InputField } from "@/components/input/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import BaseButton from "@/components/shared/BaseButton";
import { useSignUp } from "./useSignUp";
import { JoinForm, joinFormSchema } from "./validationSchema";
import { AuthResponse } from "../signin/validationSchema";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import ErrorPage from "./error";
import { AxiosError } from "axios";


const login_logo = "/signup_logo.svg";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email openid`;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=account_email,profile_nickname,profile_image&prompt=consent`;
 
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  const { mutate: signUp } = useSignUp({
    onSuccess: (data: AuthResponse) => {
      toast.success(`${data.user.nickname}님 회원가입 되었습니다!`);
      setTimeout(() => {
<<<<<<< HEAD
         router.replace("/signin"); 
      }, 1000);    
      
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  });
   
=======
        router.replace("/signin");
      }, 1000);
    },
    onError: (error:  AxiosError | any) => {
      toast.error(
        error?.response?.data?.message ||
          "회원가입에 실패했습니다. 다시 시도해 주세요."
      );
    },
  });

>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<JoinForm>({
<<<<<<< HEAD
    mode: 'onBlur', // blur 시 유효성 검사
=======
    mode: "onBlur", // blur 시 유효성 검사
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
    resolver: zodResolver(joinFormSchema),
  });

  const onSubmit: SubmitHandler<JoinForm> = (data) => {
    signUp(data);
  };

<<<<<<< HEAD
  return (
    <>
      <div className={`min-h-dvh bg-[url('/signup_bg.jpg')] bg-cover bg-center`}>
=======
  if (error === 'oauth') {
    return <ErrorPage/>;
  }
  
  return (
    <>
      <div
        className={`min-h-dvh bg-[url('/signup_bg.jpg')] bg-cover bg-center`}
      >
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
        <div className="max-w-[440px] md:max-w-[640px] w-full pt-[93px] pb-[93px] mx-auto min-h-[100dvh] flex justify-center items-center">
          <div className="w-full px-[20px] lg:px-[0px]">
            <div className="flex justify-center items-center mb-[25px]">
              <Link href="/" >
                <Image
                  src={login_logo}
                  width={193}
                  height={133}
<<<<<<< HEAD
                  alt="홈으로이동"
=======
                  alt="랜딩페이지로이동"
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
                />
              </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
<<<<<<< HEAD
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
                className="h-[55px] md:h-[70px] text-[14px] md:text-[16px] "
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
=======
              <div className="mb-[39px]">
                <InputField
                  id="login_email"
                  label="이메일"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  error={errors.email?.message}
                  {...register("email")}
                  className="h-[55px] md:h-[70px] text-[14px] md:text-[16px] "
                />
              </div>
              <div className="mb-[39px]">
                <InputField
                  id="login_name"
                  label="닉네임"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  error={errors.nickname?.message}
                  {...register("nickname")}
                  className="h-[55px] md:h-[70px] text-[14px] md:text-[16px]"
                />
              </div>
              <div className="mb-[39px]">
                <InputField
                  id="login_pwd"
                  label="비밀번호"
                  placeholder="비밀번호를 입력해주세요"
                  withEyeToggle
                  error={errors.password?.message}
                  {...register("password")}
                  className="h-[55px] md:h-[70px] text-[14px] md:text-[16px]"
                />
              </div>
              <div className="mb-[59px]">
                <InputField
                  id="login_pwd_check"
                  label="비밀번호 확인"
                  placeholder="비밀번호를 다시 입력해주세요"
                  withEyeToggle
                  error={errors.passwordConfirmation?.message}
                  {...register("passwordConfirmation")}
                  className="h-[55px] md:h-[70px] text-[14px] md:text-[16px]"
                />
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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
<<<<<<< HEAD
=======
            <div className="text-[var(--color-deepGray)] mt-[40px] text-center text-base">
              <span>이미 회원이신가요? <Link href="/signin" className="hover:text-[var(--color-white)]">로그인</Link></span>
            </div>
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
            <div className="text-[var(--color-deepGray)] mt-[60px] text-center text-base">
              <span>SNS로 바로 시작하기</span>
              <ul className="flex justify-center gap-5 mt-[19px]">
                <li>
                  <Link
<<<<<<< HEAD
                    href=""
                    className="block border  border-[#353542] rounded-full hover:scale-120 hover:bg-[var(--color-white)] transition-transform duration-200 ease-in-out shadow-lg"
=======
                    href={googleAuthUrl}
                    className="group relative block border border-[#353542] rounded-full  hover:bg-[var(--color-white)] hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg"
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
                  >
                    <span className="
                      block 
                      bg-[var(--color-deepGray)] 
                      h-[56px] w-[56px] 
                      transition-all 
                      duration-300 
                      mask-[url('/icons/login_sns_google.svg')] 
                      mask-no-repeat 
                      mask-center 
                      hover:bg-[url('/sns_gg_bg.png')] bg-cover bg-center bg-no-repeat 
                      text-[0px]">
<<<<<<< HEAD
                      구글 로그인하기
=======
                      구글 회원가입하기
                    </span>
                    <span className="absolute block  group-hover:last:block hidden -bottom-[30px] left-1/2 translate-x-[-50%] block text-[var(--color-deepGray)] text-[14px] whitespace-nowrap">
                      구글 회원가입하기
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
<<<<<<< HEAD
                    href=""
                    className="block border  border-[#353542] rounded-full hover:scale-120 hover:bg-[#f3e21f] transition-transform duration-200 ease-in-out shadow-lg"
                  >
                    <span className="
=======
                    href={kakaoLoginUrl}
                    className="block border border-[#353542] rounded-full hover:bg-[#f3e21f]  hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg"
                  >
                    <span
                      className="
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
                      block 
                      h-[56px] w-[56px] 
                      bg-[var(--color-deepGray)] 
                      hover:bg-[#361d1e] 
                      transition-colors 
                      duration-300 
                      mask-[url('/icons/login_sns_kakao.svg')] 
                      mask-no-repeat 
                      mask-center 
                      text-[0px] 
<<<<<<< HEAD
                      hover:animate-spin-slow">
                      카카오톡 로그인하기
=======
                      hover:animate-spin-slow"
                    >
                      카카오톡 회원가입
                    </span>
                    <span className="absolute block  group-hover:last:block hidden -bottom-[30px] left-1/2 translate-x-[-50%] block text-[var(--color-deepGray)] text-[14px] whitespace-nowrap">
                      카카오톡 회원가입
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
