import { SupabaseClient } from "@supabase/supabase-js"
import supabasePublic from "../supabasePublic"

import { compressImage } from "@/utils/compressImage"


export const uploadImage = async (
    supabase: SupabaseClient<any, "public", any>,
    file: File,
    imagePath: string,
    bucket: string
) => {
    if (!supabase) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    if (!file || !file.type.startsWith("image/")) {
        throw new Error("Invalid image file")
    }

    const { compressedBuffer, fileType } = await compressImage(file)

    const { error } = await supabase
        .storage
        .from(bucket)
        .upload(imagePath, compressedBuffer, {
            cacheControl: "3600",
            contentType: fileType
        })

    if (error) {
        throw new Error(
            "Something went wrong while uploading the image: Make sure you are authenticated or try again later"
        )
    }
}


export const selectImage = async (imagePath: string, bucket: string) => {
    if (!imagePath) {
        return ""
    }

    const { data } = supabasePublic
        .storage
        .from(bucket)
        .getPublicUrl(imagePath)

    const checkIfImageExists = await fetch(data.publicUrl)

    if (checkIfImageExists.status === 200) {
        return data.publicUrl
    } else {
        return ""
    }
}


export const updateImage = async (
    supabase: SupabaseClient<any, "public", any>,
    file: File,
    imagePath: string,
    bucket: string
) => {
    if (!supabase) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    if (!file || !file.type.startsWith("image/")) {
        throw new Error("Invalid image file")
    }

    if (!imagePath) {
        throw new Error("Failed to fetch the image path: Try again later")
    }

    const { compressedBuffer, fileType } = await compressImage(file)

    const { error } = await supabase
        .storage
        .from(bucket)
        .upload(imagePath, compressedBuffer, {
            cacheControl: "3600",
            contentType: fileType,
            upsert: true
        })

    if (error) {
        throw new Error(
            "Something went wrong while updating the image: Make sure you are authenticated or try again later"
        )
    }
}


export const deleteImage = async (
    supabase: SupabaseClient<any, "public", any>,
    imagePath: string,
    bucket: string
) => {
    if (!supabase) {
        throw new Error("User is NOT authenticated: Sign up/sign in properly to be authenticated")
    }

    if (!imagePath) {
        throw new Error("Failed to fetch the image path: Try again later")
    }

    const { error } = await supabase
        .storage
        .from(bucket)
        .remove([imagePath])

    if (error) {
        throw new Error(
            "Something went wrong while deleting the image: Make sure you are authenticated or try again later"
        )
    }
}