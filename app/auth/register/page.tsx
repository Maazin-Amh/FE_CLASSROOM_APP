"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";

import InputText from "@/components/InputText";
import Select from "@/components/Select";

import { RegisterPayload } from "../interface";
import useAuthModule from "../lib";
import { useRouter } from "next/navigation";

const registerallSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),

  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("tolong isi terlebih dahulu"),

  username: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),

  role: yup
    .string()
    .nullable()
    .default(undefined)
    .required("tolong isi terlebih dahulu"),

  password: yup
    .string()
    .nullable()
    .default("")
    .min(8, "Password minimal 8 karakter")
    .required("tolong isi terlebih dahulu"),

  avatar: yup.string().nullable().default(""),
});

 const userRole = [
  {
    value: "Guru",
    label: "guru",
  },
  {
    value: "Siswa",
    label: "siswa",
  },
];

const Register = () => {
  const { useRegister } = useAuthModule();
  const { mutate, isLoading } = useRegister();
  const route = useRouter();
  const formik = useFormik<RegisterPayload>({
    initialValues: registerallSchema.getDefault(),

    validationSchema: registerallSchema,

    enableReinitialize: true,

    onSubmit: (payload) => {
      mutate(payload);
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    formik;

  return (
    <div className="block md:mt-0 mt-10 md:flex md:min-h-screen md:w-full">
      <div className="flex flex-col md:w-1/2 justify-center px-10">
        <span>
          <h1 className="text-6xl font-bold mb-4">Buat Akun</h1>
          <p className="mb-4 font-normal">
            Buat Akun Secara Gratis Dengan Email
          </p>
        </span>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-5">
              <InputText
                value={values.email}
                placeholder="example@gmail.com"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={getIn(touched, "email") && getIn(errors, "email")}
                messageError={
                  getIn(touched, "email") ? getIn(errors, "email") : ""
                }
                className="py-3 px-4 block w-full border border-chocolate"
              />
            </div>

            <div className="mb-5">
              <InputText
                value={values.username}
                placeholder="your username"
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
                className="py-3 px-4 block w-full border border-chocolate"
              />
            </div>

            <div className="mb-5">
              <InputText
                value={values.password}
                placeholder="Password"
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
                className="py-3 px-4 block w-full border border-chocolate"
              />
            </div>
            <div className="mb-5">
              <InputText
                value={values.nama}
                placeholder="Nama"
                id="nama"
                name="nama"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={getIn(touched, "nama") && getIn(errors, "nama")}
                messageError={
                  getIn(touched, "nama") ? getIn(errors, "nama") : ""
                }
                className="py-3 px-4 block w-full border border-chocolate"
              />
            </div>

            <div className="mb-5">
              <Select
                value={values.role}
                onBlur={handleBlur}
                id="role"
                name="role"
                options={userRole}
                isError={getIn(touched, "role") && getIn(errors, "role")}
                messageError={
                  getIn(touched, "role") ? getIn(errors, "role") : ""
                }
                onChange={handleChange}
              />
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
                disabled:opacity-50
                disabled:pointer-events-none
              "
            >
              {isLoading ? "sedang buat akun..." : "Buat Akun"}
            </button>
            <div className="text-center">
              <p className="mt-2 text-sm text-doff">
                Sudah Punya Akun ?
                <button
                  onClick={() => route.push("/login")}
                  className="text-doff pl-1 decoration-2 hover:underline font-medium "
                >
                  Masuk
                </button>
              </p>
            </div>
          </Form>
        </FormikProvider>
      </div>
      <div className="hidden md:block w-1/2 min-h-screen  bg-gradient-to-bl from-orangebold to-chocolate"></div>
    </div>
  );
};

export default Register;
