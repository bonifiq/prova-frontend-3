import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}