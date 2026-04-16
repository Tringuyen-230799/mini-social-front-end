'use client';
import { FolderAddOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { useState, ChangeEvent, DragEvent } from "react";

export default function Upload({
  value,
  onChange,
}: {
  value?: File;
  onChange?: (file: File) => void;
}) {
  const [previewImage, setPreviewImage] = useState(
    value ? URL.createObjectURL(value) : "",
  );

  const [isDragging, setIsDragging] = useState(false);

  const validateImagesType = (e: DragEvent<HTMLDivElement>) => {
    const fileItems = [...e.dataTransfer.items].filter(
      (item) => item.kind === "file",
    );
    if (fileItems.length > 0) {
      e.preventDefault();
      if (fileItems.some((item) => item.type.startsWith("image/"))) {
        e.dataTransfer.dropEffect = "copy";
        return true;
      } else {
        e.dataTransfer.dropEffect = "none";
        return false;
      }
    }
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      onChange?.(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateImagesType(e)) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    validateImagesType(e);
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClear = () => {
    setPreviewImage("");
    URL.revokeObjectURL(previewImage);
    onChange?.(undefined as unknown as File);
  };

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "4px",
        overflow: "hidden",
        height: "400px",
        position: "relative",
      }}
    >
      {previewImage ? (
        <>
          <Image
            src={previewImage}
            alt="Preview"
            fill
            style={{ objectFit: "contain" }}
            unoptimized
          />
          <button
            onClick={handleClear}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "8px 16px",
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
              zIndex: 10,
            }}
          >
            Remove
          </button>
        </>
      ) : (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            border: isDragging ? "2px solid #1890ff" : "2px dashed #ccc",
            cursor: "pointer",
            backgroundColor: isDragging ? "#e6f7ff" : "#fafafa",
            transition: "all 0.3s ease",
          }}
        >
          <label
            htmlFor="file-upload"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ textAlign: "center", pointerEvents: "none" }}>
              <FolderAddOutlined
                style={{
                  fontSize: isDragging ? 48 : 36,
                  color: isDragging ? "#1890ff" : "inherit",
                  transition: "all 0.3s ease",
                }}
              />
              <Title
                level={2}
                style={{
                  color: isDragging ? "#1890ff" : "inherit",
                  marginTop: "16px",
                }}
              >
                {isDragging ? "Drop your image here" : "Drag and drop"}
              </Title>
              <p style={{ fontSize: "14px", color: "#999", marginTop: "8px" }}>
                or click to browse
              </p>
            </div>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
      )}
    </div>
  );
}
