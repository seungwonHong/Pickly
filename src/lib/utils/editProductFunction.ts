import toast from "react-hot-toast";
import postImage from "@/features/home/services/postImage";
import { productService } from "@/features/productId/api";
import type { useRouter } from "next/navigation";

interface EditProps {
  handleClose: () => void;

  productId: number;
  file?: File | null;
  name: string | null;
  description: string | null;
  categoryId?: number | null;
  setName: (name: string | null) => void;
  setDescription: (desc: string | undefined) => void;
  setImage: (image: string | null) => void;
  setCategoryId: (id: number | null) => void;
  setClickedValue: (val: string) => void;
  setFile?: React.Dispatch<React.SetStateAction<File | null>>;
  router: ReturnType<typeof useRouter>;
  image: string | null;
}

const editProductFunction = async ({
  handleClose,

  productId,
  file,
  name,
  description,
  categoryId,
  setName,
  setDescription,
  setImage,
  setCategoryId,
  setClickedValue,
  setFile,
  router,
  image,
}: EditProps) => {
  if (
    !name?.trim().length ||
    !description?.trim() ||
    description.length < 10 ||
    description.length > 500 ||
    !categoryId ||
    !image
  ) {
    toast.error(
      "상품명, 설명(10~500자), 카테고리, 이미지를 모두 입력해주세요."
    );
    return;
  }

  // accessToken 먼저 가져오기
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

  if (res.status !== 200) {
    toast.error("로그인이 필요합니다.");
    return;
  }

  const { accessToken } = await res.json();
  if (!accessToken) {
    toast.error("로그인이 필요합니다.");
    return;
  }

  // 이미지가 새로 업로드된 경우
  let imageUrl = image;

  if (file) {
    const responseFile = await postImage({
      file,
      accessToken: accessToken.value,
    });
    if (responseFile) {
      imageUrl = responseFile.url;
    }
  } else if (image?.startsWith("blob:")) {
    imageUrl = "";
  }

  const trimmedName = name?.trim() || "";

  if (!trimmedName) {
    toast.error("상품명을 정확히 입력해주세요.");
    return;
  }
  // 실제 상품 수정 API 호출
  const response = await productService.patchProductsId({
    productId,
    name: trimmedName,
    description,
    categoryId: categoryId ?? 0,
    image: imageUrl || "",
    accessToken: accessToken.value,
  });

  if (response?.status === 200 || response?.status === 201) {
    toast.success("상품이 수정되었습니다.");
    setName(null);
    setCategoryId?.(null);
    setClickedValue("카테고리 선택");
    setDescription(undefined);
    setImage(null);
    setFile?.(null);

    handleClose();
    router.refresh();
  } else {
    console.error("상품 수정 실패:", response);
    toast.error("상품 수정에 실패하였습니다.");
  }
};

export default editProductFunction;
