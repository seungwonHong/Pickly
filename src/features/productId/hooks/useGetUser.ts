import { useUserStore } from "@/features/productId/libs/useUserStore";

export default function useGetUser() {
  const user = useUserStore((state) => state.userData);
  return { user };
}
