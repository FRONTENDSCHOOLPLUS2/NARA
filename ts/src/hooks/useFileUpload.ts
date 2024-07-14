const API_SERVER = "https://api.fesp.shop";

const useFileUpload = () => {
  const send = async (url: string, options = {}) => {
    if (!url.startsWith("http")) {
      url = API_SERVER + url;
    }

    options = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`2xx 이외의 응답: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const postSingleFile = async <T>(file: File): Promise<T> => {
    const formData = new FormData();
    formData.append("attach", file);
    const response: T = await send("/files", {
      method: "POST",
      headers: {},
      body: formData,
    });
    return response;
  };

  return { postSingleFile };
};

export default useFileUpload;
