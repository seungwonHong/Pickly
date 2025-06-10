"use client";

import { InputField } from "@/components/input/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFormContext } from "react-hook-form";

import { AuthResponse, LoginForm, loginFormSchema } from "./validationSchema";
import { useLoginMutation } from "./useSignIn";
import { useUserStore } from "@/features/productId/libs/useUserStore";

import BaseButton from "@/components/shared/BaseButton";
import Image from "next/image";
import Link from "next/link";
import ProductComparePlusModal from "@/features/productId/components/modal/ProductCompareModal/ProductComparePlusModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NoticeModal from "@/components/shared/NoticeModal";

const login_icon_google = "/icons/login_sns_google.svg";
const login_icon_kakao = "/icons/login_sns_kakao.svg";

const SigninPage = () => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [massage, setMassage] = useState("");
  
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [noticeMassage, setNoticeMassage] = useState("");

  const {
    register,
    handleSubmit,
    reset,   
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onBlur", // blur 시 유효성 검사
    resolver: zodResolver(loginFormSchema),
  });


  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setMassage("");
  };

  const { mutate: login } = useLoginMutation({
    onSuccess: (data: AuthResponse) => {
      //로그인 성공시 '닉네임님 로그인 되었습니다! ' 모달 활성화 후 1초 뒤 홈으로 이동 
      //zustand store에 유저 정보 저장
      setNoticeModalOpen(true);  
      setNoticeMassage(`${data.user.nickname}님 로그인 되었습니다!`);

      useUserStore.getState().setUserData({
        id: data.user.id,
        nickname: data.user.nickname,
      });

      setTimeout(() => {
        router.push("/"); 
      }, 1000);     
    },
    onError: (error: any) => {
      //에러시 '에러메세지' 모달 열기
      //에러 메시지 출력 
      setModalOpen(true);
      // setMassage(error?.response?.data?.message || "로그인에 실패했습니다.");  -> 활용시 비밀번호가 틀렸는지 이메일이 틀렸는지 구분할 수 있음
      // 아래 내용은 요구사항 내용
      setMassage("이메일 혹은 비밀번호를 확인해주세요.");
      // useFormContext 활용 form 리셋
      reset({ email: '', password: '' });
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    login(data);
  };

  return (
    <>
      <div className="min-h-dvh">
        <div className="max-w-[440px] md:max-w-[640px] w-full mx-auto pt-[93px] pb-[93px] min-h-[100dvh] flex justify-center items-center">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-[39px]">
                <InputField
                  id="login_email"
                  label="이메일"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  error={errors.email?.message}
                  {...register("email")}
                  className="h-[55px] md:h-[70px] text-[14px] md:text-[16px]"
                />
              </div>
              <div className="mb-[59px]">
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
              {/* RHF 사용시 별다른 옵션없이도 엔터시 submit */}
              <BaseButton
                disabled={!isValid}
                className="w-full h-[65px] font-semibold text-lg"
                type="submit"
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

export default SigninPage;
