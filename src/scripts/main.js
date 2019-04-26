/**MENU**/
$(function () {
    $('.toggleBtn').on("click", function () {
        $('.myHeader-content-head-menu').slideToggle(300, function () {
            if ($(this).css('display') === "none") {
                $(this).removeAttr('style');
            }
        })
    })
});

window.onload = function () {
    if (window.location.pathname === '/zhuzhuzhu.html') {
        (function () {
            var block = document.querySelector('.myHeader-content-center');
            var logo = document.getElementById('logoZhu');

            block.innerHTML = '';
            // var inputLogo = logo.cloneNode(true);
            // inputLogo.removeAttribute('style');
            // block.appendChild(inputLogo);
        }());
    }
    // if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '' || window.location.pathname !=='/zhuzhuzhu.html') {}
    /**What We Do MODAL PAGE**/
    (function () {
        var block = document.getElementById('wedo'),
            modal = document.querySelector('.weDo-modal'),
            pic = document.querySelector('.weDo-modal-container-pic'),
            text = document.querySelector('.weDo-modal-container-text'),
            wrapper = document.querySelector('.weDo-modal-container-modalWrap');
        var timeoutOf = true;

        block.addEventListener('click', function (e) {
            if (timeoutOf) {
                if (e.target.tagName.toLowerCase() === 'button' && hasClass(e.target, 'openModalBtn') ) {
                    modal.style.display = 'block';
                    if (hasClass(e.target, 'openModalBtn-zhu')) {
                        pic.src = 'img/beeModal.jpg';
                        pic.alt = 'Zhu-zhu-Zhuliv, Жуків, мед, фестиваль';
                        text.innerHTML = document.querySelector('.helpText-zhu').innerHTML;
                    } else if (hasClass(e.target, 'openModalBtn-roof')) {
                        pic.src = 'img/roof.jpg';
                        pic.alt = 'Zhuliv, Жуків, школа';
                        text.innerHTML = document.querySelector('.helpText-roof').innerHTML;
                    } else if (hasClass(e.target, 'openModalBtn-childPlace')) {
                        pic.src = 'img/publickModal.jpg';
                        pic.alt = 'Zhuliv, Жуків';
                        text.innerHTML = document.querySelector('.helpText-childPlace').innerHTML;
                    }
                    timeoutOf = false;
                    setTimeout(function () {
                        var height = parseInt(getComputedStyle(wrapper).height);
                        modal.children[0].style.height = height + 'px';
                        timeoutOf = true;
                    },300);
                } else if ((e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'span') && hasClass(e.target, 'closeModalBtn') ) {
                    modal.children[0].style.height = '0px';
                    timeoutOf = false;
                    setTimeout(function () {
                        modal.style.display = 'none';
                        timeoutOf = true;
                    },300);
                }
            }
        });
    }());

    /**Isotope**/
    /**USING GALLERY**/
    (function () {
        var btnList = document.querySelector('.moments-listBtn');
        var $grid =  $('.moments-gallery');
        var listCategory = [
            'all',
            'fiesta',
            'build',
            'placeChild'
        ];
        var listAddSlides = [
            {
                address: 'img/gallery-11-small.jpg',
                category: 'fiesta'
            },
            {
                address: 'img/gallery-12-small.jpg',
                category: 'fiesta'
            },
            {
                address: 'img/gallery-13-small.jpg',
                category: 'fiesta'
            },
            {
                address: 'img/gallery-14-small.jpg',
                category: 'fiesta'
            },
            {
                address: 'img/gallery-7-small.jpg',
                category: 'fiesta'
            },
            {
                address: 'img/gallery-2-small.jpg',
                category: 'fiesta'
            },
            {
                address: 'img/gallery-17-small.jpg',
                category: 'build'
            },
            {
                address: 'img/gallery-18-small.jpg',
                category: 'build'
            },
            {
                address: 'img/gallery-20-small.jpg',
                category: 'placeChild'
            },
            {
                address: 'img/gallery-21-small.jpg',
                category: 'placeChild'
            },
            {
                address: 'img/gallery-22-small.jpg',
                category: 'placeChild'
            },
            {
                address: 'img/gallery-10-small.jpg',
                category: 'fiesta'
            }
        ];
        var gallery = document.querySelector('.moments'),
            modalSlider = document.querySelector('.modalSlider'),
            pic = document.querySelector('.modalSlider-container-pic'),
            gallerySlides = document.querySelector('.moments-gallery'),
            activeLiGallery,
            titerIsOf = true,
            moveSlideProccessOf = true;
            countNewSlides = 0;
        var baseX = 0;

        $grid.isotope({
            // options
            itemSelector: '.moments-gallery-item',
            layoutMode: 'fitRows'
        });
        btnList.addEventListener('click', function (e) {
            if (e.target.tagName.toLowerCase() === 'li') {
                var li = e.target;
                if (hasClass(li, 'all')) {
                    $grid.isotope({ filter: '*'});
                    var active = document.querySelector('.activeBtn');
                    active.classList.remove('activeBtn');
                    li.classList.add('activeBtn');
                } else {
                    for (var i=0; i < listCategory.length; i++) {
                        if (hasClass(li, listCategory[i])) {
                            $grid.isotope({ filter:  '.'+listCategory[i]});
                            var active = document.querySelector('.activeBtn');
                            active.classList.remove('activeBtn');
                            li.classList.add('activeBtn');
                            break;
                        }
                    }
                }
            }
        });

        gallery.addEventListener('click', clickPc);

        modalSlider.addEventListener('touchmove', function (e) {
            if (moveSlideProccessOf) {
                if (baseX - e.touches[0].pageX < -50) {
                    if (activeLiGallery.previousElementSibling) {
                        moveSlideProccessOf = false;
                        previousPicture(activeLiGallery.previousElementSibling);
                    }
                }
                if (baseX - e.touches[0].pageX > 50) {
                    if (activeLiGallery.nextElementSibling) {
                        moveSlideProccessOf = false;
                        nextPicture(activeLiGallery.nextElementSibling);
                    }
                }
            }
        });
        modalSlider.addEventListener('touchstart', function (e) {
            moveSlideProccessOf = true;
            baseX = e.touches[0].pageX;
        });
        modalSlider.addEventListener('touchend', function (e) {
            moveSlideProccessOf = true;
            baseX = 0;
        });
        modalSlider.addEventListener('touchcancel', function (e) {
            moveSlideProccessOf = true;
            baseX = 0;
        });



        function getTag(el, tag) {
            if (el.tagName.toLowerCase() === tag.toLowerCase()) {
                return el;
            } else if (el.tagName.toLowerCase() === 'body') {
                return null;
            } else {
                return getTag(el.parentElement, tag);
            }
        }
        function clickPc(e) {
            if (titerIsOf) {
                if ((e.target.tagName.toLowerCase() === 'span' && hasClass(e.target, 'glyphicon-zoom-in') ) || (e.target.tagName.toLowerCase() === 'div' && hasClass(e.target, 'moments-gallery-item-hover'))) {
                    activeLiGallery = getTag(e.target, 'li');
                    var index = activeLiGallery.children[0].children[0].src.indexOf('gallery');
                    var addressPic = activeLiGallery.children[0].children[0].src.slice(index);
                    var parts = addressPic.split('-');
                    pic.src = 'img/'+parts[0] +'-'+ parts[1] + '.jpg';
                    pic.style.maxWidth = 0;
                    modalSlider.style.display = 'block';
                    titerIsOf = false;
                    setTimeout(function () {
                        pic.removeAttribute('style');
                        titerIsOf = true;
                    },200);
                } else if (hasClass(e.target, 'closeModalSliderBtn')) {
                    pic.style.maxWidth = 0;
                    titerIsOf = false;
                    setTimeout(function () {
                        modalSlider.style.display = 'none';
                        titerIsOf = true;
                    },200);
                } else if ((e.target.tagName.toLowerCase() === 'span' || e.target.tagName.toLowerCase() === 'button') && (hasClass(e.target, 'modalSlider-container-btnMove_right') ||  hasClass(e.target,'glyphicon-arrow-right'))) {
                    if (activeLiGallery.nextElementSibling) {
                        nextPicture(activeLiGallery.nextElementSibling);
                    }
                } else if ((e.target.tagName.toLowerCase() === 'span' || e.target.tagName.toLowerCase() === 'button') && (hasClass(e.target, 'modalSlider-container-btnMove_left') ||  hasClass(e.target,'glyphicon-arrow-left'))) {
                    if (activeLiGallery.previousElementSibling) {
                        previousPicture(activeLiGallery.previousElementSibling);
                        // activeLiGallery = activeLiGallery.previousElementSibling;
                        // var parts = activeLiGallery.children[0].children[0].src.split('-');
                        // pic.src = 'img/'+parts[0] +'-'+ parts[1] + '.jpg';
                    }
                } else if ((e.target.tagName.toLowerCase() === 'span' || e.target.tagName.toLowerCase() === 'button') &&  hasClass(e.target, 'moments-btn-more')) {
                    if (countNewSlides < listAddSlides.length ) {
                        var countNew = (listAddSlides.length - countNewSlides) >= 5 ? 5 : (listAddSlides.length - countNewSlides);
                        for (var i = 0 ; i < countNew; i++ ) {
                            var newSlide = gallerySlides.children[0].cloneNode(true);
                            newSlide.classList.remove('fiesta');
                            newSlide.classList.add(listAddSlides[countNewSlides].category);
                            newSlide.children[0].children[0].src = listAddSlides[countNewSlides].address;
                            $grid.append( newSlide ).isotope( 'appended', newSlide );

                            countNewSlides++;
                        }
                        titerIsOf = false;
                        setTimeout(function () {
                            $grid.isotope({ filter: '*'});
                            gallery.style.width = 'auto';
                            titerIsOf = true;
                        }, 100);
                    }
                }
            }
        };
        function nextPicture(next) {
            if (hasClass(document.querySelector('.activeBtn'), 'all')) {
                activeLiGallery = next;
                var index = activeLiGallery.children[0].children[0].src.indexOf('gallery');
                var addressPic = activeLiGallery.children[0].children[0].src.slice(index);
                var parts = addressPic.split('-');
                pic.src = 'img/'+parts[0] +'-'+ parts[1] + '.jpg';
            } else {
                var activeType = hasClass(document.querySelector('.activeBtn'), 'fiesta')? 'fiesta': hasClass(document.querySelector('.activeBtn'), 'build')? 'build' : 'placeChild';
                if (hasClass(next, activeType)) {
                    activeLiGallery = next;
                    var index = activeLiGallery.children[0].children[0].src.indexOf('gallery');
                    var addressPic = activeLiGallery.children[0].children[0].src.slice(index);
                    var parts = addressPic.split('-');
                    pic.src = 'img/'+parts[0] +'-'+ parts[1] + '.jpg';
                } else if (next.nextElementSibling) {
                    nextPicture(next.nextElementSibling);
                }
            }
        }
        function previousPicture(previous) {
            if (hasClass(document.querySelector('.activeBtn'), 'all')) {
                activeLiGallery = previous;
                var index = activeLiGallery.children[0].children[0].src.indexOf('gallery');
                var addressPic = activeLiGallery.children[0].children[0].src.slice(index);
                var parts = addressPic.split('-');
                pic.src = 'img/'+parts[0] +'-'+ parts[1] + '.jpg';
            } else {
                var activeType = hasClass(document.querySelector('.activeBtn'), 'fiesta')? 'fiesta': hasClass(document.querySelector('.activeBtn'), 'build')? 'build' : 'placeChild';
                if (hasClass(previous, activeType)) {
                    activeLiGallery = previous;
                    var index = activeLiGallery.children[0].children[0].src.indexOf('gallery');
                    var addressPic = activeLiGallery.children[0].children[0].src.slice(index);
                    var parts = addressPic.split('-');
                    pic.src = 'img/'+parts[0] +'-'+ parts[1] + '.jpg';
                } else if (previous.previousElementSibling) {
                    previousPicture(previous.previousElementSibling);
                }
            }
        }
    }());

    /**Partners  Slider**/
    (function () {

        var line = document.querySelector('.partners-slider-line');
        var widthSlide = 0;
        var isTimeout = false;

        if (line) {
            initialization();
        }

        function initialization() {
            widthSlide = parseInt(getComputedStyle(line.lastElementChild).width);
            var currentLeft = -(widthSlide+17);
            for (var i = 0; i < line.children.length; i++ ) {
                line.children[i].style.left = currentLeft+'px';
                currentLeft = currentLeft + widthSlide + 34;
            }
            setTimeout(function () {
                steps();
            }, 2000);
        }
        function steps() {
            if (!isTimeout) {
                var firstChild = line.firstElementChild.cloneNode(true);
                firstChild.style.left = line.lastElementChild.style.left;
                for (var i = 0; i < line.children.length; i++ ) {
                    line.children[i].style.left = ( parseInt( getComputedStyle(line.children[i]).left ) - (widthSlide+34) ) + 'px';
                }
                isTimeout = true;
                setTimeout(function () {
                    line.appendChild(firstChild);
                    line.firstElementChild.remove();
                    isTimeout = false;
                }, 100);
                setTimeout(function () {
                    steps();
                }, 2000);
            } else {
                isTimeout = false;
                setTimeout(function () {
                    steps();
                }, 2000);
            }
        }
    }());

    /**changeOldPhoto**/
    (function () {
        var list = document.querySelector('.history-cards-list');
        var cards = document.querySelector('.history-cards'),
            btnList = document.querySelector('.history-listBtn');
        var currentEl;
        var count = 0;
        var widthSlide = 662;
        var dataBase = {
            gynovychi: [
                {
                    src: 'img/history-hinowice-1.jpg',
                    srcNew: 'img/history-hinowice-1-new.jpg',
                    alt: 'Гиновичі старі фотографії (Підлісне, Жуків)'
                },
                {
                    src: 'img/history-hinowice-2.jpg',
                    srcNew: 'img/history-hinowice-2-new.jpg',
                    alt: 'Гиновичі старі фотографії (Підлісне, Жуків)'
                }
            ],
            wildwild: [

            ],
            zhuk: [
                {
                    src: 'img/history-zhukiv-1.jpg',
                    srcNew: 'img/history-zhukiv-1-new.jpg',
                    alt: 'Жуків старі фотографії (Підлісне, Гиновичі)'
                },
                {
                    src: 'img/history-zhukiv-2.jpg',
                    srcNew: 'img/history-zhukiv-2-new.jpg',
                    alt: 'Жуків старі фотографії (Підлісне, Гиновичі)'
                },
                {
                    src: 'img/history-zhukiv-3.jpg',
                    srcNew: 'img/history-zhukiv-3-new.jpg',
                    alt: 'Жуків старі фотографії (Підлісне, Гиновичі)'
                },
                {
                    src: 'img/history-zhukiv-4.jpg',
                    srcNew: 'img/history-zhukiv-4-new.jpg',
                    alt: 'Жуків старі фотографії (Підлісне, Гиновичі)'
                },
                {
                    src: 'img/history-zhukiv-5.jpg',
                    srcNew: 'img/history-zhukiv-5-new.jpg',
                    alt: 'Жуків старі фотографії (Підлісне, Гиновичі)'
                },
                {
                    src: 'img/history-zhukiv-6.jpg',
                    srcNew: 'img/history-zhukiv-6-new.jpg',
                    alt: 'Жуків старі фотографії (Підлісне, Гиновичі)'
                },
                {
                    src: 'img/history-zhukiv-7.jpg',
                    srcNew: 'img/history-zhukiv-7-new.jpg',
                    alt: 'Жуків старі фотографії (Підлісне, Гиновичі)'
                },
                {
                    src: 'img/history-zhukiv-8.jpg',
                    srcNew: 'img/history-zhukiv-8-new.jpg',
                    alt: 'Жуків старі фотографії (Підлісне, Гиновичі)'
                }
            ]
        };
        var proto = list.children[0].cloneNode(true);

        setTimeout(initialization, 200);

        btnList.addEventListener('click', setVillage);

        cards.addEventListener('click', function (e) {
            if (e.target.tagName.toLowerCase() === 'button' ||  e.target.tagName.toLowerCase() === 'span') {
                var btn = e.target.tagName.toLowerCase() === 'button'? e.target : e.target.parentElement ;

                if (hasClass(btn, 'history-cards-btn_next')) {
                    moveNext();
                } else if (hasClass(btn, 'history-cards-btn_previous')) {
                    movePrevious()
                }
            }
        });

        list.addEventListener('mousemove', function (e) {
            // console.log(e.offsetX);
            if (e.target.tagName.toLowerCase() === 'ul') {
                return;
            } else {
                var el = getMyLi(e.target);
                if (el) {
                    if (hasClass(el, 'activeOldPhoto')) {
                        el.children[1].style.width = e.offsetX+'px';
                        currentEl = el.children[1];
                    }
                }
            }
        });

        list.addEventListener('mouseleave', function () {
            if (currentEl) {
                currentEl.style.width = 100+'%' ;
                setTimeout(function () {
                    currentEl.removeAttribute('style');
                }, 200);
            }
        });

        function initialization() {
            list.classList.remove('history-cards-list');
            list.classList.add('history-cards-list');
            moveNext();
        }

        function moveNext() {
            if (count+1 < list.children.length) {
                widthSlide = parseInt(getComputedStyle(list.children[0]).width);
                count++;
                list.style.marginLeft = (-count * widthSlide) + 'px';
                setActive();
            }
        }
        function movePrevious() {
            if (count > 0) {
                widthSlide = parseInt(getComputedStyle(list.children[0]).width);
                count--;
                list.style.marginLeft = (-count * widthSlide) + 'px';
                setActive();
            }
        }
        function setActive() {
            document.querySelector('.activeOldPhoto').classList.remove('activeOldPhoto');
            list.children[count].classList.add('activeOldPhoto');
        }
        function getMyLi(el) {
            if (el.tagName.toLowerCase() === 'li') {
                return el;
            } else if (el.tagName.toLowerCase() === 'body' || el.tagName.toLowerCase() === 'ul') {
                return null;
            } else {
                return getMyLi(el.parentElement);
            }
        }

        function setVillage(e) {
            if (e.target.tagName.toLowerCase() === 'li') {
                document.querySelector('.ActiveVillage').classList.remove('ActiveVillage');
                e.target.classList.add('ActiveVillage');
                var tgVillage = hasClass(e.target, 'gynovychi') ? 'gynovychi' : hasClass(e.target, 'wildwild') ? 'wildwild' : 'zhuk';
                var len = list.children.length;
                for (var i = 0; i < len; i++) {
                    list.removeChild(list.lastElementChild);
                }
                for (var i = 0; i < dataBase[tgVillage].length; i++) {
                    var newItem = proto.cloneNode(true);
                    newItem.children[0].children[0].src = dataBase[tgVillage][i].srcNew;
                    newItem.children[0].children[0].alt = dataBase[tgVillage][i].alt;
                    newItem.children[1].children[0].src = dataBase[tgVillage][i].src;
                    newItem.children[1].children[0].alt = dataBase[tgVillage][i].alt;
                    list.appendChild(newItem);
                }
                list.style.marginLeft = 0+'px';
                count = 0;
                if (document.querySelector('.activeOldPhoto')) {
                    document.querySelector('.activeOldPhoto').classList.remove('activeOldPhoto');
                }
                if (list.children[count]) {
                    list.children[count].classList.add('activeOldPhoto');
                }
            }
        }

    } ());
};

