import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/input";
import { NewUser, User } from "../types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "../hook/useMutation";
import { useEffect } from "react";
import { useUserContext } from "../contexts/user-context";

export const Register = () => {
  const { execute, data } = useMutation<User>();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewUser>();
  const { setUser } = useUserContext();

  const onGoToLogin = () => {
    navigate("/login");
  };

  const onSubmit: SubmitHandler<NewUser> = (data: NewUser) => {
    execute({ url: `user/signup`, body: data, method: "post" });
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
          Register
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("firstName", {
              required: "firstName is Required",
            })}
            error={errors.firstName}
            label="FirstName"
            name="firstName"
            placeholder="firstName"
          />
          <Input
            register={register("lastName", {
              required: "lastName is Required",
            })}
            error={errors.lastName}
            label="LastName"
            name="lastName"
            placeholder="lastName"
          />
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
            <p>Do You have any Account?</p>
            <button
              type="button"
              className="btn btn-link"
              onClick={onGoToLogin}
            >
              Login
            </button>
          </div>
          <div>
            <input
              type="submit"
              value="Register"
              className="btn btn-block btn-primary text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
