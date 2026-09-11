"use client";
import useAuthModule from "@/app/auth/lib";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function PersonalInfo() {
  const { useProfile } = useAuthModule();
  const { data: profile } = useProfile();
  return (
    <>
      <header className="bg-white border-b h-16 flex items-center justify-between px-3 z-50 border-gray-200 sticky top-0">
        <div className="flex items-center">
          <Link
            href="/guru"
            className="flex items-center justify-center w-10 h-10  transition"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-lg text-gray-700"
            />
          </Link>
        </div>
      </header>

      <section className="block md:flex md:min-h-[calc(100vh-4rem)] md:w-full bg-littlewhite">
        <div className="flex md:w-1/2 h-screen md:h-auto flex-col justify-center items-center px-6 sm:px-10 py-10">
          <div className="w-full max-w-md bg-white border border-cream p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Tentang Kamu
              </h2>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Beberapa informasi mungkin terlihat oleh orang lain.
              </p>
            </div>

            <div className="mb-7">
              <div className="flex flex-col items-center">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden border border-gray-200">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      profile?.data.avatar ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    }
                    alt=""
                    draggable="false"
                  />
                </div>

                <span className="text-xs text-gray-500 text-center mt-3 max-w-xs">
                  Foto profil kamu saat ini.
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 gap-4">
              <span className="text-base text-chocolate">Nama</span>

              <span className="text-base font-medium text-doff text-right">
                {profile?.data.nama}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 gap-4">
              <span className="text-base text-chocolate">Email</span>

              <span className="text-base font-medium text-doff text-right">
                {profile?.data.email}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 gap-4">
              <span className="text-base text-chocolate">Username</span>

              <span className="text-base font-medium text-doff text-right">
                {profile?.data.username}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 gap-4">
              <span className="text-base text-chocolate">Role</span>

              <span className="text-base font-medium text-doff text-right">
                {profile?.data.role}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-1/2 min-h-[calc(100vh-4rem)] bg-gradient-to-bl from-orangebold to-chocolate" />
      </section>
    </>
  );
}
