import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toastr = {
  dismiss() {
    toast.dismiss();
  },
  success(messages: string) {
    toast.success(messages);
  },
  info(messages: string) {
    toast.info(messages);
  },
  warn(messages: string) {
    toast.warn(messages);
  },
  error(messages: string) {
    toast.error(messages);
  },
};
