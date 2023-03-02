import { postData } from "../services/requests"; 

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]'); 

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highLight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor= "rgba(0,0,0, .7)";        
    }

    function blur(item) {
        item.closest('.file_upload').style.border = "none";
        item.closest('.file_upload').style.backgroundColor= "transparent";        
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => blur(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            const formData = new FormData();

            for (const prop in input.files) {
                formData.append(prop, input.files[prop]);
            }

            postData('assets/server.php', formData)
            .then(res => console.log(res));

            const fileName = input.files[0].name.split('.');

            let dots = fileName[0].length > 7 ? '...' : '.';

            let name = fileName[0].substr(0, 7) + dots + fileName[1];

            input.previousElementSibling.innerText = name;
        
        });
    });
};

export default drop;

// drag *
// dragend *
// dragenter - object above  dropArea
// dragexit *
// dragleave - object leaves dropArea
// dragover - object being carried over dropArea
// dragstart * 
// drop - object dropped into dropArea

// * - event fires on object being carried