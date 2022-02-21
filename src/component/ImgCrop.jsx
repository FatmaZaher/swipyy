import React, { useRef, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Editticons from "./icons/Editticons";
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

const UploadImg = (url) => {
  let data = {};
  let api = {};
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      let file = new File([blob], "File name", { type: "image/png" });

      data = {
        image: file,
      };
      api = "https://swipyy.com/api/user/settings/update";

      const img = toFormData(data);
      try {
        axios.post(api, img, config).then((res) => {
          // props.onSaveData("ee");
        });
      } catch (error) {
        console.log(error);
      }
    });
};
const dataURLtoFile = (url) => {
  let file;
};

const ImgCrop = (props) => {
  const { t } = props;
  const cropperRef = useRef(null);
  const [cropper, setCropper] = useState({});
  const [cropData, setCropData] = useState({});
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
  const onChange = (e) => {
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
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function sucesesEdit() {
    // Swal.fire(
    //   t("modal-edit.good-job"),
    //   t("modal-edit.edited-success"),
    //   t("modal-edit.success")
    // );
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  return (
    <div>
      <div className="edit-icon">
        <label className="img-upload-btn btn">
          <input type="file" className="d-none" onChange={onChange} />
          <img
            src="https://swipyy.com/swipy/storage/app/public/avatars/3u9mlgwXE5eGWHoXmVbuDMvEDrOD2tVemNEjQOdR.png"
            alt=""
          />
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
            initialAspectRatio={16 / 9}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
          <div className="btn-save-box">
            <button className="btn btn-save form-button" onClick={getCropData}>
              {t("save")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImgCrop;
