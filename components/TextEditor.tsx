"use client"

import TipTap from "./Rich-Text-Editor/Tiptap"
import { useState } from "react"

/*
    This component is:
        
        1- A client component: Text changes need to be tracked in a useState
           for Tiptap to work.

        2- A separate component: Server components can use it without turning
           the whole component into a client one.
*/

export default function TextEditor({
    id, placeholder, savedPost
}: {
    id: string, placeholder: string, savedPost: string | null
}
) {
    const [text, setText] = useState<string>(
        !savedPost
            ? placeholder
            : savedPost
    )

    const onChange = (content: string) => {
        setText(content)
    }

    return (
        <>
            {/*
                Tiptap is used for interactive text writing, but a hidden and read-only
                text area is used to submit the content of the text to the server action.
            */}

            <textarea name={id} id={id} hidden readOnly value={text} />
            <div>
                <TipTap content={text} onChange={onChange} />
            </div>
        </>
    )
}

//style={{ border: textError ? "1px solid red" : "", padding: textError ? "1px" : "" }}