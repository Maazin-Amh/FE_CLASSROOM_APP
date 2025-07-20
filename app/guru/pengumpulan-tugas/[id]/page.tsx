"use client";

import useGuruModule from "../../lib";

const Pengumpulan = ({ params }: { params: { id: string } }) => {
  const { useDetailTugas } = useGuruModule();
  const { data, isFetching } = useDetailTugas(params.id);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
        {data?.judul || "Judul Tugas"}
      </h1>

      {data?.submites && data.submites.length > 0 ? (
        <div className="grid gap-6">
          {data.submites.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white border border-gray-200 rounded-lg transition-shadow duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-slate-900 text-white flex items-center justify-center rounded-full font-bold text-xl">
                    {item.created_by.nama.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      {item.created_by.nama}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      ID: {item.created_by.id}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <a
                    href={item.files}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-slate-900 text-white py-2 px-4 rounded hover:bg-slate-500 transition-colors"
                  >
                    Lihat File
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8">
          Tidak ada pengumpulan tugas.
        </div>
      )}
    </div>
  );
};

export default Pengumpulan;