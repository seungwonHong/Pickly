"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { InputField } from "../input/InputField";
import CategoryDropDown from "./CategoryDropDown";
import { Textbox } from "../input/Textbox";
import BaseButton from "./BaseButton";
import useModalStore from "@/features/home/modals/store/modalStore";
import { ProductInfo } from "@/features/home/types/productType";
import { handleSubmit } from "@/lib/utils/addProductFunction";
import editProductFunction from "@/lib/utils/editProductFunction";
import ProductComparePlusModal from "./ProductComparePlusModal";
import toast from "react-hot-toast";

interface Props {
  buttonPlaceholder: string;
  modalType: "addProduct" | "editProduct";
  productinfo?: ProductInfo;
  purpose: string;
}

const AddEditProductModal = ({
  buttonPlaceholder,
  modalType,
  productinfo,
  purpose,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [addProduct, setAddProduct] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const productId = productinfo?.id || null;

  const {
    name,
    setName,
    categoryId,
    description,
    setDescription,
    setImage,
    image,
    setCategoryId,
    setClickedValue,
    isModalOpen,
    setIsModalOpen,
  } = useModalStore();

  const handleClose = () => {
    setIsModalOpen(false);
    setClickedValue("카테고리 선택");
    setImage(null);
    setName(null);
    setDescription(undefined);
    setCategoryId(null);
    setFile(null);
  };

  const chooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const fileName = selected.name;
      const hasKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(fileName.normalize("NFC"));
      if (hasKorean) {
        toast.error(
          "파일 이름에 한글이 포함되어 있습니다. 다른 이름을 사용해주세요."
        );
        return;
      }
      const fileURL = URL.createObjectURL(selected);
      setImage(fileURL);
      setFile(selected);
    }
  };

  useEffect(() => {
    if (productinfo) {
      setClickedValue(productinfo.category.name);
      setImage(productinfo.image);
      setName(productinfo.name);
      setDescription(productinfo.description);
    }
  }, [isModalOpen]);
  // 한번 수정하면 setCategoryId가  다시 null로 초기화 돼서 수정이 안되는 문제 땜에 isModalOpen로 의존성 배열 추가했어요
  return (
    <div
      className={`${
        isModalOpen || "hidden"
      } fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center bg-[#000000B2]`}
    >
      <div className="flex flex-col justify-center items-center overflow-y-auto lg:max-w-[620px] lg:max-h-[614px] md:max-w-[590px] md:max-h-[569px] max-w-[335px] h-[578px] w-[80vw] md:p-[40px] p-[20px] bg-[#1C1C22] rounded-2xl">
        <div className="relative flex flex-col w-full h-full">
          <IoClose
            color="#F1F1F5"
            className="ml-auto cursor-pointer lg:w-[40px] lg:h-[40px] md:w-[36px] md:h-[36px] w-[24px] h-[24px]"
            onClick={handleClose}
          />
          <span className="lg:text-[24px] text-[20px] text-[#F1F1F5] font-semibold">
            {purpose}
          </span>

          <div className="flex md:flex-row flex-col md:mt-[40px] mt-[20px]">
            <div className="md:hidden flex">
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center cursor-pointer lg:w-[160px] lg:h-[160px] md:w-[135px] md:h-[135px] w-[140px] h-[140px] rounded-lg bg-[#252530] border-[1px] border-[#353542] "
              >
                {image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={image}
                      alt="image"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <img
                      src={"/icons/cancel.png"}
                      alt="cancel"
                      color="#1C1C22"
                      className="absolute z-50 top-[5px] right-[5px] cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setImage(null);
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src="/icons/addImage.png"
                    alt="addImageIcon"
                    className="lg:w-[34px] lg:h-[34px] w-[24px] h-[24px]"
                  />
                )}
              </label>
              <input
                type="file"
                name="file"
                id="fileInput"
                className="hidden"
                onChange={(e) => chooseFile(e)}
              />
            </div>
            <div className="flex flex-col lg:mr-[20px] md:mr-[15px]">
              <InputField
                className="md:w-[360px] lg:h-[70px] md:h-[60px] w-full h-[55px] md:mt-0 mt-[10px] mb-0"
                placeholder="상품명 (상품 등록 여부를 확인해 주세요)"
                type="text"
                value={name ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <CategoryDropDown />
            </div>

            <div className="md:flex hidden">
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center cursor-pointer lg:w-[160px] lg:h-[160px] md:w-[135px] md:h-[135px] w-[140px] h-[140px] rounded-lg bg-[#252530] border-[1px] border-[#353542] "
              >
                {image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={image}
                      alt="previewImage"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <img
                      src={"/icons/cancel.png"}
                      alt="cancel"
                      color="#FFFFF"
                      className="absolute w-[28px] h-[28px] z-999 top-[5px] right-[5px] cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setImage(null);
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src="/icons/addImage.png"
                    alt="addImageIcon"
                    className="lg:w-[34px] lg:h-[34px] w-[24px] h-[24px]"
                  />
                )}
              </label>
              <input
                type="file"
                name="file"
                id="fileInput"
                className="hidden"
                onChange={(e) => chooseFile(e)}
              />
            </div>
          </div>

          <Textbox
            maxLength={500}
            placeholder="상품 설명을 입력해 주세요"
            className="w-full lg:h-[160px] md:h-[160px] h-[120px] rounded-lg bg-[#252530] border-[1px] border-[#353542] lg:mt-[20px] md:mt-[15px] mt-[10px]"
          />

          <BaseButton
            className="w-full lg:h-[65px] md:h-[55px] md:mt-[40px] mt-[20px] lg:text-[18px] text-[16px] font-semibold rounded-lg"
            onClick={() => {
              modalType === "addProduct"
                ? handleSubmit({
                    file,
                    setFile,
                    handleClose,
                    setAddProduct,
                    setIsLogin,
                    setMessage,
                    name,
                    description: description ?? "",
                    categoryId,
                    setName,
                    setDescription,
                    setImage,
                    setCategoryId,
                    setClickedValue,
                    image,
                  })
                : editProductFunction({
                    productId: Number(productId),
                    file,
                    name,
                    handleClose,
                    description: description ?? "",
                    categoryId,
                    setName,
                    setDescription,
                    setImage,
                    setCategoryId,
                    setClickedValue,
                    image,
                    setFile,
                    router,
                  });
            }}
          >
            {buttonPlaceholder}
          </BaseButton>
        </div>

        {isLogin && (
          <ProductComparePlusModal
            open={isLogin}
            setOpen={setIsLogin}
            message={message}
            buttonText="로그인"
            onButtonClick={() => {
              router.push("/signin");
            }}
          />
        )}
        {addProduct && (
          <ProductComparePlusModal
            open={addProduct}
            setOpen={setAddProduct}
            message={message}
            buttonText="확인"
            onButtonClick={() => {
              setAddProduct(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AddEditProductModal;
