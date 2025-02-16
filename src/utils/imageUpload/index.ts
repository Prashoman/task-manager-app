/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const imageUploadImageBB = async (image: any) => {
  const imageResponse = await fetch(
    `https://api.imgbb.com/1/upload?key=9304fa358b01e425958d8d339f09a15c`,
    {
      method: "POST",
      body: image,
    }
  );
  const imageData = await imageResponse.json();
  if (imageData.success) {
    return imageData.data.url;
  } else {
    toast.error("An error occurred while uploading image");
    return;
  }
};
