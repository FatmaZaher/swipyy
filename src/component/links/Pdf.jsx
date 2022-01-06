import React, { useState } from "react";
import LinkButton from "../../component/form/LinkButton";
import { Link } from "react-router-dom";
import ImageDrop from "../icons/ImageDrop";
import UploadFileIcon from "../icons/UploadFileIcon";

const Pdf = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  console.log(selectedFile);

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
          <p className="more-size">
            <span>bigger than 150M go to </span>

            <div className="pro-btn">
              <Link to="/payments">
                <LinkButton type="" buttontext="PRO" />
              </Link>
            </div>
          </p>
          {/* <div className="file-info mt-3 pt-3">
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div> */}




          {/* {isFilePicked ? (
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
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>
                    lastModifiedDate:{" "}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p>Select a file to show details</p>
          )} */}
        </div>
      </div>
    </div>
  );
};
export default Pdf;
