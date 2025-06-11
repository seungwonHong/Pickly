"use client";

import { useUserStore } from "../libs/useUserStore";

export default function useGetUser() {
  const user = useUserStore((state) => state.userData);
  const compareList = useUserStore((state) => state.compareList);
  const addToCompare = useUserStore((state) => state.addToCompare);
  const removeFromCompare = useUserStore((state) => state.removeFromCompare);
  const clearCompare = useUserStore((state) => state.clearCompare);
  const selectedCompareProductId = useUserStore(
    (state) => state.selectedCompareProductId
  );
  const setSelectedCompareProductId = useUserStore(
    (state) => state.setSelectedCompareProductId
  );
  const baseCompareProductId = useUserStore(
    (state) => state.baseCompareProductId
  );
  const setBaseCompareProductId = useUserStore(
    (state) => state.setBaseCompareProductId
  );

  const groupedCompareList = useUserStore((state) => state.groupedCompareList);

  const setGroupedCompareList = useUserStore(
    (state) => state.setGroupedCompareList
  );
  const selectCompareProductId = useUserStore(
    (state) => state.selectedCompareProductId
  );
  return {
    user,
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    selectedCompareProductId,
    setSelectedCompareProductId,
    baseCompareProductId,
    setBaseCompareProductId,
    groupedCompareList,
    setGroupedCompareList,
    selectCompareProductId,
  };
}
