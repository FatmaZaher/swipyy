import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";
import ImageDrop from "../icons/ImageDrop";
import LinkButton from "../../component/form/LinkButton";
import { Link } from "react-router-dom";
import axios from "axios";

const DropImg = (props) => {
  const { config, item } = props;
  const [images, setImages] = React.useState([]);
  const [oldImages, setoldImages] = React.useState([]);

  const maxNumber = 69;
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
  const submitImages = async (values) => {
    const newValues = toFormData(values);
    try {
      await axios
        .post(
          "https://test-place.site/api/user/slider/update",
          newValues,
          config
        )
        .then((res) => {
          props.onSaveData("ee");
        });
    } catch (error) {}
  };
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    const newImage = imageList.map((item) => item.file);
    submitImages({ imgs: newImage });
    // setImages(imageList);
  };
  useEffect(() => {
    setoldImages(item.images);
  });
  return (
    <>
      <ImageUploading
        multiple
        value={images}
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
                <div className="img-upload mb-3">
                  <ImageDrop />
                </div>
                {isDragging ? (
                  <div>leave here</div>
                ) : (
                  <div>
                    Drop your image here, or browse &nbsp; ,
                    <button onClick={onImageRemoveAll} className="remove-img">
                      remove all images
                    </button>
                    <p>
                      Supports: JPG,PNG, PDF{" "}
                      <span className="pro-btn">
                        <Link to="/payments">
                          <LinkButton type="" buttontext="PRO" />
                        </Link>
                      </span>
                    </p>
                  </div>
                )}
              </button>
            </div>
            <div className="images-uploads mt-3">
              {oldImages.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.src} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                    <button onClick={() => onImageRemove(index)}>Remove</button>
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
export default DropImg;
