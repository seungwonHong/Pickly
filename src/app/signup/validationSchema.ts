
import { z } from 'zod';

export const joinFormSchema = z.object({
  email: z
    .string({ required_error: '이메일은 필수 입력입니다.' })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '이메일 형식으로 작성해 주세요.',
    ),

  nickname: z
    .string({ required_error: '닉네임은 필수 입력입니다.' })
    .min(1, '닉네임은 최소 1자부터 가능합니다.')
    .max(10, '닉네임은 최대 10자까지 가능합니다.'),

  password: z
    .string({ required_error: '비밀번호는 필수 입력입니다.' })
    .min(8, '비밀번호는 최소 8자 이상입니다.')
    .max(20, '비밀번호는 최대 20자 이하입니다.')
    .regex(
      /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
      '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.',
    ),

  passwordConfirmation: z
    .string({ required_error: '비밀번호 확인을 입력해주세요.' }),

}).refine(
  (data) => data.password === data.passwordConfirmation,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  }
);


// 유효성 검사 그대로 타입정의
export type JoinForm = z.infer<typeof joinFormSchema>;

export const simpleJoinFormSchema = z.object({
  nickname: z
    .string({ required_error: '닉네임은 필수 입력입니다.' })
    .min(1, '닉네임은 최소 1자부터 가능합니다.')
    .max(10, '닉네임은 최대 10자까지 가능합니다.'),
});
export type SimpleJoinForm = z.infer<typeof simpleJoinFormSchema>;
