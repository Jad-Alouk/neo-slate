import sharp from 'sharp'


export const compressImage = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
        throw new Error('Invalid image file')
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let compressedBuffer

    switch (file.type) {
        case 'image/jpeg':
            compressedBuffer = await sharp(buffer)
                .resize({ width: 1024 })
                .jpeg({ quality: 80 })
                .toBuffer()
            break

        case 'image/jpg':
            compressedBuffer = await sharp(buffer)
                .resize({ width: 1024 })
                .jpeg({ quality: 80 })
                .toBuffer()
            break

        case 'image/png':
            compressedBuffer = await sharp(buffer)
                .resize({ width: 1024 })
                .png({ quality: 80 })
                .toBuffer()
            break

        case 'image/webp':
            compressedBuffer = await sharp(buffer)
                .resize({ width: 1024 })
                .webp({ quality: 80 })
                .toBuffer()
            break

        default:
            throw new Error('Unsupported image format')
    }

    return { compressedBuffer, fileType: file.type }
}
