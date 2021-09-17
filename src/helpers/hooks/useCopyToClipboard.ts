export default function useCopyToClipboard() {
  function copy(text: string) {
    try {
      const textarea: HTMLTextAreaElement = document.createElement("textarea");

      textarea.id = "temp_code";

      textarea.style.height = "0";

      document.body.appendChild(textarea);

      textarea.value = text || "";

      const selector: HTMLTextAreaElement | null =
        document.querySelector("#temp_code");

      selector?.select();
      document.execCommand("copy");

      // Remove the textarea
      document.body.removeChild(textarea);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return { copy };
}
