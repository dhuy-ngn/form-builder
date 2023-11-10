"use client";

import dynamic from "next/dynamic";
import { Sources } from 'quill';
import { useMemo, useState } from "react";
import { UnprivilegedEditor } from 'react-quill';
import './styles.css';

type RichTextEditorProps = {
  placeholder?: string,
  onChange: (text: string) => void;
  onBlur: (text: string) => void;
  readOnly?: boolean,
};

function RichTextEditor({
  placeholder, onChange, readOnly
}: RichTextEditorProps) {
  // Lazy loading react-quill
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []);

  const [count, setCount] = useState<number>(0);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['clean']
    ],
  };

  const handleOnChange = (
    text: string,
    _: any,
    sources: Sources,
    editor: UnprivilegedEditor,
  ) => {
    const characterCount = editor.getLength() - 1;
    setCount(characterCount);

    onChange(text);
  };

  return (
    <div className="flex flex-col bg-input">
      <ReactQuill
        className="flex-1"
        theme="snow"
        placeholder={placeholder}
        modules={modules}
        onChange={handleOnChange}
        readOnly={readOnly} />
      <text
        className="text-xs text-neutral-focus ml-auto pr-2"
      >Character count: {count}
      </text>
    </div>

  );
}

export default RichTextEditor;