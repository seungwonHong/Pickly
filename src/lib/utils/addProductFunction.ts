import toast from "react-hot-toast";
import postImage from "@/features/home/services/postImage";
import postProduct from "@/features/home/services/postProduct";

interface Props {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleClose: () => void;
  setAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  name: string | null;
  description: string | null;
  categoryId: number | null;
  setName: (name: string | null) => void;
  setDescription: (desc: string | undefined) => void;
  setImage: (image: string | null) => void;
  setCategoryId: (id: number | null) => void;
  setClickedValue: (val: string) => void;
  image: string | null;
}

export const handleSubmit = async ({
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
}: Props) => {
  // 모달에 내용을 한개라도 안 썼을 경우 경고 모달 띄우기
  if (
    !name ||
    !description ||
    description.length < 10 ||
    description.length > 500 ||
    !categoryId ||
    !image
  ) {
    toast.error(
      "상품명, 설명(10~500자), 카테고리, 이미지를 모두 입력해주세요."
    );
    // 위 조건에 맞춰야 상품 post가 가능해지는군요... 일단 스웨거 보고 이런식으로 에러 메세지 임시로 했습니다. 고치셔도 돼요.
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

    if (accessToken) {
      console.log("accessToken:", accessToken);
      const responseFile = await postImage({
        file,
        accessToken: accessToken.value,
      });

      if (responseFile) {
        const response = await postProduct({
          categoryId,
          name,
          description,
          image: responseFile.url,
          accessToken: accessToken.value,
        });

        if (response?.status === 200 || response?.status === 201) {
          toast.success("상품이 등록되었습니다.");
          console.log("포스트 등록됨");
          setName(null);
          setCategoryId(null);
          setClickedValue("카테고리 선택");
          setDescription(undefined);
          setImage(null);
          setFile(null);

          handleClose();
        } else {
          setAddProduct(true);
          setMessage("상품 등록에 실패하였습니다.");
        }
      }
    }
  } else {
    console.error("로그인이 되어 있지 않음: 상품 넣기 실패");
    // 로그인 해달라는 모달 설정
    setIsLogin(true);
    setMessage("로그인이 필요합니다.");
  }
};
