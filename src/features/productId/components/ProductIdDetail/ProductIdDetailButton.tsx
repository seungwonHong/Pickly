"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";

import { productService } from "../../api";
import { checkLoginStatus } from "../../hooks/checkLogin";
import { GetProductIdDetail } from "../../types";
import useGetUser from "../../hooks/useGetUser";

import useModalStore from "@/features/home/modals/store/modalStore";

const BaseButton = dynamic(() => import("@/components/shared/BaseButton"), {
  ssr: false,
});
const TypeButton = dynamic(() => import("@/components/shared/TypeButton"), {
  ssr: false,
});
const AddEditProductModal = dynamic(
  () => import("@/components/shared/AddEditProductModal"),
  {
    ssr: false,
    loading: () => null,
  }
);
const ProductReviewModal = dynamic(
  () => import("../modal/ProductReviewModal/ProductReviewModal"),
  {
    ssr: false,
    loading: () => null,
  }
);
const ProductCompareModal = dynamic(
  () => import("../modal/ProductCompareModal/ProductCompareModal"),
  {
    ssr: false,
    loading: () => null,
  }
);
const ProductComparePlusModal = dynamic(
  () => import("@/components/shared/ProductComparePlusModal"),
  {
    ssr: false,
    loading: () => null,
  }
);
type ModalTypes =
  | "review"
  | "compare"
  | "comparePlus"
  | "editProduct"
  | "deleteProduct";

