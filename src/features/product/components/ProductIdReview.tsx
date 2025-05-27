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

  // api 호출
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
    <div className="flex items-center justify-between gap-10 text-[#f1f1f5]">
      <img src={productData.image} width={306} height={228} alt="상품 이미지" />
      <div className="w-[545px] ">
        <div className="pb-[9.5px]">{productData.category.name}</div>
        <div className="flex items-center justify-between pb-[49px]">
          <div className="flex items-center gap-[15px] justify-between">
            <div className="text-2xl">{productData.name}</div>
            <Image src={HeartInactive} alt="좋아요" width={24} height={24} />
          </div>
          <div className="flex items-center justify-between gap-[10px]">
            <Image src={KakaoLink} alt="카카오링크" width={24} height={24} />
            <Image src={LinkShare} alt="링크공유" width={24} height={24} />
          </div>
        </div>
        <div className="text-[16px] pb-[60px]">{productData.description}</div>
        <div className="flex items-center justify-between">
          <div>버튼1</div>
          <div>버튼2</div>
        </div>
      </div>
    </div>
  )
}
