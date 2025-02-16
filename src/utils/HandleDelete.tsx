/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import Swal from "sweetalert2";

export const handleDelete = async (id: string, deleteUrl: any) => {
  if (!id) return;
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const deleteResponse = await deleteUrl(id).unwrap(); 
    //   console.log(deleteResponse);
      if (deleteResponse) {
        toast.success(deleteResponse.message);
      } else {
        toast.error("Failed to delete the item.");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while deleting.");
    }
  }
};
