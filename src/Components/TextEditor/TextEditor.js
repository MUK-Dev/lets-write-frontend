import React from "react";
import { Editor } from "react-draft-wysiwyg";

import options from "./TextEditorToolbarOptions";

const TextEditor = (props) => {
	const { classes, editorState, onEditorStateChange } = props;
	return (
		<div>
			<Editor
				editorState={editorState}
				toolbarClassName={["toolbarClassName", classes.toolbarClassName].join(
					" "
				)}
				wrapperClassName={["wrapperClassName", classes.wrapperClassName].join(
					" "
				)}
				editorClassName={["editorClassName", classes.editorClassName].join(" ")}
				onEditorStateChange={onEditorStateChange}
				toolbar={options}
			/>
		</div>
	);
};

export default TextEditor;
