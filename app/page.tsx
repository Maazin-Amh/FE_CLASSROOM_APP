/* eslint-disable @next/next/no-img-element */
"use client";
import Stepper from "@/components/Stepper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  return (
    <>
      <div className="bg-doff cursor-pointer z-50 sticky text-sm p-2 font-medium text-center text-white">
        WEBSITE INI MASIH DALAM TAHAP PENGEMBANGAN  🛠️
      </div>
      <header className="flex sticky top-0 flex-wrap sm:justify-start sm:flex-col z-40 w-full bg-white border-b border-gray-200 text-sm pb-2 sm:pb-0">
        <nav
          className="relative max-w-[85rem] w-full mx-auto py-2 md:py-0 px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <div className="item-center flex items-center">
              <Link href={""}>
                <p className="text-xl text-[#5f6368] font-normal">
                  EduCommunity
                </p>
              </Link>
            </div>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1={3} x2={21} y1={6} y2={6} />
                  <line x1={3} x2={21} y1={12} y2={12} />
                  <line x1={3} x2={21} y1={18} y2={18} />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
              <a
                className="py-3 ps-px cursor-pointer sm:px-3 sm:py-6 font-medium text-doff"
                onClick={() => route.push("/login")}
                aria-current="page"
              >
                Masuk
              </a>
              <a
                className="py-3 ps-px sm:px-3 cursor-pointer sm:py-6 font-medium text-doff hover:text-gray-500"
                onClick={() => route.push("/register")}
              >
                Daftar
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="bg-gray-50 flex md:flex-row flex-col items-center py-40">
          <div className="mx-3 md:w-11/12 ">
            <div className="md:flex md:justify-center md:flex-col md:items-center grid md:gap-2 ">
              <span className="md:flex md:justify-center md:items-center grid md:gap-2 ">
                <h2 className="text-6xl font-bold mb-4">Platfom</h2>
                <span className="text-6xl bg-orangebold text-littlewhite p-1 w-72 md:w-auto font-bold mb-4">
                  Belajar Online
                </span>
                <h2 className="text-6xl font-bold mb-4">Gratis</h2>
              </span>
              <span className="md:flex md:flex-col md:w-1/2 md:justify-center md:items-center grid">
                <p className="mb-8 md:text-center font-normal">
                  Web berbasis edukasi online gratis untuk semua kalangan. Yang
                  memudahkan siswa dan guru untuk melakukan secara pembelajaran
                  online atau daring.
                </p>
                <button
                  onClick={() => route.push("/login")}
                  className="bg-doff text-littlewhite w-36 h-12 rounded-full"
                >
                  Daftar Gratis
                </button>
              </span>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center justify-between gap-10 px-5 py-16 md:flex-row md:px-12 md:py-24">
          <div className="w-full md:w-1/2">
            <h1 className="mb-8 text-2xl font-bold text-left md:text-3xl">
              Kenapa Sih Harus Menggunakan EduCommunity?
            </h1>
            <ul className="relative flex flex-col gap-y-2">
              <Stepper
                id={1}
                title="Praktis"
                isian="Website ini sangat praktis digunakan karena menggunakan konsep desain yang sangat simple."
              />
              <Stepper
                id={2}
                title="Gratis"
                isian="Web EduCommunity full gratis dan tidak dipungut biaya."
              />
              <Stepper
                id={3}
                title="Untuk Semua Kalangan"
                isian="Bisa digunakan untuk kalangan mahasiswa, siswa, ataupun guru, karena website ini bersifat terbuka."
              />
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://i.ibb.co.com/KxxcHDkh/IMG-0621.jpg"
              className="h-[300px] w-full rounded-2xl object-cover brightness-50 md:h-[450px]"
            />
          </div>
        </section>
      </main>
      <footer className="border-t border-chocolate bg-littlewhite">
        <div className="mx-auto max-w-7xl px-6 py-9">
          <div className="flex flex-col items-center  gap-6 text-md font-medium text-chocolate sm:flex-row">
            <p>Dukung Developer</p>

            <div className="flex gap-5">
              <a
                href="https://github.com/Maazin-Amh"
                target="_blank"
                className="transition hover:text-orangebold"
              >
                <img src={"/github.svg"} className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ariiq-maazin/"
                target="_blank"
                className="transition hover:text-orangebold"
              >
                <img src={"/linkedin.svg"} className="size-5" />
              </a>
              <a
                href="https://x.com/ariiqmaazin"
                target="_blank"
                className="transition hover:text-orangebold"
              >
                <img src={"/x.svg"} className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