export default function ProductIdDetailButton({
  product,
}: {
  product: GetProductIdDetail;
}) {
  // useGetUser 훅을 사용하여 현재 사용자 정보를 가져옴
  const { user, compareList, addToCompare } = useGetUser();
  const isOwner = user?.id === product.writerId;
  const productId = product.id;
  const router = useRouter();
  const searchParams = useSearchParams();

  const sameCategoryCompareList = useMemo(() => {
    return compareList.filter(
      (item) => item.category.id === product?.category?.id
    );
  }, [compareList, product?.category?.id]);

  //  ProductComparePlusModal 관련 상태
  const [comparePlusModalMessage, setComparePlusModalMessage] = useState("");
  const [comparePlusButtonMessage, setComparePlusButtonMessage] = useState("");

  const modalFromUrl = searchParams.get("modal") as ModalTypes | null;
  const [modal, setModal] = useState<ModalTypes | null>(modalFromUrl);

  const { setName, setDescription, setImage, setClickedValue } =
    useModalStore();

  const openModal = (modalName: ModalTypes) => {
    setModal(modalName);
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", modalName);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const closeModal = () => {
    setModal(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // 로그인 리다이렉트 핸들러
  const handleLoginRedirect = () => {
    closeModal();
    router.push("/signin");
  };
  // 비교하기 리다이렉트 핸들러
  const handleCompareRedirect = () => {
    closeModal();
    router.push("/compare");
  };
  // 로그인 확인
  const requireLogin = async (): Promise<boolean> => {
    const { isLoggedIn, accessToken } = await checkLoginStatus();

    if (!isLoggedIn || !accessToken) {
      setComparePlusModalMessage("로그인이 필요한 서비스입니다.");
      setComparePlusButtonMessage("로그인하러가기");
      openModal("comparePlus");

      return false;
    }
    return true;
  };
  // 비교하기 모달
  const handleCompareClick = () => {
    const isAlreadyInList = sameCategoryCompareList.some(
      (item) => Number(item.id) === Number(product.id)
    );

    if (isAlreadyInList) {
      setComparePlusModalMessage("이미 비교 목록에 있는 \n상품입니다.");
      openModal("comparePlus");
      return;
    }

    if (sameCategoryCompareList.length === 0) {
      addToCompare(product);
      setComparePlusModalMessage("비교 상품으로 등록되었습니다!");
      openModal("comparePlus");
    } else if (sameCategoryCompareList.length === 1) {
      addToCompare(product);
      setComparePlusModalMessage(
        "비교 상품으로 등록되었습니다.\n바로 확인해 보시겠어요?"
      );
      setComparePlusButtonMessage("확인하러가기");
      openModal("comparePlus");
    } else {
      openModal("compare");
    }
  };

  // 리뷰 작성하기 모달 핸들러 쿠키
  const handleReviewClick = async () => {
    if (!(await requireLogin())) {
      return;
    }
    openModal("review");
  };
  const handleProductEdit = async () => {
    if (!(await requireLogin())) return;
    setName(product.name || "");
    setDescription(product.description || "");
    setImage(product.image || "");
    setClickedValue("수정하기");
    openModal("editProduct");
  };

  const handleProductDelete = async () => {
    if (!(await requireLogin())) return;
    setComparePlusModalMessage("정말 삭제하시겠습니까?");
    setComparePlusButtonMessage("삭제하기");
    openModal("deleteProduct");
  };
  const handleConfirmDelete = async () => {
    const { accessToken } = await checkLoginStatus();

    if (!accessToken) {
      setComparePlusModalMessage("로그인이 필요한 서비스입니다.");
      setComparePlusButtonMessage("로그인하러가기");
      openModal("comparePlus");
      return;
    }

    try {
      await productService.deleteProductsId(productId, accessToken);
      toast.success("상품이 삭제되었습니다.");
      closeModal();
      setTimeout(() => {
        router.push("/homepage");
      }, 100);
    } catch {
      toast.error("상품 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    const modalFromUrl = searchParams.get("modal") as ModalTypes | null;
    if (modalFromUrl !== modal) {
      setModal(modalFromUrl);
    }
  }, [searchParams.toString()]);

  return (
    <>
      {isOwner ? (
        <div className="flex items-center justify-between md:flex-row flex-col">
          <BaseButton
            disabled={false}
            className="lg:px-[30px] lg:py-[22px] md:px-[16px] md:py-[18px] px-[130px] py-[15px] font-semibold lg:text-[17px] md:text-[14px] text-[12px] mb-[15px] md:mb-[0px]"
            onClick={handleReviewClick}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="lg:px-[30px] lg:py-[22px] md:px-[16px] md:py-[18px] px-[138px] py-[15px] font-semibold lg:text-[17px] md:text-[14px] text-[14px] "
            onClick={handleCompareClick}
          >
            비교하기
          </TypeButton>
          <TypeButton
            type="tertiary"
            className="lg:px-[30px] lg:py-[22px] md:px-[16px] md:py-[18px] px-[138px] py-[15px] font-semibold lg:text-[17px] md:text-[14px] text-[14px] mt-[15px] md:mt-[0px]"
            onClick={handleProductEdit}
          >
            편집하기
          </TypeButton>
          <TypeButton
            type="tertiary"
            className="lg:px-[30px] lg:py-[22px] md:px-[16px] md:py-[18px] px-[138px] py-[15px] font-semibold lg:text-[17px] md:text-[14px] text-[14px] mt-[15px] md:mt-[0px]"
            onClick={handleProductDelete}
          >
            삭제하기
          </TypeButton>
        </div>
      ) : (
        <div className="flex items-center justify-between md:flex-row flex-col">
          <BaseButton
            disabled={false}
            className="lg:px-[123.5px] lg:py-[22px] md:px-[70px] md:py-[18px] px-[123px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mb-[15px] md:mb-[0px]"
            onClick={handleReviewClick}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="lg:px-[58.5px] lg:py-[22px] md:px-[33px] md:py-[18px] px-[136px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] "
            onClick={handleCompareClick}
          >
            비교하기
          </TypeButton>
        </div>
      )}
      {modal === "review" && <ProductReviewModal open setOpen={closeModal} />}

      {modal === "compare" && <ProductCompareModal open setOpen={closeModal} />}

      {modal === "comparePlus" && (
        <ProductComparePlusModal
          open
          setOpen={closeModal}
          message={comparePlusModalMessage}
          buttonText={comparePlusButtonMessage}
          onButtonClick={
            comparePlusButtonMessage === "로그인하러가기"
              ? handleLoginRedirect
              : comparePlusButtonMessage === "확인하러가기"
              ? handleCompareRedirect
              : undefined
          }
        />
      )}

      {modal === "editProduct" && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/40">
          <AddEditProductModal
            buttonPlaceholder="수정하기"
            modalType="editProduct"
            purpose="상품 수정"
            productinfo={product}
          />
        </div>
      )}
      {modal === "deleteProduct" && (
        <ProductComparePlusModal
          open
          setOpen={closeModal}
          message={comparePlusModalMessage}
          buttonText={comparePlusButtonMessage}
          onButtonClick={handleConfirmDelete}
        />
      )}
    </>
  );
}
