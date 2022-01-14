import React, { useState, useEffect } from "react";
import LinkButton from "../../component/form/LinkButton";
import { Link } from "react-router-dom";
import Deleteicon from "../../component/icons/Deleteicon";
import Editicon from "../../component/icons/Editicon";
import ImageDrop from "../icons/ImageDrop";
import UploadFileIcon from "../icons/UploadFileIcon";
import axios from "axios";
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
const config = JSON.parse(localStorage.getItem("headers"));

const Pdf = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [items, setItems] = useState([]);

  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    setIsFilePicked(true);
    const img = toFormData({
      src: event.target.files[0],
    });
    if (file.size < 52428800) {
      try {
        await axios
          .post("https://test-place.site/api/user/files", img, config)
          .then((res) => {
            getFiles();
          })
          .then((res) => {});
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getFiles = () => {
    axios.get("https://test-place.site/api/user/files", config).then((res) => {
      setItems(res.data.data);
      props.onSaveData();

    });
  };
  useEffect(() => {
    getFiles();
  }, []);
  const handleEditData = (key, e) => {
    getFiles();
  };

  return (
    <div className="pdf">
      <div className="drop-pdf">
        <div>
          <div className="img-upload mb-3">
            {/* <ImageDrop /> */}
            <UploadFileIcon />
          </div>
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept="application/pdf"
          />

          {isFilePicked ? (
            <div>
              {selectedFile.size < 52428800 ? (
                <p className="more-size">
                  <sapn>a file is bigger than 150M go to </sapn>

                  <div className="pro-btn">
                    <Link to="/payments">
                      <LinkButton type="" buttontext="PRO" />
                    </Link>
                  </div>
                </p>
              ) : (
                <div className="file-info mt-3 pt-3">
                  {/* <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>
                    lastModifiedDate:{" "}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </p> */}
                </div>
              )}
            </div>
          ) : (
            <>
              <p className="more-size">
                <span>bigger than 150M go to </span>

                <div className="pro-btn">
                  <Link to="/payments">
                    <LinkButton type="" buttontext="PRO" />
                  </Link>
                </div>
              </p>
              <p>Select a file to show details</p>
            </>
          )}
        </div>
      </div>
      {items.map((file, index) => (
        <div className="single-item mb-3">
          <div className="single-item-info">
            <p
              className="name-from-link"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <a href={file.src}>{file.src}</a>
            </p>
          </div>
          <div className="link-action">
            <Deleteicon
              item={file}
              config={config}
              onSaveData={() => handleEditData()}
              api="user/files"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Pdf;
