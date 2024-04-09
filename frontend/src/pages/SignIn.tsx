import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ type: "SUCCESS", message: "sign in success" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
      console.log("sign in successfully");
    },
    onError: (error: Error) => {
      console.log(error);
      showToast({ type: "ERROR", message: error.message });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registred ?{" "}
          <Link to="/register" className="underline font-bold text-primary">
            Create an account here
          </Link>
        </span>
        <button className="bg-primary text-white py-2 px-7 font-bold rounded-full hover:bg-secondary">
          Login
        </button>
      </span>
    </form>
  );
}
