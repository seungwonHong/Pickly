
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: '이메일은 필수 입력입니다.' })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '이메일 형식으로 작성해 주세요.',
    ),

  password: z
    .string({ required_error: '비밀번호는 필수 입력입니다.' })
    .min(8, '비밀번호는 최소 8자 이상입니다.')
    .max(20, '비밀번호는 최대 20자 이하로 입력해주세요.')
    .regex(
      /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
      '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.”',
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