import { useQuery } from '@tanstack/react-query'

// import { userService } from '../api'

export default function useGetUser() {
  // 로그인 되면 목데이터 뺄 예정
  const mockUser = {
    id: 793,
    nickname: '라몽이',
    description: '',
    image: null,
    createdAt: '2025-05-27T14:03:49.395Z',
    updatedAt: '2025-05-27T14:03:49.395Z',
    teamId: '14-6',
    isFollowing: false,
    followersCount: 0,
    followeesCount: 0,
    reviewCount: 0,
    averageRating: 0,
    mostFavoriteCategory: null,
  }

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => Promise.resolve(mockUser),
    // queryFn: () => userService.getUser().then((res) => res.data),  -> 로그인 완료되면 다시 해야합니다.
  })

  return {
    user,
  }
}
