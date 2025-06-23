"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import KakaoLink from "../../../../../public/icons/kakako-link.png";
import LinkShare from "../../../../../public/icons/link-share.png";
import Trash from "../../../../../public/icons/trash-icon.png";

import { productService } from "../../api";
import { checkLoginStatus } from "../../hooks/checkLogin";
import { GetProductIdDetail } from "../../types";
import useGetUser from "../../hooks/useGetUser";

const ProductComparePlusModal = dynamic(
  () => import("@/components/shared/ProductComparePlusModal"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function CopyLinkImage({
  product,
}: {
  product: GetProductIdDetail;
}) {
  const [modalopen, setModalOpen] = useState(false);
  const [comparePlusModalMessage, setComparePlusModalMessage] = useState("");
  const [comparePlusButtonMessage, setComparePlusButtonMessage] = useState("");
  const router = useRouter();
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useGetUser();
  const productId = product.id;

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
        console.error("Kakao JS 키가 없습니다. .env.local을 확인해주세요.");
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

  const handleKakaoShare = () => {
    if (window.Kakao) {
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

  const handleDeleteClick = () => {
    setComparePlusModalMessage("정말 삭제하시겠습니까?");
    setComparePlusButtonMessage("삭제하기");
    setModalOpen(true);
  };

  // 삭제 실행
  const handleConfirmDelete = async () => {
    const { isLoggedIn, accessToken } = await checkLoginStatus();
    if (!isLoggedIn || !accessToken) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    try {
      await productService.deleteProductsId(productId, accessToken);
      toast.success("상품이 삭제되었습니다.");
      router.back();
    } catch {
      toast.error("상품 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    const checkOwner = async () => {
      const { isLoggedIn } = await checkLoginStatus();
      if (!isLoggedIn) return;
      if (user?.id === product.writerId) {
        setIsOwner(true);
      }
    };
    checkOwner();
  }, [user, product.writerId]);

  return (
    <>
      <div className="flex items-center justify-between gap-[10px] ">
        {isOwner && (
          <div
            className="p-[5px] cursor-pointer bg-[#252530] rounded-[8px]"
            onClick={handleDeleteClick}
          >
            <Image src={Trash} alt="삭제" width={18} height={18} priority />
          </div>
        )}
        <div
          className="p-[5px] cursor-pointer bg-[#252530] rounded-[8px]"
          onClick={handleKakaoShare}
        >
          <Image
            src={KakaoLink}
            alt="카카오 공유 링크"
            width={18}
            height={18}
            priority
          />
        </div>
        <div
          className="p-[5px] cursor-pointer bg-[#252530] rounded-[8px]"
          onClick={handleCopyLink}
        >
          <Image
            src={LinkShare}
            alt="링크 공유"
            width={18}
            height={18}
            priority
          />
        </div>
      </div>
      {modalopen && (
        <ProductComparePlusModal
          open
          setOpen={() => setModalOpen(false)}
          message={comparePlusModalMessage}
          buttonText={comparePlusButtonMessage}
          onButtonClick={handleConfirmDelete}
        />
      )}
    </>
  );
}
