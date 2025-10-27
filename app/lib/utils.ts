import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const formatFileSize = (bytesCount: number): string => {
    const units = ["B", "KB", "MB"];
    let i: number = 0;

    while (bytesCount >= 1024 && i < units.length - 1) {
        bytesCount /= 1024;
        i++;
    }

    return bytesCount.toFixed(2) + " " + units[i];
};

export const generateUUID = (): string => crypto.randomUUID();

export const cn = (...classValues: Array<ClassValue>) => {
    return twMerge(clsx(classValues));
};
