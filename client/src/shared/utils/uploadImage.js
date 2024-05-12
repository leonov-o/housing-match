import $api from "@/shared/http/index.js";


export const uploadImage = async (selectedImage)=> {
    try {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await $api.post('/upload', formData);
            return response.data.image
        } else {
            console.warn('No image selected.');
        }
    } catch (error) {
        throw new Error(`Error uploading image: ${error}`)
    }
};
