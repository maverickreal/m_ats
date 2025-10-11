import { MAX_FILE_SIZE } from "../../constants";
import React from "react";
import { useDropzone } from "react-dropzone";
import { formatFileSize } from "~/lib/utils";

interface FileUploaderProps {
    onFileToggle: (_: File | null) => void;
    file: File | null;
};

const FileUploader: React.FC<FileUploaderProps> = ({ onFileToggle, file }: FileUploaderProps) => {
    const dropZone = useDropzone({
        onDrop: (files: Array<File>) => {
            onFileToggle?.(files[0] || null);
        },
        multiple: false,
        maxSize: MAX_FILE_SIZE,
        accept: {
            "application/pdf": [".pdf"]
        },
    });

    return (
        file ? (
            <div id="uploader" {...dropZone.getRootProps()} className="w-full gradient-border">
                <div className="uploader-selected-file">
                    <img src="/images/pdf.png" alt="PDF image icon" className="size-10" />
                    <div className="flex items-center space-x-3">
                        <div>
                            <p className="text-sm max-w-xs text-gray-700 font-medium truncate">
                                {file.name}
                            </p>

                            <p className="text-sm test-gray-500">
                                {formatFileSize(file.size)}
                            </p>
                        </div>
                    </div>
                    <button type="button" className="p-2 cursor-pointer" onClick={() => onFileToggle?.(null)}>
                        <img src="/icons/cross.svg" alt="delete" className="w-4 h-4" />
                    </button>
                </div>
            </div>
        ) : (
            <div {...dropZone.getRootProps()} className="w-full gradient-border">
                <input id="uploader" {...dropZone.getInputProps()} />
                <div className="space-y-4 cursor-pointer">
                    {
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="upload" className="size-20" />
                            </div>
                            <p className="text-lg text-gray-500">
                                <span className="font-semibold">
                                    Click to upload
                                </span> or Drag & Drop.
                            </p>

                            <p className="text-lg text-gray-500">
                                PDF (upto {formatFileSize(MAX_FILE_SIZE)})
                            </p>
                        </div>
                    }
                </div>
            </div>
        )
    );
};

export default FileUploader;
