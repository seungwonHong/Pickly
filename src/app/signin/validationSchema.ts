
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: '이메일은 필수입니다.' })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '유효한 이메일을 입력해주세요.',
    ),

  password: z
    .string({ required_error: '비밀번호는 필수입니다.' })
    .min(8, '8자 이상 입력해주세요.')
    .max(20, '20자 이하로 입력해주세요.')
    .regex(
      /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
      '영문, 숫자, 특수문자(!@#$%^&*)만 입력 가능합니다.',
    ),

});

// 유효성 검사 그대로 타입정의
export type LoginForm = z.infer<typeof loginFormSchema>;

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  description: z.string(),
  image: z.string().nullable(),
  nickname: z.string(),
  teamId: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;


export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  user: UserSchema,
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;