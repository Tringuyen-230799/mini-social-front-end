"use client";
import { CloseOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Button, Input, Popover } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { useState, ChangeEvent, DragEvent } from "react";

export default function Upload({
  value,
  imgId,
  isEditing = false,
  onEdit,
  onChange,
}: {
  imgId: string | number;
  value?: File | string;
  isEditing?: boolean;
  onChange?: (file: File | null) => void;
  onEdit?: (id: string | number) => void;
}) {
  const imageSrc =
    value && typeof value !== "string"
      ? URL.createObjectURL(value)
      : (value as string) || "";

  const [previewImage, setPreviewImage] = useState(imageSrc);

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
      if (isEditing) {
        onEdit?.(imgId!);
      }
      onChange?.(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
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
    onChange?.(null);
    if (isEditing) {
      onEdit?.(imgId!);
    }
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
            id={imgId?.toString()}
            src={previewImage}
            alt="Preview"
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <Button
            onClick={handleClear}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            size="middle"
            shape="circle"
            icon={<CloseOutlined />}
          />
          {/* <Popover placement="leftTop">
            <div className="w-full! h-full! text-white! absolute top-0 flex items-center justify-center bg-neutral-800/40">
              Edit
            </div>
          </Popover> */}
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
                }}
              >
                {isDragging ? "Drop your image here" : "Drag and drop"}
              </Title>
              <p style={{ fontSize: "14px", color: "#999" }}>
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
