/* eslint-disable @next/next/no-img-element */
"use client";
import { signOut, useSession } from "next-auth/react";
import useGuruModule from "./lib";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPlus,
  faPen,
  faTrash,
  faUser,
  faGear,
  faArrowRightFromBracket,
  faCopy,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useConfirmDelete } from "@/hook/useConfirmDelete";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import { ClassCreatePayload } from "./interface";
import useAuthModule from "../auth/lib";
import Image from "next/image";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Loading from "@/components/loading";

const CreateClassSchema = yup.object().shape({
  nama_kelas: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),
  subject: yup.string().nullable().default(""),
});

const ProfileSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")

    .required("tolong isi terlebih dahulu"),
  avatar: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),
});

const DEFAULT_AVATAR =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

const GuruPage = () => {
  const { useClassList, useDelete, useCreateClass } = useGuruModule();
  const { useProfile, useUpdateProfile } = useAuthModule();
  const { data, isFetching } = useClassList();
  const { mutate: profilemutate, isLoading: isload } = useUpdateProfile();
  const { data: profile } = useProfile();
  const { mutate: mutases, isLoading: isDeleting } = useDelete();
  const { mutate: mutatescreate, isLoading: isLoading } = useCreateClass();
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      mutases(id);
    },
  });
  const formik = useFormik<ClassCreatePayload>({
    initialValues: CreateClassSchema.getDefault(),
    validationSchema: CreateClassSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutatescreate(payload, {
        onSuccess: () => {
          closeCreateModal();
        },
      });
    },
  });

  const profileformik = useFormik<any>({
    initialValues: {
      nama: profile?.data.nama,
      avatar: profile?.data.avatar,
      file: undefined,
      id: profile?.data.id,
    },
    validationSchema: ProfileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      profilemutate(values, {
        onSuccess: () => {
          closeProfileModal();
        },
      });
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, resetForm } =
    formik;
  const {
    handleChange: handleChangeprofile,
    handleSubmit: handleSubmitprofile,
    handleBlur: blurprofile,
    values: valueprofile,
    errors: erorprofile,
    setFieldValue,
  } = profileformik;
  const openCreateModal = () => {
    const modal = document.getElementById("hs-vertically-centered-modal");

    if (modal) {
      modal.classList.remove("hidden");
    }
  };

  const closeCreateModal = () => {
    const modal = document.getElementById("hs-vertically-centered-modal");

    if (modal) {
      modal.classList.add("hidden");
    }
    resetForm();
  };

  const openProfileModal = () => {
    const modal = document.getElementById("hs-vertically-centered-modal-1");

    if (modal) {
      modal.classList.remove("hidden");
    }
  };

  const closeProfileModal = () => {
    const modal = document.getElementById("hs-vertically-centered-modal-1");

    if (modal) {
      modal.classList.add("hidden");
    }
  };

  return (
    <>
      <header className="bg-white border-b h-16 flex items-center justify-between  px-3 z-50  mb-10 border-slate-4000 sticky">
        <div className="item-center flex items-center">
          <Link href={""}>
            <p className="text-xl text-[#5f6368] font-normal">EduCommunity</p>
          </Link>
        </div>
        <button
          type="button"
          onClick={() => {
            signOut({
              redirect: false,
            }).then(() => {
              router.push("/login");
            });
          }}
          className="flex items-center gap-3 px-3  py-2.5 text-sm text-white bg-red-500 "
        >
          Keluar dari akun
        </button>
      </header>

      <main className=" max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <section className=" max-w-7xl mx-auto px-4 sm:px-6 pt-5">
          <div
            className="relative w-full h-[220px] sm:h-[270px] md:h-[310px] bg-cover bg-center"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/SDHtvDjJ/edubg.png')`,
            }}
          >
            <div className="absolute inset-0 bg-black/5 " />

            <button
              type="button"
              onClick={openProfileModal}
              className="absolute top-4 right-4 z-10  flex items-center gap-2 px-4  py-2.5 text-xl font-medium text-littlewhite"
            >
              <FontAwesomeIcon icon={faGear} className="w-10" />
            </button>
            <div>
              <img
                src={profile?.data?.avatar || DEFAULT_AVATAR}
                alt="Profile"
                className=" absolute left-1/2 bottom-0 object-cover -translate-x-1/2 translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white p-1
