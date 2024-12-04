import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showToast(message: string, status?: string) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: status == "success" ? "#4CAF50" : "#FF4C4C",
    },
  }).showToast();
}

export default showToast