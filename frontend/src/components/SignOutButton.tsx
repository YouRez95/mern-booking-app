import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";

export default function SignOutButton() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "SUCCESS" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="text-primary px-3 font-bold bg-white hover:bg-gray-100"
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
}
