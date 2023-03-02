const scrolling = (upSelector, hide = true) => {
    const upBtn = document.querySelectorAll(upSelector),
          element = document.documentElement,
          body = document.body;

    const showOnScroll = (upBtn) => {
        window.addEventListener('scroll', () => {
            let scrollTop = Math.round(element.scrollTop || body.scrollTop);
    
            if (scrollTop > window.screen.availHeight) {
                upBtn.style.display = "block";
                upBtn.style.opacity = 1;
            } else {
                upBtn.style.display = "none";
                upBtn.style.opacity = 0;            
            }
        });
    };

    // Request animation scroll

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            let widthTop = Math.round(element.scrollTop || window.pageYOffset),
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            const step = (time) => {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop + toBlock, widthTop - progress / speed) : Math.min(widthTop + toBlock, widthTop + progress / speed));

                document.documentElement.scrollTo(0, r);

                if (r != toBlock + widthTop) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            };

            requestAnimationFrame(step);
        });
    });

    // Pure JS scroll
    // const calcScroll = (btn) => {
    //     btn.addEventListener("click", function(e) {
    //         let scrollTop = Math.round(element.scrollTop || body.scrollTop);

    //         if (this.hash !== '') {
    //             e.preventDefault();

    //             let hashElement = document.querySelector(this.hash),
    //                 hashElementTop = 0;

    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }

    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {
    //     let delay = 1,
    //         prevScrollTop,
    //         speed;

    //     if (to < from) {
    //         speed = -30;
    //     } else {
    //         speed = 30;
    //     }

    //     let move = setInterval(() => {
    //         let scrollTop = Math.round(element.scrollTop || body.scrollTop);

    //         console.log(from, to, scrollTop);

    //         if (
    //             prevScrollTop === scrollTop ||
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) {
    //             clearInterval(move);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, "") + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, delay);
    // };

    upBtn.forEach(btn => {
        // if (btn.hash.slice(1) !== "") {
        //     calcScroll(btn);
        // }

        if (hide) {
            showOnScroll(btn);
        }
    });
};

export default scrolling;