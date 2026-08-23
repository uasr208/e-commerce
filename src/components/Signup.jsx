import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../zustand/useAuth";

const schema = Yup.object({
  fullname: Yup.string().required("Fullname is required"),
  email: Yup.string()
    .required("Email field is required")
    .email("please enter a valid email"),
  password: Yup.string()
    .required("Password filed is required")
    .min(6, "Minimum 6 characters required")
    .matches(/[A-Z]/, "Atleast one uppercase required")
    .matches(/[a-z]/, "Atleast one lowercase required")
    .matches(/[0-9]/, "Atleast one number required")
    .matches(/[^A-Za-z0-9]/, "Atleast one special character required"),
});

const Signup = () => {
  const { signup } = useAuth();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: signup,
  });

  return (
    <div className="overflow-hidden bg-[#F8F7F4] h-screen flex items-center justify-center animate__animated animate__fadeIn animate__slower">
      <div className="bg-white w-7/12 shadow-lg rounded-lg grid grid-cols-2 animate__animated animate__slideInUp animate__faster">
        <img
          src="/images/admin-login.avif"
          alt="admin login image"
          className="rounded-l-lg"
        />
        <div className="flex flex-col justify-center px-10 gap-6">
          <h1 className="text-2xl font-semibold text-gray-600">
            Create an account
          </h1>
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 font-medium">Fullname</label>
              <input
                onChange={formik.handleChange}
                name="fullname"
                placeholder="Enter your full Name here"
                className="border border-gray-200 rounded p-2"
              />
              {formik.errors.fullname && (
                <small className="text-rose-500 font-semibold">
                  {formik.errors.fullname}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 font-medium">Email</label>
              <input
                onChange={formik.handleChange}
                name="email"
                type="email"
                placeholder="example@mail.com"
                className="border border-gray-200 rounded p-2"
              />
              {formik.errors.email && (
                <small className="text-rose-500 font-semibold">
                  {formik.errors.email}
                </small>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-zinc-700 font-medium">Password</label>
              <input
                onChange={formik.handleChange}
                name="password"
                type="password"
                placeholder="***********"
                className="border border-gray-200 rounded p-2"
              />
              {formik.errors.password && (
                <small className="text-rose-500 font-semibold">
                  {formik.errors.password}
                </small>
              )}
            </div>
            <button className="p-2.5 rounded bg-[#27BE8C] text-white font-medium hover:bg-green-500 active:scale-80 duration-300">
              Sign up
            </button>
          </form>
          <div className="flex flex-col gap-2">
            <Link
              to="#"
              className="text-[#27BE8C]  font-medium hover:underline"
            >
              Forgot password
            </Link>
            <Link
              to="/login"
              className="text-[#27BE8C]  font-medium hover:underline"
            >
              Signin now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
