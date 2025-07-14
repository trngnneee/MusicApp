import { RiResetLeftFill } from "react-icons/ri";
import { toast } from "sonner";

export const RecoveryButton = (props: {
  api: string,
  id: string,
  handleRecoverySuccess: (id: string) => void
}) => {  
  const { api, id, handleRecoverySuccess } = props;

  const handleRecovery = () => {
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
        handleRecoverySuccess(id);
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
        className="px-[16px] py-[11px] border-r-[0.6px] border-[#D5D5D5]"
        onClick={() => handleRecovery()}
      >
        <RiResetLeftFill />
      </button>
    </>
  );
}