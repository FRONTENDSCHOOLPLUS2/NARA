import useMutation from "@hooks/useMutation";

const useFileUpload = () => {
  const { send } = useMutation("/files");
  const postSingleFile = async (file) => {
    const formData = new FormData();
    formData.append("attach", file);
    const response = await send({
      method: "POST",
      headers: {},
      body: formData,
    });
    return response;
  };
  return { postSingleFile };
};

export default useFileUpload;
