const hover = () => {
    const blocks = document.querySelectorAll('section.sizes .sizes-block');

    function showImg (block) {
        const img = block.querySelector('img');

        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => p.style.visibility = "hidden");
        img.src = `${img.src.slice(0, -4)}-1.png`; 
    }

    function hideImg (block) {
        const img = block.querySelector('img');

        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => p.style.visibility = "visible");
        img.src = `${img.src.slice(0, -6)}.png`;         
    }

    blocks.forEach(item => {
        item.addEventListener('mouseover', () => showImg(item));
        item.addEventListener('mouseout', () => hideImg(item));
    });
};

export default hover;