"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { InputField } from "../input/InputField";
import CategoryDropDown from "./CategoryDropDown";
import { Textbox } from "../input/Textbox";
import BaseButton from "./BaseButton";
import { useRouter } from "next/navigation";
import useModalStore from "@/features/home/modals/store/modalStore";
import postProduct from "@/features/home/services/postProduct";
import { getCookie } from "cookies-next";
import postImage from "@/features/home/services/postImage";
import ProductComparePlusModal from "@/features/productId/components/modal/ProductCompareModal/ProductComparePlusModal";

interface Props {
  buttonPlaceholder: string;
}

const AddEditProductModal = ({ buttonPlaceholder }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [addProduct, setAddProduct] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  // 모달에 데이터 안 넣었을 경우
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

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
  } = useModalStore();

  const handleClose = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("modal");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const chooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const fileURL = URL.createObjectURL(selected);
      setImage(fileURL);
      setFile(selected);
    }
  };

  const handleSubmit = async () => {
    // 모달에 내용을 한개라도 안 썼을 경우 경고 모달 띄우기
    if (!name || !categoryId || !description || !file) {
      setIsMessage(true);
      return;
    }
    const csrfToken =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrf-token="))
        ?.split("=")[1] ?? "";

    const res = await fetch("/api/cookie", {
      method: "GET",
      credentials: "include",
      headers: {
        "x-csrf-token": csrfToken,
      },
    });

    if (res.status === 200) {
      const { accessToken } = await res.json();

      const responseFile = await postImage({
        file,
        accessToken,
      });

      if (responseFile) {
        const response = await postProduct({
          categoryId,
          name,
          description,
          image: responseFile.url,
          accessToken,
        });

        if (response?.status === 200) {
          setName(null);
          setCategoryId(null);
          setClickedValue("카테고리 선택");
          setDescription(null);
          setImage(null);
          setFile(null);

          handleClose();
        } else {
          // 상품 추가 실패했다는 모달
          setAddProduct(true);
          setMessage("상품 등록에 실패하였습니다. 다시 시도해주세요.");
        }
      }
    } else {
      console.error("로그인이 되어 있지 않음: 상품 넣기 실패");
      // 로그인 해달라는 모달 설정
      setIsLogin(true);
      setMessage("로그인이 필요합니다.");
    }
  };

  return (
    <div className="relative flex w-full h-full justify-center items-center bg-[#000000B2]">
      <div className="flex flex-col lg:w-[620px] lg:h-[614px] md:w-[590px] md:h-[569px] w-[335px] h-[578px] bg-[#1C1C22] rounded-2xl lg:p-[20px] p-[20px]">
        <IoClose
          color="#F1F1F5"
          className="ml-auto cursor-pointer lg:w-[40px] lg:h-[40px] md:w-[36px] md:h-[36px] w-[24px] h-[24px]"
          onClick={handleClose}
        />
        <span className="lg:text-[24px] text-[20px] text-[#F1F1F5] font-semibold md:ml-[20px]">
          상품 추가
        </span>

        <div className="flex md:flex-row flex-col md:mt-[40px] mt-[20px] md:ml-[20px]">
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
                  <IoClose
                    size={24}
                    color="#1C1C22"
                    className="absolute z-999 top-[5px] right-[5px] cursor-pointer"
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
              className="md:w-[360px] lg:h-[70px] md:h-[60px] w-[295px] h-[55px] md:mt-0 mt-[10px] mb-0"
              placeholder="상품명 (상품 등록 여부를 확인해 주세요)"
              type="text"
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
                  <IoClose
                    size={24}
                    color="#1C1C22"
                    className="absolute z-999 top-[5px] right-[5px] cursor-pointer"
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
          className="lg:w-[540px] lg:h-[160px] md:w-[510px] md:h-[160px] w-[295px] h-[120px] rounded-lg bg-[#252530] border-[1px] border-[#353542] lg:mt-[20px] md:mt-[15px] mt-[10px] md:ml-[20px]"
        />

        <BaseButton
          className="lg:w-[540px] lg:h-[65px] md:w-[510px] md:h-[55px] md:mt-[40px] mt-[20px] md:ml-[20px] lg:text-[18px] text-[16px] font-semibold rounded-lg"
          onClick={handleSubmit}
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
      {isMessage && (
        <ProductComparePlusModal
          open={isMessage}
          setOpen={setIsMessage}
          buttonText="확인"
          message="모든 항목을 채워주세요"
          onButtonClick={() => setIsMessage(false)}
        />
      )}
    </div>
  );
};

export default AddEditProductModal;
