const filter = () => {
    const menu = document.querySelector('#portfolio .portfolio-menu'),
          menuItems = menu.querySelectorAll('li'),
          tabItems = document.querySelectorAll('#portfolio .portfolio-block'),
          no = document.querySelector('#portfolio .portfolio-no'),
          types = ['all', 'lovers', 'chef', 'girl', 'guy', 'grandmother', 'granddad'];

    document.querySelector('#portfolio .portfolio-wrapper').style.justifyContent = "center";

    function animateTabs(menuItem, type) {
        menuItem.addEventListener("click", function(e) {
            menuItems.forEach(item => {
                item.classList.remove('active');
            });

            e.target.classList.add('active');

            typeFilter(type);
        });
    }

    const typeFilter = (type) => {
        no.style.display = "block";

        tabItems.forEach(item => {      
            item.style.display = "none";
            item.classList.remove("animated", "fadeIn");

            if (item.classList.contains(type)) {
                no.style.display = "none";
                item.classList.add("animated", "fadeIn");
                item.style.display = "block";
            } 
        });
    };

    types.forEach((type, i) => animateTabs(menuItems[i], type));
};

export default filter;