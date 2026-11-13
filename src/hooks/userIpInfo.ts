import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchIpInfo } from "../api/ipApi";
import { useSearchStore } from "../store/useSerachStore";

export function useIpInfo() {
  const query = useSearchStore((state) => state.query);

  return useQuery({
    queryKey: ["ip-info", query],
    queryFn: () => fetchIpInfo(query),
    placeholderData: keepPreviousData,
  });
}