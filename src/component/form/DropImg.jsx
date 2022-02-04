import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ImageUploading from "react-images-uploading";
import ImageDrop from "../icons/ImageDrop";
import LinkButton from "../../component/form/LinkButton";
import { Link } from "react-router-dom";
import axios from "axios";
import UploadLoading from "../../assets/images/UploadLoading.svg";
import LockModal from "../LockModal";

const DropImg = (props) => {
  const { t } = props;

  const { config, item } = props;
  const [images, setImages] = useState([]);
  const [oldImages, setoldImages] = useState([]);
  const [isUpoad, setIsUpload] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
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
  const checkIsPro = (value) => {
    if (value > 1) {
      if (currentUser.is_pro == false) {
        setIsLockModalOpen(true);
        return false;
      }
    }
  };
  const submitImages = async (values) => {
    const newValues = toFormData(values);
    setIsUpload(true);
    try {
      await axios
        .post("https://swipyy.com/api/user/slider/update", newValues, config)
        .then((res) => {
          setIsUpload(false);
          props.onSaveData();
        });
    } catch (error) {}
  };
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    let old_length = oldImages.length;
    let new_length = imageList.length;
    let final = old_length + new_length;
    if (checkIsPro(final) == false) return;
    const newImage = imageList.map((item) => item.file);
    submitImages({ imgs: newImage });
    // setImages(imageList);
  };
  useEffect(() => {
    setoldImages(item.images);
  });
  const DeleteImg = async (id) => {
    try {
      await axios
        .delete(
          `https://swipyy.com/api/user/slider/images/delete/${id}`,
          config
        )
        .then((res) => {
          setIsUpload(false);
          props.onSaveData();
        });
    } catch (error) {}
  };
  const handleCloseLockModal = () => {
    setIsLockModalOpen(false);
  };
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
                  <div>{t("leave-here")}</div>
                ) : (
                  <div>
                    {t("drop-image")} &nbsp; ,
                    {/* <button onClick={onImageRemoveAll} className="remove-img">
                      remove all images
                    </button> */}
                    <p>
                      {t("supports")}: JPG,PNG, PDF{" "}
                      <span className="pro-btn">
                        <Link to="/payments">
                          <LinkButton type="" buttontext="PRO" />
                        </Link>
                      </span>
                    </p>
                  </div>
                )}
              </button>
              {isUpoad ? (
                <div className="text-center">
                  <img src={UploadLoading} alt="" />
                </div>
              ) : null}
            </div>
            <div className="images-uploads mt-3">
              {oldImages.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.src} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                    <button onClick={() => DeleteImg(image.id)}>
                      {t("remove")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
      <LockModal
        modalIsOpen={isLockModalOpen}
        onCloseLockModal={() => handleCloseLockModal()}
      >
        <div className="alert alert-danger mb-5" role="alert">
          <h5>The images is more than one image please go to pro</h5>
        </div>
      </LockModal>
    </>
  );
};
export default DropImg;
