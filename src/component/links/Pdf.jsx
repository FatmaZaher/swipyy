import React, { useState } from "react";

const Pdf = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
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
            multiple
          />
          {isFilePicked ? (
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
            <p>Select a file to show details</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Pdf;
