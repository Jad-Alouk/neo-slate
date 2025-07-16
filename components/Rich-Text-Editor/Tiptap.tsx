"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import MenuBar from "./MenuBar"

import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"

import React, { useEffect, useRef } from "react"


export default function TipTap(
    {
        content,
        onChange
    }:
        {
            content: string,
            onChange: (content: string) => void
        }
) {

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3"
                    }
                },

                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3"
                    }
                },
            }),

            TextAlign.configure({
                types: ["heading", "paragraph"]
            }),

            Highlight
        ],

        content: content,

        editorProps: {
            attributes: {
                class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3"
            }
        },

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        }
    })


    // This forces content into the editor space when data is pre-loaded to update it.
    const isInitialContentSet = useRef(false)

    useEffect(() => {
        if (editor && content && !isInitialContentSet.current) {
            editor.commands.setContent(content)
            isInitialContentSet.current = true
        }
    }, [editor, content])

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}