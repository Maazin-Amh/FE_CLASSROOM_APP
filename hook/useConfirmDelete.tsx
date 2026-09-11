import { useToast } from "@chakra-ui/react";

type SubmitFunction = (id: number) => any;

export function useConfirmDelete({ onSubmit }: { onSubmit: SubmitFunction }) {
  const toast = useToast();

  const handleDelete = (id: number) => {
    toast({
      title: "Apakah Yakin?",
      description: "Data yang terhapus tidak bisa dikembalikan",
      status: "warning",
      duration: null,
      isClosable: true,
      position: "bottom-right",
      render: () => (
        <div className="w-[320px] bg-littlewhite border border-cream p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-800">kamu Yakin?</p>

            <p className="text-sm text-gray-500 mt-1">
              Semua data yang terhapus tidak bisa dikembalikan.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
             className="border-doff bg-white border text-doff w-36 h-12 "
              onClick={() => toast.closeAll()}
            >
              Batal
            </button>

            <button
              type="button"
              className="bg-doff text-littlewhite w-36 h-12  hover:bg-red-500 transition-all"
              onClick={async () => {
                await onSubmit(id);

                toast.closeAll();
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      ),
    });
  };

  return handleDelete;
}
