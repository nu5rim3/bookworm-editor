import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Book = () => {


    const [value, setValue] = useState('');

    return (
        <ReactQuill value={value} onChange={setValue} className="w-full pb-10 border bottom-2" />
    )
}

export default Book