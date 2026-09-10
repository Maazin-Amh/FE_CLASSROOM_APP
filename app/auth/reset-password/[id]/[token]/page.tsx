"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";

import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../../../lib";
import Link from "next/link";
import { ResetPasswordPayload } from "@/app/auth/interface";

const ResetPwSchema = yup.object().shape({
  new_password: yup
    .string()
    .nullable()
    .default("")
    .required("Tolong isi terlebih dahulu")
    .min(8, "Minimal 8 karakter"),
});

const LupaPw = ({ params }: { params: { id: string; token: string } }) => {
  const { id, token } = params;

  const { useResetPassword } = useAuthModule();
  const { mutate, isLoading } = useResetPassword(id, token);

  const formik = useFormik<ResetPasswordPayload>({
    initialValues: ResetPwSchema.getDefault(),
    validationSchema: ResetPwSchema,
    enableReinitialize: true,

    onSubmit: (payload) => {
      mutate(payload);
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    formik;

  return (
    <div className="block md:mt-0 mt-10 md:flex md:min-h-screen md:w-full">
      <div className="flex w-full md:w-1/2 flex-col justify-center px-10">
        <div className="mb-6">
          <h1 className="mb-4 text-6xl font-bold">Reset Password</h1>

          <p className="font-normal text-doff">
            Masukkan password baru untuk akun anda.
          </p>
        </div>

        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="grid gap-y-5">
              <div>
                <InputText
                  value={values.new_password}
                  placeholder="Masukkan password baru"
                  id="new_password"
                  name="new_password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={
                    getIn(touched, "new_password") &&
                    getIn(errors, "new_password")
                  }
                  messageError={
                    getIn(touched, "new_password")
                      ? getIn(errors, "new_password")
                      : ""
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
                title="Reset Password"
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
                 {isLoading ? "tunggu sebenter..." : "Reset Password"}
              </button>

              <Link
                href="/login"
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
                "
              >
                Kembali
              </Link>
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
