import { ChangeEvent } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";

export default function DragAndDrop({
  file,
  setFile,
}: {
  file: File;
  setFile: (file: File) => void;
}) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0] || null;
    setFile(selectedFile);
  };

  return (
    <section className="drag-drop">
      <div
        className={`document-uploader ${
          file && file?.size > 0 ? "upload-box active" : "upload-box"
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <div className="upload-info">
          <AiOutlineCloudUpload />
          <div>
            <p>Drag and drop your files here</p>
            <p>Supported file: .XLSX</p>
          </div>
        </div>
        <input
          type="file"
          name="file"
          hidden
          id="browse"
          onChange={handleFileChange}
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        />
        <label htmlFor="browse" className="browse-btn mb-4">
          Browse files
        </label>
        {file && file?.size > 0 && (
          <div className="file-list">
            <div className="file-list__container">
              <div className="file-item">
                <div className="file-info">
                  <p>{file.name}</p>
                  <p>{file.type}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {file && file?.size > 0 && (
          <div className="success-file">
            <AiOutlineCheckCircle
              style={{ color: "#6DC24B", marginRight: 1 }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
