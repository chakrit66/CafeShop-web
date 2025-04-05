import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import { Input } from "@/components/ui/input";
import useCafeStore from "@/store/cafe-store";
import { removeFile, upLoadFiles } from "@/api/product";
import { Loader } from "lucide-react";

const Uploadfile = ({ form }) => {
  const { setValue, watch } = form;
  const [isLoading, setIsLoading] = useState(false);
  const token = useCafeStore((s) => s.token);

  const images = watch("images") || []; // ดึงค่าปัจจุบันของ images

  const handleDelete = (public_id) => {
    setIsLoading(true);
    removeFile(token, public_id)
      .then(() => {
        const updatedImages = images.filter(
          (item) => item.public_id !== public_id
        );
        setValue("images", updatedImages); // ใช้ setValue ของ useForm
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error deleting file:", err);
        setIsLoading(false);
      });
  };

  const handleOnChange = (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setIsLoading(true);

    let allFiles = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        setIsLoading(false);
        continue;
      }

      Resizer.imageFileResizer(
        file,
        400,
        400,
        "PNG",
        100,
        0,
        (data) => {
          upLoadFiles(token, data)
            .then((res) => {
              allFiles.push(res.data);
              setValue("images", allFiles); // ใช้ setValue ในการอัปเดตค่า
              setIsLoading(false);
            })
            .catch((err) => {
              console.error("Error uploading file:", err);
              setIsLoading(false);
            });
        },
        "base64"
      );
    }
  };

  return (
    <div>
      <div className="flex m-2 items-center justify-center gap-2">
        {isLoading && <Loader className="animate-spin m-1" />}
        {images.map((item, index) => (
          <div className="relative" key={index}>
            <img
              className="w-24 h-24 object-cover rounded-md"
              src={item.url}
              alt="uploaded"
            />
            <button
              className="absolute top-0 right-0 bg-red-600 text-white rounded-md p-1 hover:scale-110 cursor-pointer"
              onClick={() => handleDelete(item.public_id)}
              type="button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <Input
        name="images"
        onChange={handleOnChange}
        type="file"
        accept="image/*"
        multiple
      />
    </div>
  );
};

export default Uploadfile;
