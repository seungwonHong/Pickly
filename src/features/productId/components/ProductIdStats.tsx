'use client'

import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'

import { productService } from '../api'
import ProductIdStatsBone from './ProductIdStatsBone'

import Heart from '../../../../public/icons/Heart.png'
import Star from '../../../../public/icons/Star.png'
import Talk from '../../../../public/icons/Talk.png'

export default function ProductIdStats() {
  const { id } = useParams()
  console.log('id:', id)

  const {
    data: score,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['productIdStats', id],
    queryFn: () =>
      productService.getProductsId(Number(id)).then((res) => res.data),
    enabled: !!id,
  })
  console.log(
    'score:',
    score,
    'isLoading:',
    isLoading,
    'isError:',
    isError,
    'error:',
    error
  )
  return (
    <div className="w-[940px] h-[244px] text-amber-50 flex flex-col gap-[29px]">
      <div className="text-[20px] font-normal">상품통계</div>
      <div className="flex justify-between align-center ">
        <ProductIdStatsBone
          title="별점 평균"
          icon={Star}
          score={score?.averageRating}
        />
        <ProductIdStatsBone
          title="하트 수"
          icon={Heart}
          score={score?.heartCount}
        />
        <ProductIdStatsBone title="댓글 수" icon={Talk} />
      </div>
    </div>
  )
}

// import { useQuery } from '@tanstack/react-query'
// import { useParams } from 'next/navigation'

// import { productService, userService } from '../api'

// export default function useProductIdReview() {
//   const { id } = useParams()

//   // 로그인 되면 목데이터 뺄 예정
//   const mockUser = {
//     id: 793,
//     nickname: '라몽이',
//     description: '',
//     image: null,
//     createdAt: '2025-05-27T14:03:49.395Z',
//     updatedAt: '2025-05-27T14:03:49.395Z',
//     teamId: '14-6',
//     isFollowing: false,
//     followersCount: 0,
//     followeesCount: 0,
//     reviewCount: 0,
//     averageRating: 0,
//     mostFavoriteCategory: null,
//   }

//   const { data: user } = useQuery({
//     queryKey: ['user'],
//     queryFn: () => Promise.resolve(mockUser),
//     // queryFn: () => userService.getUser().then((res) => res.data),  -> 로그인 완료되면 다시 해야합니다.
//   })

//   const {
//     data: product,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ['product', id],
//     queryFn: () =>
//       productService.getProductsId(Number(id)).then((res) => res.data),
//     enabled: !!id,
//   })

//   return {
//     user,
//     product,
//     isLoading,
//     isError,
//     error,
//   }
// }