function hasClass(el, cls) {
    for (var i = 0; i < el.classList.length ; i++) {
        if (el.classList[i] === cls) {
            return true;
        }
    }
    return false;
}

/**Page ZHU-ZHU-ZHU**/
// (function () {
//     var bee = document.getElementById('bee');
//     var header = document.querySelector('.myHeader');
//     var elem = document;
//
//     if (elem.addEventListener) {
//         if ('onwheel' in document) {
//             // IE9+, FF17+, Ch31+
//             elem.addEventListener("wheel", onWheel);
//         } else if ('onmousewheel' in document) {
//             // устаревший вариант события
//             elem.addEventListener("mousewheel", onWheel);
//         } else {
//             // Firefox < 17
//             elem.addEventListener("MozMousePixelScroll", onWheel);
//         }
//     } else { // IE8-
//         elem.attachEvent("onmousewheel", onWheel);
//     }
//
//     function onWheel(e) {
//         var hHead = parseInt( getComputedStyle(header).height);
//         var difference = (e.pageY - hHead);
//        if ( difference > 0  ) {
//            bee.style.top = (e.pageY-hHead)+'px';
//            console.log(e);
//        } else {
//            bee.style.top = (15)+'px';
//        }
//     }
//
// }());


/**PHOTOS  Slider**/
/**не підходить до партнерів! Рекомендовано до фото фесту - ефектніше**/

// (function () {
//     var show = document.querySelector('.partners-slider');
//     var line = document.querySelector('.partners-slider-line'),
//         widthLine = 0,
//         widthSlides = [];
//     var step = 0;
//
//     initialization();
//
//     function initialization() {
//         for (let i=0; i < line.children.length; i++ ) {
//             var w = parseInt(getComputedStyle(line.children[i]).width);
//             widthLine = widthLine + w;
//             widthSlides.push(w);
//         }
//         line.style.width = widthLine+'px';
//     }
//
//     function steps() {
//         if (step+1 <= widthSlides.length ) {
//             console.log('1');
//             if ( (parseInt(getComputedStyle(line).width) - (Math.abs( parseInt(getComputedStyle(line).left)) + widthSlides[step+1] ) ) >=  parseInt(getComputedStyle(show).width) ) {
//                 console.log('2');
//                 line.style.left = (-(Math.abs( parseInt(getComputedStyle(line).left)) + widthSlides[step+1])) + 'px';
//             }
//         }
//     }
// }());