"use client"

import { Delete } from "lucide-react"
import { useRef } from "react"
import { Button } from "./ui/button"


export default function DeleteButtonClient(
    { itemName, type }
        :
        { itemName: "item" | string, type: "btn" | "icon" }
) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    const showDialog = () => dialogRef.current?.showModal()
    const closeDialog = () => dialogRef.current?.close()

    return (
        <>
            {
                type == "icon"
                    ? <button
                        type="button"
                        onClick={showDialog}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Delete className="text-red-700 cursor-pointer" size={25} />

                    </button>
                    : <Button
                        type="button"
                        onClick={showDialog}
                        className="bg-red-700 hover:bg-red-800"
                    >
                        Delete
                    </Button>
            }

            <dialog
                ref={dialogRef}
                className="mx-auto my-auto p-4 rounded-md shadow-lg"
            >
                <div className="w-64">
                    <h3 className="font-medium mb-2">Delete {itemName}?</h3>
                    <p className="text-sm text-gray-600 mb-4">This action cannot be undone.</p>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={closeDialog}
                            className="px-3 py-1 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}