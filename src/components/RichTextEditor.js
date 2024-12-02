import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // import styles

const RichTextEditor = ({ value, onChange }) => {
  return (
    <ReactQuill 
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link'],
          [{ 'align': [] }],
          ['clean']  // add a clean button for clearing text
        ],
      }}
      placeholder="Start typing here..."
    />
  );
};

export default RichTextEditor;