"
              />
            </div>
          </div>
          <div className="text-center pt-16 pb-7">
            <h2 className=" text-2xl sm:text-3xl font-semibold text-gray-800 ">
              {profile?.data?.nama || "Nama Guru"}
            </h2>

            <p className="mt-1 text-sm text-gray-500 ">
              {session?.user?.email}
            </p>

            <p className="mt-2 text-sm text-gray-400 ">Guru • EduCommunity</p>
          </div>

          <div className="border-b border-gray-200">
            <div className=" flex items-center justify-center gap-2 sm:gap-8">
              <button
                type="button"
                className=" relative px-5  py-4 text-sm font-medium text-gray-900"
              >
                Kelas Saya
                <span className=" absolute left-0 right-0 bottom-0 h-0.5 bg-gray-900" />
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/guru/personal-info");
                }}
                className="  px-5  py-4 text-sm text-gray-500 hover:text-gray-900 transition
              "
              >
                Informasi Pribadi
              </button>
            </div>
          </div>
        </section>
        <div className="flex flex-col mt-6 sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 ">
          <div>
            <h2 className=" text-xl  sm:text-2xl font-semibold text-doff">
              Kelas Saya
            </h2>

            <p className="text-sm text-orangebold/70 mt-1 ">
              {data?.data.length} kelas yang saya buat
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="bg-doff flex justify-between items-center p-4 text-littlewhite w-36 h-12 "
          >
            <FontAwesomeIcon icon={faPlus} />
            Buat Kelas
          </button>
        </div>
        {isFetching && (
          <div className=" flex justify-center items-center py-20 ">
            <div className=" w-8  h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin " />
          </div>
        )}

        {!isFetching && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.data.map((itemclass) => (
              <section key={itemclass.id} className="relative group">
                <div className=" border border-gray-200 overflow-hidden  cursor-pointer transition-all">
                  <div
                    onClick={() => {
                      router.push(`/guru/detail/${itemclass.id}`);
                    }}
                    className="relative h-32 w-96"
                  >
                    <div className="absolute left-4 right-12 top-4 text-chocolate">
                      <h3 className="text-lg font-bold truncate">
                        {itemclass.nama_kelas}
                      </h3>

                      <p className="mt-1 text-sm font-normal">
                        {itemclass.subject}
                      </p>

                      <div className="mt-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faUser} className="text-sm" />

                        <span className="text-xs font-medium truncate">
                          {profile?.data?.nama}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t border-orangebold/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Kode Kelas</p>

                        <p className=" mt-1 text-sm font-semibold text-gray-700 ">
                          {itemclass.code}
                        </p>
                      </div>
                      <span>
                        <FontAwesomeIcon
                          onClick={() => {
                            navigator.clipboard.writeText(itemclass.code || "");
                          }}
                          icon={faCopy}
                          className="text-sm"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <Menu>
                  <MenuButton
                    type="button"
                    className=" absolute top-3 right-3 w-9 h-9 flex items-center  justify-center text-chocolate hover:bg-orangebold/80 hover:text-white transition-all focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </MenuButton>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-in"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <MenuItems
                      anchor="bottom end"
                      className="
                        w-36 bg-white border border-gray-200 shadow-lg p-1 focus:outline-none z-[100]
                      "
                    >
                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            router.push(`/guru/update/${itemclass.id}`);
                          }}
                          className=" w-full flex items-center gap-3 px-3 py-2 text-sm text-chocolate hover:bg-gray-100 "
                        >
                          <FontAwesomeIcon icon={faPen} className="w-3" />
                          Edit
                        </button>
                      </MenuItem>

                      <MenuItem>
                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(itemclass.id || 0);
                          }}
                          disabled={isDeleting}
                          className=" w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-3" />
                          Hapus
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* layout modal ini sya khususkan buat kelas */}
      <div
        id="hs-vertically-centered-modal"
        className="hs-overlay hidden fixed inset-0 z-[80] overflow-y-auto bg-black/40 "
      >
        <div className=" min-h-full flex items-center justify-center p-4 ">
          <div className="w-full max-w-lg bg-littlewhite shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 ">
              <h3 className="  font-semibold text-gray-800 ">Buat Kelas</h3>

              <button
                type="button"
                onClick={closeCreateModal}
                className=" w-8  h-8 flex items-center  justify-center text-chocolate hover:text-red-500 "
              >
                <FontAwesomeIcon icon={faX} className="w-2" />
              </button>
            </div>

            <div className="p-5">
              <FormikProvider value={formik}>
                <Form className="space-y-5" onSubmit={handleSubmit}>
                  <section>
                    <Label htmlFor="nama_kelas" title="Nama Kelas" />

                    <InputText
                      value={values.nama_kelas}
                      placeholder="Nama Kelas"
                      id="nama_kelas"
                      name="nama_kelas"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isError={getIn(errors, "nama_kelas")}
                      messageError={getIn(errors, "nama_kelas")}
                    />
                  </section>

                  <section>
                    <Label htmlFor="subject" title="Subject" />

                    <InputText
                      value={values.subject}
                      placeholder="Deskripsi"
                      id="subject"
                      name="subject"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isError={getIn(errors, "subject")}
                      messageError={getIn(errors, "subject")}
                    />
                  </section>

                  <div className=" flex justify-end gap-3  pt-4  border-t border-gray-20  ">
                    <button
                      type="button"
                      onClick={closeCreateModal}
                      className="border-doff bg-white border text-doff w-36 h-12 "
                    >
                      Batal
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-doff text-littlewhite w-36 h-12 "
                    >
                      {isLoading ? "Membuat..." : "Buat Kelas"}
                    </button>
                  </div>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>

      {/* Layout ini sya buat khsusus update Profile */}
      <div
        id="hs-vertically-centered-modal-1"
        className=" hs-overlay hidden fixed inset-0  z-[80] overflow-y-auto bg-black/40 "
      >
        <div className="min-h-full flex  items-center justify-center p-4 ">
          <div className="w-full max-w-lg bg-littlewhite">
            <div className=" flex items-center justify-between   px-5 py-4 border-b border-gray-200 ">
              <h3 className=" font-semibold text-gray-800 ">Edit Profile</h3>
              <button
                type="button"
                onClick={closeProfileModal}
                className=" w-8  h-8 flex items-center  justify-center text-chocolate hover:text-red-500 "
              >
                <FontAwesomeIcon icon={faX} className="w-2" />
              </button>
            </div>

            <div className="p-5">
              <div className=" flex justify-center mb-6 ">
                <img
                  src={valueprofile.avatar || DEFAULT_AVATAR}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              <FormikProvider value={profileformik}>
                <Form className="space-y-5" onSubmit={handleSubmitprofile}>
                  <section>
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 border border-gray-500  file:bg-gray-100 file:text-gray-700 "
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (!file) {
                          return;
                        }

                        const reader = new FileReader();

                        reader.onloadend = () => {
                          setFieldValue("avatar", reader.result);
                        };

                        reader.readAsDataURL(file);

                        setFieldValue("file", file);
                      }}
                    />
                  </section>

                  <section>
                    <InputText
                      value={valueprofile.nama || ""}
                      placeholder="Nama"
                      id="nama"
                      name="nama"
                      onChange={handleChangeprofile}
                      onBlur={blurprofile}
                      isError={getIn(erorprofile, "nama")}
                      messageError={getIn(erorprofile, "nama")}
                    />
                  </section>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeProfileModal}
                      className="border-doff bg-white border text-doff w-36 h-12 "
                    >
                      Batal
                    </button>

                    <button
                      type="submit"
                      disabled={isload}
                      className="bg-doff text-littlewhite w-36 h-12 "
                    >
                      {isload ? "Menyimpan..." : "Simpan"}
                    </button>
                  </div>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuruPage;
