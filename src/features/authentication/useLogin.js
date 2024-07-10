import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate(`/${user.user.user_metadata.role}`, {
        replace: true,
      });
      return;
    },
    onError: (error) => {
      console.error(error);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
