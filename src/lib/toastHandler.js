import { toast } from "sonner";

export function toastHandler(promise, onSuccess, router, redirectPath) {
  toast.promise(promise, {
    loading: "Đang xử lý...",
    success: (data) => {
      if (data.code === "success") {

        if (typeof onSuccess === "function") onSuccess(data);

        if (router && redirectPath) {
          setTimeout(() => {
            router.push(redirectPath);
          }, 1000);
        }

        return data.message || "Thành công!";
      }

      throw new Error(data.message || "Thao tác thất bại");
    },
    error: (err) => `Lỗi: ${err.message || err}`,
  });

  return promise;
}
