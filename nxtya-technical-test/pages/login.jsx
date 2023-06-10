import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { userService } from "services";


function Login() {
  const router = useRouter();
  const [ShowPassword, setShowPassword] = useState(true);
  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/");
    }
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;
  console.log("==>", errors);
  function onSubmit({ username, password }) {
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((error) => {
        setError("apiError", { message: error });
      });
  }

  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2 ">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonimg}>
            <div className=" absolute  ">
              {errors.username || errors.password ? (
                <div className="absolute top-20 left-0  ">
                  <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-error text-white  xl:w-[160px]  lg:w-[110px] ">
                      {errors ? (
                        <p>
                          {" "}
                          {errors.username?.message || errors.password?.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>

        {/* form */}
        <div className="right flex flex-col justify-center  shadow-md  ">
          <div className=" flex flex-col items-center justify-center  ">
            <div className="w-full p-6  rounded-md  lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-center text-gray-700">
                Hello Nxtya
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Username</span>
                  </label>
                  <input
                    name="username"
                    type="text"
                    {...register("username")}
                    placeholder="Username"
                    className={
                      errors
                        ? "w-full input input-bordered bg-slate-200 border-red-200 focus:outline-red-200 "
                        : "w-full input input-bordered bg-slate-200"
                    }
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={ShowPassword ? "password" : "text"}
                      placeholder="Enter Password"
                      className={
                        errors
                          ? "w-full input input-bordered bg-slate-200 border-red-200  focus:outline-red-200 "
                          : "w-full input input-bordered bg-slate-200 "
                      }
                      {...register("password")}
                    />
                    {ShowPassword ? (
                      <HiEyeOff
                        onClick={() => setShowPassword(!ShowPassword)}
                        className="absolute top-4 left-550 right-3 bottom-2"
                        size={20}
                      />
                    ) : (
                      <HiEye
                        onClick={() => setShowPassword(!ShowPassword)}
                        className="absolute top-4 left-550 right-3 bottom-2"
                        size={20}
                      />
                    )}
                  </div>
                </div>
                <a
                  href="#"
                  className="text-xs text-gray-600 hover:underline hover:text-blue-600 flex gap-2"
                >
                  <label className="label-text">Remember Me </label>
                  <input type="checkbox" />
                </a>
                <div>
                  <button className="btn btn-block border-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md">
                    Login
                  </button>
                  <p2 className="text-sm my-3 ">
                    you don't have an account ...{" "}
                    <span className="text-red-400 cursor-pointer">
                      Register
                    </span>
                  </p2>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
