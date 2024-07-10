import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRating } from "../../services/apiRatings";
import toast from "react-hot-toast";

export function useCreateRatings() {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: createRating,
    onSuccess: () => {
      toast.success("Rating created successfully");
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createRating: mutate, isLoading, error };
}
