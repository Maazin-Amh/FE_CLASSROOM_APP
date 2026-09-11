"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";

import InputText from "@/components/InputText";

import { useRouter } from "next/navigation";
import { LoginPayload } from "../interface";
import useAuthModule from "../lib";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),

  role: yup.number().nullable().default(undefined),

  password: yup
    .string()
    .nullable()
    .default("")
    .min(8, "Password minimal 8 karakter")
    .required("tolong isi terlebih dahulu"),
});

const Login = () => {
  const route = useRouter();

  const { useLogin } = useAuthModule();
  const { mutate, isLoading } = useLogin();

  const formik = useFormik<LoginPayload>({
    initialValues: registerSchema.getDefault(),

    validationSchema: registerSchema,

    enableReinitialize: true,

    onSubmit: (payload) => {
      mutate(payload);
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    formik;

  return (
    <div className="block md:mt-0 mt-10 md:flex md:min-h-screen md:w-full">
      <div className="flex md:w-1/2 flex-col justify-center px-10">
        <div className="mb-6">
          <h1 className="text-6xl font-bold mb-4">Masuk</h1>

          <p className="font-normal text-doff">
            Masuk ke akun kamu menggunakan username dan password.
          </p>
        </div>

        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="grid gap-y-5">
              <div>
                <InputText
                  value={values.username}
                  placeholder="username"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={
                    getIn(touched, "username") && getIn(errors, "username")
                  }
                  messageError={
                    getIn(touched, "username") ? getIn(errors, "username") : ""
                  }
                  className="
                py-3 px-4 block w-full border border-chocolate
                  "
                />
              </div>

              <div>
                <InputText
                  value={values.password}
                  placeholder="*******"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={
                    getIn(touched, "password") && getIn(errors, "password")
                  }
                  messageError={
                    getIn(touched, "password") ? getIn(errors, "password") : ""
                  }
                  className="
                 py-3 px-4 block w-full border border-chocolate
                  "
                />

                <button
                  type="button"
                  onClick={() => route.push("/auth/forgot-password")}
                  className="
                      text-sm
                      text-chocolate
                      decoration-2
                      text-right
                      hover:underline
                      font-medium
                    "
                >
                  Lupa password?
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full
                  py-3
                  px-4
                  inline-flex
                  justify-center
                  items-center
                  text-sm
                  font-medium
                  bg-chocolate
                  text-littlewhite
                  hover:opacity-90
                  disabled:opacity-50
                  disabled:pointer-events-none
                "
              >
                {isLoading ? "Sedang masuk..." : "Masuk"}
              </button>
              <div className="text-center">
                <p className="text-sm text-doff">
                  Belum punya akun?
                  <button
                    type="button"
                    onClick={() => route.push("/register")}
                    className="
                      text-chocolate
                      pl-1
                      decoration-2
                      hover:underline
                      font-medium
                    "
                  >
                    Buat akun
                  </button>
                </p>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </div>
      <div className=" hidden md:block w-1/2 min-h-screen bg-gradient-to-bl from-orangebold to-chocolate" />
    </div>
  );
};

export default Login;
