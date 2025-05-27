'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import productService from '../api'

import HeartActive from '../../../../public/svg/heart-active.svg'
import HeartInactive from '../../../../public/svg/heart-inactive.svg'
import KakaoLink from '../../../../public/image/kakao-link.png'
import LinkShare from '../../../../public/image/link-share.png'
export default function ProductIdReview() {
  const { id } = useParams()

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductsId(Number(id)),
    enabled: !!id,
  })
  console.log(product?.data)
  const productData = product?.data
  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>에러 발생: {(error as Error).message}</div>

  return (
    <div className="flex items-center justify-between gap-10 bg-[#1c1c22] text-[#f1f1f5]">
      <img src={productData.image} width={306} height={228} alt="상품 이미지" />
      <div>
        <div>{productData.category.name}</div>
        <div>
          <div className="flex items-center gap-[15px] justify-between">
            <div>{productData.name}</div>
            <Image src={HeartInactive} alt="좋아요" width={24} height={24} />
          </div>
          <div>
            <Image src={KakaoLink} alt="카카오링크" width={24} height={24} />
            <Image src={LinkShare} alt="링크공유" width={24} height={24} />
          </div>
        </div>
        <div className="text-[16px]">{productData.description}</div>
        <div>
          <div>버튼1</div>
          <div>버튼2</div>
        </div>
      </div>
    </div>
  )
}
