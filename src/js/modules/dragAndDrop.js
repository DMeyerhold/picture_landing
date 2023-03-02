const dragAndDrop = () => {
    const drops = document.querySelectorAll('.file_upload'),
          inputs = document.querySelectorAll('[name="upload"]');

    ['drop', 'dragenter', 'dragleave', 'dragover'].forEach(event => {
        inputs.forEach(drop => drop.addEventListener(event, preventDefaults, false));
    });

    ['dragenter', 'dragover'].forEach(event => {
        inputs.forEach(drop => {
            drop.addEventListener(event, () => {
                highlight(drop);
            }, false);
        });
    });

    ['drop', 'dragleave'].forEach(event => {
        inputs.forEach(drop => {
            drop.addEventListener(event, () => {
                hideHighlight(drop);
            }, false);
        });
    });

    drops.forEach(drop => {
        drop.addEventListener('mouseenter', () => {
            showInteractiveItem(drop);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function showInteractiveItem(item) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: absolute;
            bottom: -2px;
            width: 153px;
            line-height: 15px;
            left: -16px;
            color: rgb(197, 26, 187);
            text-align: center;
        `;

        message.innerText = 'Поместите в область фото';
        message.classList.add('message');
                
        if (
            item.querySelector('[name="upload"]').files.length < 1 &&
            item.querySelector('.message') === null    
        ) {
            item.append(message);
            setTimeout(() => message.remove(), 2000);
        }
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = "3px solid #61245e";
        item.closest('.file_upload').style.backgroundColor = "#d9b5dd";
    }

    function hideHighlight(item) {
        item.closest('.file_upload').style.border = "none";
        item.closest('.file_upload').style.backgroundColor = "transparent";
    }

    inputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            const fd = new FormData();

            for (let prop in input.files) {
                fd.append(prop, input.files[prop]);
            }

            fetch('assets/server.php', {
                method: "POST",
                body: fd
            })
            .then(data => data.text())
            .then(res => console.log(res))
            .catch(e => console.error(e));

            let fileName = input.files[0].name;
            let dots = fileName.length > 7 ? '...' : '.';

            fileName = fileName.split('.');

            input.previousElementSibling.textContent = fileName[0].slice(0, 7) + dots + fileName[1];
        });
    });
};

export default dragAndDrop;