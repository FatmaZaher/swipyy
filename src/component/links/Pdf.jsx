import React, { useState } from "react";
import LinkButton from "../../component/form/LinkButton";
import { Link } from "react-router-dom";

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
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept="application/pdf"
            className="mb-3"
          />

          {isFilePicked ? (
            <div>
              {selectedFile.size < 157286400 ? (
                <div>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>
                    lastModifiedDate:{" "}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="more-size">
                  <sapn>a file is more than 150 go to </sapn>
                  
                  <div className="pro-btn">
                    <Link to="/payments">
                      <LinkButton
                        type=""
                        buttontext="PRO"
                      />
                    </Link>
                  
                  </div>
                </p>
              )}
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Pdf;
