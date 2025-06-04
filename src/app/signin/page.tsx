"use client";

import { InputField } from "@/components/input/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useUserStore } from "@/features/productId/libs/userStore";
import { AuthResponse, LoginForm, loginFormSchema } from "./validationSchema";
import { useLoginMutation } from "./useSignIn";

import BaseButton from "@/components/shared/BaseButton";
import Header from "@/components/shared/Header";
import Image from "next/image";
import Link from "next/link";

const login_icon_google = "/icons/login_sns_google.svg";
const login_icon_kakao = "/icons/login_sns_kakao.svg";

const SigninPage = () => {
  const { setUser } = useUserStore();

  const { mutate: login } = useLoginMutation({
    onSuccess: (data: AuthResponse) => {
      console.log("로그인 완료되었습니다!");
      console.log(data);
      setUser({
        userId: data.user.id,
        email: data.user.email,
      });
    },
    onError: (error: any) => {
      console.error(error?.response?.data?.message || "로그인 실패");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onBlur", // blur 시 유효성 검사
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log("로그인 폼 제출됨", data);
    login(data);
  };

  return (
    <>
      <div className="min-h-dvh">
        <Header />
        <div className="max-w-[640px] w-full mx-auto pt-[93px] pb-[93px] min-h-[calc(100dvh-72px)] md:min-h-[calc(100dvh-102px)] flex justify-center items-center">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                id="login_email"
                label="이메일"
                type="email"
                placeholder="이메일을 입력해주세요"
                error={errors.email?.message}
                {...register("email")}
                className="mb-[39px]"
              />
              <InputField
                id="login_pwd"
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요"
                withEyeToggle
                error={errors.password?.message}
                {...register("password")}
                className="mb-[59px]"
              />
              <BaseButton
                disabled={!isValid}
                className="w-full h-[65px] font-semibold text-lg"
              >
                로그인
              </BaseButton>
            </form>
            <div className="text-[var(--color-deepGray)] mt-[60px] text-center text-base">
              <span>SNS로 바로 시작하기</span>
              <ul className="flex justify-center gap-5 mt-[19px]">
                <li>
                  <Link
                    href=""
                    className="block border border-[#353542] rounded-full p-[13px] hover:scale-105 transition-transform duration-200 ease-in-out"
                  >
                    <Image
                      src={login_icon_google}
                      width={28}
                      height={28}
                      alt="구글로 로그인하기"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href=""
                    className="block border border-[#353542] rounded-full p-[13px] hover:scale-105 transition-transform duration-200 ease-in-out"
                  >
                    <Image
                      src={login_icon_kakao}
                      width={28}
                      height={28}
                      alt="카카오로 로그인하기"
                    />
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

export default SigninPage;
