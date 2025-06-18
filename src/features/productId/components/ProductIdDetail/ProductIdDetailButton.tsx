"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { checkLoginStatus } from "../../hooks/checkLogin";
import { GetProductIdDetail } from "../../types";
import BaseButton from "@/components/shared/BaseButton";
import TypeButton from "@/components/shared/TypeButton";
import useGetUser from "../../hooks/useGetUser";

import useModalStore from "@/features/home/modals/store/modalStore";
const AddEditProductModal = dynamic(
  () => import("@/components/shared/AddEditProductModal"),
  {
    ssr: false,
  }
);
const ProductReviewModal = dynamic(
  () => import("../modal/ProductReviewModal/ProductReviewModal"),
  {
    ssr: false,
  }
);
const ProductCompareModal = dynamic(
  () => import("../modal/ProductCompareModal/ProductCompareModal"),
  {
    ssr: false,
  }
);
const ProductComparePlusModal = dynamic(
  () => import("@/components/shared/ProductComparePlusModal"),
  {
    ssr: false,
  }
);
type ModalTypes = "review" | "compare" | "comparePlus" | "editProduct";

export default function ProductIdDetailButton({
  product,
}: {
  product: GetProductIdDetail;
}) {
  // useGetUser 훅을 사용하여 현재 사용자 정보를 가져옴
  const { user, compareList, addToCompare } = useGetUser();
  const isOwner = user?.id === product.writerId;

  const router = useRouter();
  const searchParams = useSearchParams();

  const sameCategoryCompareList = compareList.filter(
    (item) => item.category.id === product?.category?.id
  );

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

  // 비교하기 모달
  const handleCompareClick = () => {
    const isAlreadyInList = sameCategoryCompareList.some(
      (item) => Number(item.id) === Number(product.id)
    );

    if (isAlreadyInList) {
      setComparePlusModalMessage("이미 비교 목록에 있는 상품입니다.");
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
    // 쿠키 확인
    const { isLoggedIn } = await checkLoginStatus();
    if (!isLoggedIn) {
      setComparePlusModalMessage("로그인이 필요한 서비스입니다.");
      setComparePlusButtonMessage("로그인하러가기");
      openModal("comparePlus");
      return;
    }
    openModal("review");
  };
  const handleProductEdit = async () => {
    const { isLoggedIn } = await checkLoginStatus();
    if (!isLoggedIn) {
      setComparePlusModalMessage("로그인이 필요한 서비스입니다.");
      setComparePlusButtonMessage("로그인하러가기");
      openModal("comparePlus");
      return;
    }

    setName(product.name || "");
    setDescription(product.description || "");

    setImage(product.image || "");
    setClickedValue("수정하기");

    openModal("editProduct");
  };

  useEffect(() => {
    const modalFromUrl = searchParams.get("modal") as ModalTypes | null;
    if (modalFromUrl !== modal) {
      setModal(modalFromUrl);
    }
  }, [searchParams]);

  return (
    <>
      {isOwner ? (
        <div className="flex items-center justify-between md:flex-row flex-col">
          <BaseButton
            disabled={false}
            className="lg:px-[44.5px] lg:py-[22px] md:px-[24px] md:py-[18px] px-[126px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mb-[15px] md:mb-[0px]"
            onClick={handleReviewClick}
          >
            리뷰 작성하기
          </BaseButton>
          <TypeButton
            type="secondary"
            className="lg:px-[44.5px] lg:py-[22px] md:px-[24px] md:py-[18px] px-[139px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] "
            onClick={handleCompareClick}
          >
            비교하기
          </TypeButton>
          <TypeButton
            type="tertiary"
            className="lg:px-[44.5px] lg:py-[22px] md:px-[24px] md:py-[18px] px-[139px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mt-[15px] md:mt-[0px]"
            onClick={handleProductEdit}
          >
            편집하기
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
    </>
  );
}

//  "use client";
//  import { useRouter } from "next/navigation";
// import { useState } from "react";
// import dynamic from "next/dynamic";

// import { checkLoginStatus } from "../../hooks/checkLogin";
// import { GetProductIdDetail } from "../../types";
// import BaseButton from "@/components/shared/BaseButton";
// import TypeButton from "@/components/shared/TypeButton";
// import useGetUser from "../../hooks/useGetUser";

// const AddEditProductModal = dynamic(
//   () => import("@/components/shared/AddEditProductModal"),
//   {
//     ssr: false,
//   }
// );
// const ProductReviewModal = dynamic(
//   () => import("../modal/ProductReviewModal/ProductReviewModal"),
//   {
//     ssr: false,
//   }
// );
// const ProductCompareModal = dynamic(
//   () => import("../modal/ProductCompareModal/ProductCompareModal"),
//   {
//     ssr: false,
//   }
// );
// const ProductComparePlusModal = dynamic(
//   () => import("@/components/shared/ProductComparePlusModal"),
//   {
//     ssr: false,
//   }
// );
// type ModalTypes = "review" | "compare" | "comparePlus" | "editProduct";

// export default function ProductIdDetailButton({
//   product,
// }: {
//   product: GetProductIdDetail;
// }) {
//   // useGetUser 훅을 사용하여 현재 사용자 정보를 가져옴
//   const { user, compareList, addToCompare } = useGetUser();
//   const isOwner = user?.id === product.writerId;

//   const router = useRouter();

//   //ProductComparePlusModal 관련 상태
//   const [activeModal, setActiveModal] = useState<ModalTypes | null>(null);
//   const [comparePlusModalMessage, setComparePlusModalMessage] = useState("");
//   const [comparePlusButtonMessage, setComparePlusButtonMessage] = useState("");

//   const sameCategoryCompareList = compareList.filter(
//     (item) => item.category.id === product?.category?.id
//   );

//   const openModal = (modalName: ModalTypes) => setActiveModal(modalName);
//   const closeModal = () => setActiveModal(null);

//   // 로그인 리다이렉트 핸들러
//   const handleLoginRedirect = () => {
//     closeModal();
//     router.push("/signin");
//   };
//   // 비교하기 리다이렉트 핸들러
//   const handleCompareRedirect = () => {
//     closeModal();
//     router.push("/compare");
//   };

//   // 비교하기 모달
//   const handleCompareClick = () => {
//     const isAlreadyInList = sameCategoryCompareList.some(
//       (item) => Number(item.id) === Number(product.id)
//     );
//     if (isAlreadyInList) {
//       setComparePlusModalMessage("이미 비교 목록에 있는 상품입니다.");
//       openModal("comparePlus");
//       return;
//     }
//     if (sameCategoryCompareList.length === 0) {
//       addToCompare(product);
//       setComparePlusModalMessage("비교 상품으로 등록되었습니다!");
//       openModal("comparePlus");
//     } else if (sameCategoryCompareList.length === 1) {
//       addToCompare(product);
//       setComparePlusModalMessage(
//         "비교 상품으로 등록되었습니다.\n바로 확인해 보시겠어요?"
//       );
//       setComparePlusButtonMessage("확인하러가기");
//       openModal("comparePlus");
//     } else {
//       openModal("compare");
//     }
//   };

//   // 리뷰 작성하기 모달 핸들러 쿠키
//   const handleReviewClick = async () => {
//     const { isLoggedIn } = await checkLoginStatus();
//     if (!isLoggedIn) {
//       setComparePlusModalMessage("로그인이 필요한 서비스입니다.");
//       setComparePlusButtonMessage("로그인하러가기");
//       openModal("comparePlus");

//       return;
//     }
//     openModal("review");
//   };

//   const handleProductEdit = async () => {
//     const { isLoggedIn } = await checkLoginStatus();
//     if (!isLoggedIn) {
//       setComparePlusModalMessage("로그인이 필요한 서비스입니다.");
//       setComparePlusButtonMessage("로그인하러가기");
//       openModal("comparePlus");
//       return;
//     }
//     // useModalStore로 상태 세팅
//     openModal("editProduct");
//   };
//   // 쿠키 이용하면 로딩중 버튼 갯수 빠르게 로딩 가능
//   return (
//     <>
//       {isOwner ? (
//         <div className="flex items-center justify-between md:flex-row flex-col">
//           <BaseButton
//             disabled={false}
//             className="lg:px-[44.5px] lg:py-[22px] md:px-[24px] md:py-[18px] px-[126px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mb-[15px] md:mb-[0px]"
//             onClick={handleReviewClick}
//           >
//             리뷰 작성하기
//           </BaseButton>
//           <TypeButton
//             type="secondary"
//             className="lg:px-[44.5px] lg:py-[22px] md:px-[24px] md:py-[18px] px-[139px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] "
//             onClick={handleCompareClick}
//           >
//             비교하기
//           </TypeButton>
//           <TypeButton
//             type="tertiary"
//             className="lg:px-[44.5px] lg:py-[22px] md:px-[24px] md:py-[18px] px-[139px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mt-[15px] md:mt-[0px]"
//             onClick={handleProductEdit}
//           >
//             편집하기
//           </TypeButton>
//         </div>
//       ) : (
//         <div className="flex items-center justify-between md:flex-row flex-col">
//           <BaseButton
//             disabled={false}
//             className="lg:px-[123.5px] lg:py-[22px] md:px-[70px] md:py-[18px] px-[123px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] mb-[15px] md:mb-[0px]"
//             onClick={handleReviewClick}
//           >
//             리뷰 작성하기
//           </BaseButton>
//           <TypeButton
//             type="secondary"
//             className="lg:px-[58.5px] lg:py-[22px] md:px-[33px] md:py-[18px] px-[136px] py-[15px] font-semibold lg:text-[18px] md:text-[16px] text-[14px] "
//             onClick={handleCompareClick}
//           >
//             비교하기
//           </TypeButton>
//         </div>
//       )}
//       <ProductReviewModal
//         open={activeModal === "review"}
//         setOpen={closeModal}
//       />
//       <ProductCompareModal
//         open={activeModal === "compare"}
//         setOpen={closeModal}
//       />
//       <ProductComparePlusModal
//         open={activeModal === "comparePlus"}
//         setOpen={closeModal}
//         message={comparePlusModalMessage}
//         buttonText={comparePlusButtonMessage}
//         onButtonClick={
//           comparePlusButtonMessage === "로그인하러가기"
//             ? () => {
//                 closeModal();
//                 handleLoginRedirect();
//               }
//             : comparePlusButtonMessage === "확인하러가기"
//             ? () => {
//                 closeModal();
//                 handleCompareRedirect();
//               }
//             : undefined
//         }
//       />
//       {activeModal === "editProduct" && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/40">
//           <AddEditProductModal
//             buttonPlaceholder="수정하기"
//             modalType="editProduct"
//             purpose="상품 수정"
//             productinfo={product}
//           />
//         </div>
//       )}
//     </>
//   );
// }
