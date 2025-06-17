import Swal from 'sweetalert2'
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";

export const HardDeleteButton = (props: {
  api: string,
  id: string,
  handleDeleteSuccess: (id: string) => void
}) => {
  const { api, id, handleDeleteSuccess } = props;

  const handleDelete = () => {
    Swal.fire({
      title: "Xác nhận xóa?",
      text: "Hành động này không thể hoàn tác!",
      showDenyButton: true,
      confirmButtonText: "Xóa",
      denyButtonText: `Hủy`
    }).then((result) => {
      if (result.isConfirmed) {
        const promise = fetch(api, {
          credentials: "include",
          method: "DELETE"
        })
          .then(res => res.json())
          .then((data) => {
            return data;
          })

        toast.promise(promise, {
          loading: 'Đang xử lý...',
          success: (data) => {
            handleDeleteSuccess(id);
            return data.message;
          },
          error: (data) => {
            return data.message;
          }
        })
      } else if (result.isDenied) {
      }
    });
  }

  return (
    <>
      <button
        className="px-[16px] py-[11px] text-[#EF3826]"
        onClick={() => handleDelete()}
      >
        <FaRegTrashCan />
      </button>
    </>
  );
}