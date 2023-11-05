"use client";

import FormDesignerContext from "@/contexts/FormDesignerContext";
import { useContext } from "react";

export default function useFormDesigner() {
  const context = useContext(FormDesignerContext);
  if (!context) {
    throw new Error("useFormDesigner must be used within a FormDesignerContext");
  }

  return context;
}