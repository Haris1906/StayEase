import { useQuery } from "@tanstack/react-query";
import getRatings from "../../services/apiRatings";

export function useRatings() {
  const {
    isLoading,
    data: ratings,
    error,
  } = useQuery({
    queryKey: ["ratings"],
    queryFn: getRatings,
  });

  return { isLoading, error, ratings };
}
