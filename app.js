const hkt_slider = document.getElementById('hkt_slider');
const hkt_slider_out = document.getElementById('hkt_slider_out');
const total_item = document.querySelectorAll(".hkt_slider_item").length;

var current_index = 0;
//var check_first = true;
//var check_second = true;
var dots_current = 1;
// set width
hkt_slider_out.style.width = `${total_item * 100}vw`;

// create dots
const hkt_dots = document.createElement("div");
hkt_dots.setAttribute('id', 'hkt_dots')
const ul = document.createElement('ul');
ul.setAttribute('id', 'hkt_dots_ul');
for (let index = 0; index < total_item; index++) {
    let li = document.createElement('li');
    li.setAttribute('class', 'hkt_dots_li');
    if (index == 0) {
        li.classList.add('active');
    }
    ul.appendChild(li);
}
hkt_dots.appendChild(ul);
hkt_slider.appendChild(hkt_dots);


// create nav
const hkt_nav = document.createElement('div');
hkt_nav.setAttribute('id', 'hkt_nav');
const hkt_next_dom = document.createElement('span');
const hkt_next_text = document.createTextNode(">>");
hkt_next_dom.setAttribute('id', 'hkt_next')
hkt_next_dom.appendChild(hkt_next_text);

const hkt_prev_dom = document.createElement('span');
const hkt_prev_text = document.createTextNode("<<");
hkt_prev_dom.setAttribute('id', 'hkt_prev')
hkt_prev_dom.appendChild(hkt_prev_text);

hkt_nav.appendChild(hkt_prev_dom);
hkt_nav.appendChild(hkt_next_dom);

hkt_slider.appendChild(hkt_nav);

// func transform with index

function hkt_tranform(index) {
    let value = `-${index * 100 * (1 / total_item)}%`;
    hkt_slider_out.style.transform = `translate3d(${value}, 0, 0)`;
}

//remove class from all class
function removeClass() {
    let all_li = Array.from(document.querySelectorAll('.hkt_dots_li'));
    all_li.forEach(element => {
        element.classList.remove('active');
    });
}

// set class active with index
function addClass(index) {
    let all_li = Array.from(document.querySelectorAll('.hkt_dots_li'));
    all_li.forEach((element, i) => {
        if (i == index) {
            element.classList.add('active');
        }
    });
}

// click dots
if (hkt_dots) {
    const hkt_dots_li = document.querySelectorAll('.hkt_dots_li');
    for (let index = 0; index < hkt_dots_li.length; index++) {
        hkt_dots_li[index].addEventListener("click", function (e) {
            e.preventDefault();
            if (!this.classList.contains('active')) {
                //remove class active from all
                removeClass();
                // add class active at current item
                this.classList.add('active');

                // set state current
                current_index = index;
                dots_current = (current_index + 1) < total_item ? current_index + 1 : 0;

                console.log("next-1-index " + current_index);
                console.log("next-1-dots " + dots_current);

                // slider transform
                hkt_tranform(index);
            }
        });
    }
}

const hkt_next = document.getElementById('hkt_next');
hkt_next.addEventListener('click', function () {
    if (current_index < total_item - 1) {
        current_index++;
        dots_current = dots_current < total_item - 1 ? dots_current + 1 : 0;
        hkt_tranform(current_index);
        removeClass();
        addClass(current_index);
    }
    console.log("next-1-index " + current_index);
    console.log("next-1-dots " + dots_current);
});

const hkt_prev = document.getElementById('hkt_prev');
hkt_prev.addEventListener('click', function () {
    // current_index--;
    if (current_index > 0) {
        current_index--;
        dots_current--;
        hkt_tranform(current_index);
        removeClass();
        addClass(current_index);
    }
    console.log("next-1-index " + current_index);
    console.log("next-1-dots " + dots_current);
});


// auto 
var interVal;
function run() {
    interVal = setInterval(function () {
        hkt_tranform(dots_current);
        removeClass();
        addClass(dots_current)
        current_index++;
        dots_current++;
        if (dots_current == total_item) {
            dots_current = 0;
        }
        if (current_index == total_item) {
            current_index = 0;
        }

        console.log("next-index = " + current_index);
        console.log("next-dots-index = " + dots_current);
    }, 3000);
}
run();


// hover hkt_slider
hkt_slider.addEventListener('mouseover', function () {
    clearInterval(interVal);
});
hkt_slider.addEventListener('mouseleave', function () {
    run();
});

