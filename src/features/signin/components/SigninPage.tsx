"use client";
import { InputField } from "@/components/input/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserStore } from "@/features/productId/libs/useUserStore";
import Link from "next/link";
import BaseButton from "@/components/shared/BaseButton";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/app/signin/useSignIn";
import {
  AuthResponse,
  LoginForm,
  loginFormSchema,
} from "@/app/signin/validationSchema";
import ErrorPage from "@/app/signin/error";

const login_logo = "/signup_logo.svg";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

const SigninPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email openid`;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&scope=account_email,profile_nickname,profile_image&prompt=consent`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onChange", // blur 시 유효성 검사
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate: login } = useLoginMutation({
    onSuccess: (data: AuthResponse) => {
      //로그인 성공시 '닉네임님 로그인 되었습니다! ' 모달 활성화 후 1초 뒤 홈으로 이동
      //zustand store에 유저 정보 저장
      toast.success(`${data.user.nickname}님 로그인 되었습니다!`);
      setTimeout(() => {
        router.replace("/homepage");
      }, 1000);
      useUserStore.getState().setUserData({
        id: data.user.id,
        nickname: data.user.nickname,
      });
    },
    onError: () => {
      toast.error("이메일 혹은 비밀번호를 확인해주세요.");
      reset({ email: "", password: "" });
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    login(data);
  };

  if (error === "oauth") {
    return <ErrorPage />;
  }

  return (
    <>
      <div
        className={`min-h-dvh bg-[url('/signup_bg.jpg')] bg-cover bg-center bg-no-repeat`}
      >
        <div className="max-w-[440px] md:max-w-[640px] w-full mx-auto pt-[93px] pb-[93px] min-h-[100dvh] flex justify-center items-center">
          <div className="w-full px-[20px] lg:px-[0px]">
            <div className="flex justify-center items-center mb-[25px]">
              <Link href="/">
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
                  id="login_email"
                  label="이메일"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  error={errors.email?.message}
                  {...register("email")}
                  className="h-[55px] md:h-[70px] text-[14px] md:text-[16px] shadow-lg"
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
                  className="h-[55px] md:h-[70px] text-[14px] md:text-[16px] shadow-lg"
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
            <div className="text-[var(--color-deepGray)] mt-[40px] text-center text-base">
              <span>
                아직 회원이 아니신가요?{" "}
                <Link
                  href="/signup"
                  className="hover:text-[var(--color-white)]"
                >
                  회원가입
                </Link>
              </span>
            </div>
            {/* <div className="text-[var(--color-deepGray)] mt-[20px] text-center text-base">
              <ul className="flex justify-center gap-5 mt-[19px]">
                <li>
                  <Link
                    href={googleAuthUrl}
                    className="group relative block border border-[#353542] rounded-full hover:bg-[var(--color-white)] hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg"
                  >
                    <span
                      className="
                      block 
                      bg-[var(--color-deepGray)] 
                      h-[56px] w-[56px] 
                      transition-all 
                      duration-300 
                      mask-[url('/icons/login_sns_google.svg')] 
                      mask-no-repeat 
                      mask-center 
                      hover:bg-[url('/sns_gg_bg.png')] bg-cover bg-center bg-no-repeat 
                      text-[0px]"
                    >
                      구글 로그인
                    </span>
                    <span className="absolute  group-hover:last:block hidden -bottom-[30px] left-1/2 translate-x-[-50%] block text-[var(--color-deepGray)] text-[14px] whitespace-nowrap">
                      구글 로그인
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={kakaoLoginUrl}
                    className="group relative block border border-[#353542] rounded-full hover:bg-[#f3e21f]  hover:scale-110 transition-transform duration-200 ease-in-out shadow-lg"
                  >
                    <span
                      className="
                      block 
                      h-[56px] w-[56px] 
                      bg-[var(--color-deepGray)] 
                      hover:bg-[#361d1e] 
                      transition-colors 
                      duration-300 
                      mask-[url('/icons/login_sns_kakao.svg')] 
                      mask-no-repeat 
                      mask-center 
                      text-[0px] hover:animate-spin-slow"
                    >
                      카카오톡 로그인
                    </span>
                    <span className="absolute group-hover:last:block hidden -bottom-[30px] left-1/2 translate-x-[-50%] text-[var(--color-deepGray)] text-[14px] whitespace-nowrap">
                      카카오톡 로그인
                    </span>
                  </Link>
                </li>
              </ul>
              
              <ul className="flex justify-center gap-5 mt-[50px]">
                <li>
                  <Link href="/privacy" className="hover:underline text-[16px] text-[var(--color-deepGray)]">
                    <span>개인정보처리방침</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline text-[16px] text-[var(--color-deepGray)]">
                    <span>서비스 이용약관</span>
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
