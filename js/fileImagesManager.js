const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const filenameInput = document.getElementById('filenameInput');
const getImageBtn = document.getElementById('getImageBtn');
const resetBtn = document.getElementById('resetBtn');

let selectedFile = null;

uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        selectedFile = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            previewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
        fileInput.value = '';
    }
});

getImageBtn.addEventListener('click', () => {
    if (!selectedFile) {
        alert('No image selected!');
        return;
    }

    const newFilename = filenameInput.value.trim();
    if (!newFilename) {
        alert('Please enter a new filename.');
        return;
    }

    const formData = new FormData();
    const renamedFile = new File([selectedFile], newFilename, { type: selectedFile.type });
    formData.append('image', renamedFile);

    console.log('FormData:', formData.get('image'));

    alert(`Image with new filename "${newFilename}" prepared!`);
});

resetBtn.addEventListener('click', () => {
    fileInput.value = '';
    selectedFile = null;
    imagePreview.src = '';
    previewContainer.style.display = 'none';
    filenameInput.value = '';
});


async function createPreviewImg(previewImgElt, inputFileElt, formDataMediator, formDataImgKey) {
    const file = inputFileElt.files[0];

    if (file) {
        // 1. Create a Blob from the file
        const blob = new Blob([file], { type: file.type });

        // 2. Generate a URL from the Blob
        const blobUrl = URL.createObjectURL(blob);

        // 3. Preview the image using the Blob URL
        previewImgElt.src = blobUrl;
        previewImgElt.alt = 'Обране Зображення не завнтажене';

        // 4. Add the Blob to FormData
        formDataMediator.append(`${formDataImgKey}`, blob, file.name);

        // 6. Clean up the Blob URL
        imgPreview.onload = () => URL.revokeObjectURL(blobUrl);
    } else {
        console.error('No file selected');
    }
}