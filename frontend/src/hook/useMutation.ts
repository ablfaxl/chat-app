import { useState } from "react";
import { AxiosResponse, http } from "../config/http-config";
import { toast } from "react-toastify";

type MutationOptionType = {
  url: string;
  method: "post" | "get";
  body?: any;
};

export const useMutation = <T>() => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSuccess = async (options: MutationOptionType) => {
    const res: AxiosResponse<T> = await http[options.method]<T>(
      options.url,
      options.body
    );
    toast.success("success", {
      position: "bottom-right",
    });
    setData(res.data);
  };

  const handleError = (e: any) => {
    setError(e?.response?.data);
    toast.error(e?.response?.data ?? "uknow error");
  };

  const runMutation = (options: MutationOptionType) => {
    setLoading(true);
    handleSuccess(options)
      .catch((e) => {
        handleError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, execute: runMutation };
};
