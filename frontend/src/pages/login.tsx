import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/input";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "../hook/useMutation";
import { useUserContext } from "../contexts/user-context";
import { useEffect } from "react";

export const Login = () => {
  const { execute, data } = useMutation<User>();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<User>();
  const { setUser } = useUserContext();

  const onGoToRegister = () => {
    navigate("/register");
  };

  const onSubmit: SubmitHandler<User> = (data: User) => {
    execute({ url: `user/signin`, body: data, method: "post" });
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-lg border-t-4 border-gray-600 shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Login To Chat
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("email", {
              required: "Email is Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email Is Not Valid",
              },
            })}
            error={errors.email}
            label="Email"
            name="email"
            placeholder="Email"
          />

          <Input
            register={register("password", {
              required: "Password is Required",
              minLength: {
                value: 6,
                message: "Password Should have at least 6 characters",
              },
            })}
            error={errors.password}
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
          />
          <div className="flex items-center">
            <p>Do Not Have An Account?</p>
            <button
              type="button"
              className="btn btn-link"
              onClick={onGoToRegister}
            >
              Register
            </button>
          </div>
          <div>
            <input
              type="submit"
              value="Login"
              className="btn btn-block btn-primary text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
