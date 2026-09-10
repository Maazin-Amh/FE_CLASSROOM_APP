"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";

import { LupaPasswordPayload } from "../interface";
import InputText from "@/components/InputText";
import useAuthModule from "../lib";
import { useRouter } from "next/navigation";

const lupaPwSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("tolong isi terlebih dahulu"),
});

const LupaPw = () => {
  const route = useRouter();

  const { useLupaPassword } = useAuthModule();
  const { mutate, isLoading } = useLupaPassword();

  const formik = useFormik<LupaPasswordPayload>({
    initialValues: lupaPwSchema.getDefault(),

    validationSchema: lupaPwSchema,

    enableReinitialize: true,

    onSubmit: (payload) => {
      mutate(payload);
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    formik;

  return (
    <div className="block md:mt-0 mt-10 md:flex md:min-h-screen md:w-full">
      <div className="flex w-1/2 flex-col justify-center px-10">
        <div className="mb-6">
          <h1 className="text-6xl font-bold mb-4">Lupa Password</h1>

          <p className="font-normal text-doff">
            Masukkan email anda untuk mendapatkan link reset password.
          </p>
        </div>

        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="grid gap-y-5">
              <div>
                <InputText
                  value={values.email}
                  placeholder="example@email.com"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(touched, "email") && getIn(errors, "email")}
                  messageError={
                    getIn(touched, "email") ? getIn(errors, "email") : ""
                  }
                  className="
                    py-3 px-4
                    block w-full
                    border
                    border-chocolate
                    text-sm
                    focus:border-chocolate
                    focus:ring-chocolate
                    disabled:opacity-50
                    disabled:pointer-events-none
                  "
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
                  hover:opacity-90
                  disabled:opacity-50
                  disabled:pointer-events-none
                "
              >
                {isLoading ? "Mengirim..." : "Kirim Email"}
              </button>
              <button
                type="button"
                onClick={() => route.push("/login")}
                className="
                  w-full
                  py-3
                  px-4
                  inline-flex
                  justify-center
                  items-center
                  text-sm
                  font-medium
                  border
                  border-chocolate
                  text-chocolate
                  hover:bg-chocolate
                  hover:text-littlewhite
                  transition
                "
              >
                Kembali
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
      <div
        className="
          hidden
          md:block
          w-1/2
          min-h-screen
          bg-gradient-to-bl
          from-orangebold
          to-chocolate
        "
      />
    </div>
  );
};

export default LupaPw;
