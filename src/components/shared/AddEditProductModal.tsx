"use client";
<<<<<<< HEAD
import React, { use, useState } from "react";
import { IoClose } from "react-icons/io5";
=======
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { IoClose } from "react-icons/io5";

>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
import { InputField } from "../input/InputField";
import CategoryDropDown from "./CategoryDropDown";
import { Textbox } from "../input/Textbox";
import BaseButton from "./BaseButton";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import useModalStore from "@/features/home/modals/store/modalStore";
import postProduct from "@/features/home/services/postProduct";
import { getCookie } from "cookies-next";
import postImage from "@/features/home/services/postImage";

interface Props {
  buttonPlaceholder: string;
}

const AddEditProductModal = ({ buttonPlaceholder }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

=======

import useModalStore from "@/features/home/modals/store/modalStore";
import { ProductInfo } from "@/features/home/types/productType";
import { handleSubmit } from "@/lib/utils/addProductFunction";
import editProductFunction from "@/lib/utils/editProductFunction";
import ProductComparePlusModal from "./ProductComparePlusModal";

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

>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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
<<<<<<< HEAD
=======
    setClickedValue("카테고리 선택");
    setImage(null);
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  };

  const chooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const fileURL = URL.createObjectURL(selected);
      setImage(fileURL);
      setFile(selected);
    }
  };

<<<<<<< HEAD
  const handleSubmit = async () => {
    const csrfToken = (await getCookie("csrf-token")) ?? "";

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
        }
        else {
          // 상품 추가 실패했다는 모달
        }
      }
    } else {
      console.error("로그인이 되어 있지 않음: 상품 넣기 실패");
      // 로그인 해달라는 모달 설정
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center bg-[#000000B2]">
=======
  useEffect(() => {
    if (productinfo) {
      setClickedValue(productinfo.category.name);
      setImage(productinfo.image);
      setName(productinfo.name);
      setDescription(productinfo.description);
    }
  }, []);

  return (
    <div className="relative flex w-full h-full justify-center items-center bg-[#000000B2]">
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
      <div className="flex flex-col lg:w-[620px] lg:h-[614px] md:w-[590px] md:h-[569px] w-[335px] h-[578px] bg-[#1C1C22] rounded-2xl lg:p-[20px] p-[20px]">
        <IoClose
          color="#F1F1F5"
          className="ml-auto cursor-pointer lg:w-[40px] lg:h-[40px] md:w-[36px] md:h-[36px] w-[24px] h-[24px]"
          onClick={handleClose}
        />
        <span className="lg:text-[24px] text-[20px] text-[#F1F1F5] font-semibold md:ml-[20px]">
<<<<<<< HEAD
          상품 추가
=======
          {purpose}
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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
<<<<<<< HEAD
=======
              value={name ?? null}
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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
<<<<<<< HEAD
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
=======
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
          className="lg:w-[540px] lg:h-[160px] md:w-[510px] md:h-[160px] w-[295px] h-[120px] rounded-lg bg-[#252530] border-[1px] border-[#353542] lg:mt-[20px] md:mt-[15px] mt-[10px] md:ml-[20px]"
        />

        <BaseButton
          className="lg:w-[540px] lg:h-[65px] md:w-[510px] md:h-[55px] md:mt-[40px] mt-[20px] md:ml-[20px] lg:text-[18px] text-[16px] font-semibold rounded-lg"
<<<<<<< HEAD
          onClick={handleSubmit}
=======
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
                  description,
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
                  description,
                  categoryId,
                  setName,
                  setDescription,
                  setImage,
                  setCategoryId,
                  setClickedValue,
                  image,
                  setFile,
                });
          }}
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
        >
          {buttonPlaceholder}
        </BaseButton>
      </div>
<<<<<<< HEAD
=======

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
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
    </div>
  );
};

export default AddEditProductModal;
