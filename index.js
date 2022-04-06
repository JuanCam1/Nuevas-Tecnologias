const modal = document.getElementById('miModal');
const flex = document.getElementById('flex');
const boxs = document.querySelectorAll('div.box');
const cerrar = document.getElementById('close');
const hrefHj = document.getElementById('href_hj');
const hrefCrud = document.getElementById('href_crud');

const links = [
    {
        name: 'viancha',
        rutahj: "http://127.0.0.1:5501/Viancha/Hoja%20de%20vida/HojaDeVida.html",
        rutacr: ""
    },
    {
        name: 'rojas',
        rutahj: "http://127.0.0.1:5501/Rojas/Hoja%20de%20vida/index.html",
        rutacr: ""
    },
    {
        name: 'rincon',
        rutahj: "http://127.0.0.1:5501/Rojas/Hoja%20de%20vida/index.html",
        rutacr: ""
    },
    {
        name: 'diaz',
        rutahj: "http://127.0.0.1:5501/Rojas/Hoja%20de%20vida/index.html",
        rutacr: ""
    }
]

function selectedBox(event){
    let box = this.targer;
}

boxs.forEach(box => box.addEventListener('click', () => {
    modal.style.display = 'block';
    console.log(box.id);
    let boxNum = box.id;
    const num = boxNum.slice(3,4);
    console.log(num)

    hrefHj.addEventListener('click',() => {
        hrefHj.setAttribute('href',links[num - 1].rutahj);
    })

    hrefCrud.addEventListener('click',() => {
        hrefCrud.setAttribute('href',links[num - 1].rutacr);
    })
}))



cerrar.addEventListener('click', function(){
    modal.style.display = 'none';
});

window.addEventListener('click', function(e){
    console.log(e.target);
    if(e.target == flex){
        modal.style.display = 'none';
    }
});

