import { message } from "antd";

export const copyToClipboard = (fileList) => {
  if (window.clipboardData && window.clipboardData.setData) {
    message.info("Copied");
    return window.clipboardData.setData("Text", fileList);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    var textarea = document.createElement("textarea");
    textarea.textContent = fileList.toString().split(",").join("\n");
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      message.info("Copied");
      return document.execCommand("copy");
    } catch (ex) {
      message.error("Copy to clipboard failed.", ex);
      return prompt("Copy to clipboard: Ctrl+C, Enter", fileList);
    } finally {
      document.body.removeChild(textarea);
    }
  }
};
