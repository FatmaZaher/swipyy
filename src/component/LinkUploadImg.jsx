import React, { useState } from "react";
import "image-upload-react/dist/index.css";
import ImageDrop from "./icons/ImageDrop";

import ImageUploading from "react-images-uploading";
import TrashIcon from "./icons/TrashIcon";
import axios from "axios";
const LinkUploadImg = (props) => {
  const { link, config } = props;

  const [image, setImage] = useState("");
  const toFormData = (fromdata) => {
    const toFormDataInner = ((f) => f(f))((h) => (f) => f((x) => h(h)(f)(x)))(
      (f) => (fd) => (pk) => (d) => {
        if (d instanceof Object) {
          Object.keys(d).forEach((k) => {
            const v = d[k];
            if (pk) k = `${pk}[${k}]`;
            if (
              v instanceof Object &&
              !(v instanceof Date) &&
              !(v instanceof File)
            ) {
              return f(fd)(k)(v);
            } else {
              fd.append(k, v);
            }
          });
        }
        return fd;
      }
    )(new FormData())();
    return toFormDataInner(fromdata);
  };
  const maxNumber = 1;
  const onChange = async (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImage(imageList);
    console.log(imageList);
    const img = toFormData({
      img: imageList[0].file,
      url: link.url,
      _method: "patch",
    });
    try {
      await axios
        .post("https://test-place.site/api/user/link/" + link.id, img, config)
        .then((res) => {
          props.onSaveData("ee");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ImageUploading
        value={image}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div>
              <button onClick={onImageUpload} {...dragProps}>
                <div className="img-upload">
                  <ImageDrop />
                </div>
              </button>
            </div>
            <div
              className="images-uploads"
              style={imageList.length > 0 ? { top: "0" } : { top: "50px" }}
            >
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageRemove(index)}>
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </>
  );
};
export default LinkUploadImg;
