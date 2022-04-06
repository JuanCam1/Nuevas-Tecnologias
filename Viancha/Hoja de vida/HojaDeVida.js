window.onscroll = function() {
    var y = window.scrollY;
    if (y >= 172) {
        return_init.style.display = 'block';
    } else {
        return_init.style.display = 'none';
    }

}


const navegation = () => {

    let view = alterno.style.display;
    if (view == 'none' || view == '') {
        alterno.style.display = 'block';
    } else {
        alterno.style.display = 'none';
    }
}