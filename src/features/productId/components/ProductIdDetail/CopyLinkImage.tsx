"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect } from "react";

import KakaoLink from "../../../../../public/images/kakao-link.png";
import LinkShare from "../../../../../public/images/link-share.png";

export default function CopyLinkImage() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

      if (kakaoKey) {
        window.Kakao.init(kakaoKey);
      } else {
        console.error(
          "Kakao JS 키가 존재하지 않습니다. .env.local을 확인해주세요."
        );
      }
    }
  }, []);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("링크가 클립보드에 복사되었습니다.");
      })
      .catch((error) => {
        console.error("링크 복사 실패:", error);
        toast.error("링크 복사에 실패했습니다.");
      });
  };

  // 안됨..
  const handleKakaoShare = () => {
    console.log("카카오 공유 버튼 클릭됨");
    if (window.Kakao) {
      console.log("window.Kakao 존재");
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "Pickly에서 상품을 확인해보세요!",
          description: "리뷰도 많고 평점도 확인할 수 있어요.",
          imageUrl: "https://yourdomain.com/sample-image.jpg",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <div className="flex items-center justify-between gap-[10px]">
      <Image
        src={KakaoLink}
        alt="카카오 공유 링크"
        width={28}
        height={28}
        onClick={handleKakaoShare}
        className="cursor-pointer"
      />
      <Image
        src={LinkShare}
        alt="링크 공유"
        width={28}
        height={28}
        onClick={handleCopyLink}
        className="cursor-pointer"
      />
    </div>
  );
}
