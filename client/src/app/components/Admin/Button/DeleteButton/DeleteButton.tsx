import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";

export const DeleteButton = (props: {
  api: string,
  id: string,
  handleDeleteSuccess: (id: string) => void
}) => {  
  const { api, id, handleDeleteSuccess } = props;

  const handleDelete = () => {
    const token = localStorage.getItem("adminToken");
    const promise = fetch(api, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      method: "PATCH"
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