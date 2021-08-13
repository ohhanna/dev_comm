import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

export default function ToastEditor(prop){

    console.log(prop);
	return (
        <Editor 
            previewStyle="vertical"
            height="300px"
            initialEditType="wysiwyg"
            placeholder=""
            initialValue=""
        />
	);
}