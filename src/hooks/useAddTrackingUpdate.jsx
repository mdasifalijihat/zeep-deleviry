import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAddTrackingUpdate = () => {
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async ({ tracking_id, parcel_id, status, message, updated_by }) => {
      const res = await axiosSecure.post("/trackings", {
        tracking_id,
        parcel_id,
        status,
        message,
        updated_by,
      });
      return res.data;
    },
  });

  return mutation;
};

export default useAddTrackingUpdate;
