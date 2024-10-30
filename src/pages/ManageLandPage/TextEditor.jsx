import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const TextEditor = ({initialValue, onChange}) => {
	const [editorContent, setEditorContent] = useState(initialValue);

	useEffect(() => {
		setEditorContent(initialValue); // Update editor content if initialValue changes
	}, [initialValue]);

	const handleChange = (content) => {
		setEditorContent(content);
		onChange(content); // Notify parent (Formik) of content changes
	};

	return (
		<div>
			<ReactQuill
				style={{
					width: '70%',
				}}
				value={editorContent}
				onChange={handleChange}
				theme="snow"
			/>
		</div>
	);
};

export default TextEditor;
