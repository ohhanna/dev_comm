import React, { useState, useEffect } from 'react';

// TOAST UI Editor import
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function ToastEditor() {

    return (
        <>
            <Editor
                initialValue="abc"
                usageStatistics={false}
            />
        </>
    )
}

export default ToastEditor;