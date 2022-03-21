import React, { useRef, useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Editticons from "./icons/Editticons";
import UploadLoading from "../assets/images/UploadLoading.svg";

import ImageDrop from "./icons/ImageDrop";
const MySwal = withReactContent(Swal);
const config = JSON.parse(localStorage.getItem("headers"));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
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

const dataURLtoFile = (url) => {
  let file;
};

const ImgCrop = (props) => {
  const { t, item, config, uploadType, initialAspectRatioProp } = props;

  const cropperRef = useRef(null);
  const [cropper, setCropper] = useState({});
  const [loading, setLoading] = useState(false);

  const [cropData, setCropData] = useState({});
  const [updateProgressBarValue, setUpdateProgressBarValue] = useState(0);

  const [isUpoad, setIsUpload] = useState(false);
  const [initialAspectRatio, setInitialAspectRatio] = useState(16 / 9);

  const [image, setImage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [message, setMessage] = React.useState(null);

  const onCrop = () => {
    const imageElement =
      cropperRef === null || cropperRef === void 0
        ? void 0
        : cropperRef.current;
    const cropper =
      imageElement === null || imageElement === void 0
        ? void 0
        : imageElement.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
  };
  const UploadImg = (url) => {
    setLoading(true);
    setIsUpload(true);

    let data = {};
    let api = {};

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        let file = new File([blob], "File name", { type: "image/png" });
        console.log(file);
        if (uploadType === "link") {
          data = {
            img: file,
            url: item.url,
            _method: "patch",
          };
          api = "https://swipyy.com/api/user/link/" + item.id;
        } else if (uploadType === "avatar") {
          data = {
            avatar: file,
          };
          api = "https://swipyy.com/api/user/appearance/update";
        } else if (uploadType === "cover_img") {
          data = {
            cover_img: file,
          };
          api = "https://swipyy.com/api/user/appearance/update";
        } else if (uploadType === "profile_image") {
          data = {
            image: file,
          };
          api = "https://swipyy.com/api/user/settings/update";
        } else if (uploadType === "portrait_img") {
          data = {
            portrait_img: file,
            theme_id: 0,
            background_final: "empty",
          };
          api = "https://swipyy.com/api/user/appearance/update";
        } else if (uploadType === "landscape_img") {
          data = {
            landscape_img: file,
            theme_id: 0,
            background_final: "empty",
          };
          api = "https://swipyy.com/api/user/appearance/update";
        }

        const img = toFormData(data);
        try {
          axios
            .post(api, img, {
              ...config,
              onUploadProgress: (progressEvent) => {
                console.log(progressEvent);
                var percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );

                setUpdateProgressBarValue(percentCompleted);
                // setInterval(() => {
                //   console.log(
                //     Math.round((progressEvent.loaded * 100) / totalLength)
                //   );
                // }, 1000);
              },
            })
            .then((res) => {
              setLoading(false);
              setIsUpload(false);
              setIsOpen(false);
              sucesesEdit();
              props.onSaveData();
            });
        } catch (error) {
          setLoading(false);
          setIsUpload(false);
          console.log(error);
        }
      });
  };
  const onChange = (e) => {
    console.log(e);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setIsOpen(true);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      UploadImg(cropper.getCroppedCanvas().toDataURL());
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  function closeModal() {
    setIsOpen(false);
  }
  function sucesesEdit() {
    Swal.fire(
      t("modal-edit.good-job"),
      t("modal-edit.edited-success"),
      t("modal-edit.success")
    );
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  useEffect(() => {
    if (initialAspectRatioProp) {
      setInitialAspectRatio(initialAspectRatioProp);
    }
  }, [UploadImg]);
  return (
    <div>
      <div className="edit-icon">
        <label className="img-upload-btn btn">
          <input type="file" className="d-none" onChange={(e) => onChange(e)} />
          {/* <img
            src="https://swipyy.com/swipy/storage/app/public/avatars/3u9mlgwXE5eGWHoXmVbuDMvEDrOD2tVemNEjQOdR.png"
            alt=""
          /> */}

          {uploadType === "link" ? (
            item.img ? (
              <img src={item.img} className="img-uploadded" alt={item.id} />
            ) : (
              <ImageDrop />
            )
          ) : null}
          {uploadType === "avatar" ? (
            item.avatar ? (
              <img
                src={item.avatar}
                className="img-uploadded"
                alt={item.username}
              />
            ) : (
              <ImageDrop />
            )
          ) : null}
          {uploadType === "profile_image" ? (
            item.profile_image ? (
              <img
                src={item.profile_image}
                className="img-uploadded"
                alt={item.email}
              />
            ) : (
              <ImageDrop />
            )
          ) : null}
          {uploadType === "cover_img" ? (
            item.cover_img ? (
              <img
                src={item.cover_img}
                className="img-uploadded"
                alt={item.username}
              />
            ) : (
              <ImageDrop />
            )
          ) : null}
          {uploadType === "landscape_img" ? (
            item.landscape_img ? (
              <img
                src={item.landscape_img}
                className="img-uploadded"
                alt={item.landscape_img}
              />
            ) : (
              <ImageDrop />
            )
          ) : null}
          {uploadType === "portrait_img" ? (
            item.portrait_img ? (
              <img
                src={item.portrait_img}
                className="img-uploadded"
                alt={item.portrait_img}
              />
            ) : (
              <ImageDrop />
            )
          ) : null}
        </label>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div>
          {message ? (
            <div className="alert alert-danger" role="alert">
              <h5 className=" m-0">{message}</h5>
            </div>
          ) : null}

          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={initialAspectRatio}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />

          <div className="btn-save-box">
            <button
              disabled={isUpoad}
              className="btn btn-save form-button"
              onClick={getCropData}
            >
              {isUpoad ? (
                <div
                  className="btn-save-box-bg"
                  style={{ width: updateProgressBarValue + "%" }}
                ></div>
              ) : null}

              {loading && (
                <span className="spinner-border spinner-border-sm mx-1"></span>
              )}
              <span> {t("save")}</span>
              {isUpoad ? <b>{updateProgressBarValue}%</b> : null}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImgCrop;
