import React from "react";
import { Editor } from "react-draft-wysiwyg";

const TextEditor = (props) => {
	const { classes } = props;
	return (
		<div>
			<Editor
				editorState={props.editorState}
				toolbarClassName={["toolbarClassName", classes.toolbarClassName].join(
					" "
				)}
				wrapperClassName={["wrapperClassName", classes.wrapperClassName].join(
					" "
				)}
				editorClassName={["editorClassName", classes.editorClassName].join(" ")}
				onEditorStateChange={props.onEditorStateChange}
				toolbar={{
					options: [
						"inline",
						"blockType",
						"fontSize",
						"fontFamily",
						"list",
						"textAlign",
						"link",
						"emoji",
						"history",
					],
					inline: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						dropdownClassName: undefined,
						options: [
							"bold",
							"italic",
							"underline",
							"strikethrough",
							"superscript",
							"subscript",
						],
						bold: { className: undefined },
						italic: { className: undefined },
						underline: { className: undefined },
						strikethrough: { className: undefined },
						superscript: { className: undefined },
						subscript: { className: undefined },
					},
					blockType: {
						inDropdown: true,
						options: [
							"Normal",
							"H1",
							"H2",
							"H3",
							"H4",
							"H5",
							"H6",
							"Blockquote",
							"Code",
						],
						className: undefined,
						component: undefined,
						dropdownClassName: undefined,
					},
					fontSize: {
						options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
						className: undefined,
						component: undefined,
						dropdownClassName: undefined,
					},
					fontFamily: {
						options: [
							"Arial",
							"Georgia",
							"Impact",
							"Tahoma",
							"Times New Roman",
							"Verdana",
						],
						className: undefined,
						component: undefined,
						dropdownClassName: undefined,
					},
					list: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						dropdownClassName: undefined,
						options: ["unordered", "ordered", "indent", "outdent"],
						unordered: {
							className: undefined,
						},
						ordered: { className: undefined },
						indent: { className: undefined },
						outdent: { className: undefined },
					},
					textAlign: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						dropdownClassName: undefined,
						options: ["left", "center", "right", "justify"],
						left: { className: undefined },
						center: { className: undefined },
						right: { className: undefined },
						justify: { className: undefined },
					},
					link: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						popupClassName: undefined,
						dropdownClassName: undefined,
						showOpenOptionOnHover: true,
						defaultTargetOption: "_self",
						options: ["link"],
						link: { className: undefined },
						linkCallback: undefined,
					},
					history: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						dropdownClassName: undefined,
						options: ["undo", "redo"],
						undo: { className: undefined },
						redo: { className: undefined },
					},
				}}
			/>
		</div>
	);
};

export default TextEditor;