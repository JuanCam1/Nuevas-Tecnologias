const modal = document.getElementById('miModal');
const flex = document.getElementById('flex');
const boxs = document.querySelectorAll('div.box');
const cerrar = document.getElementById('close');
const hrefHj = document.getElementById('href_hj');
const hrefCrud = document.getElementById('href_crud');

const links = [
    {
        name: 'viancha',
        rutahj: "./Viancha/HojaVida/HojaDeVida.html",
        rutacr: ""
    },
    {
        name: 'rojas',
        rutahj: "./Rojas/HojaVida/index.html",
        rutacr: "./Rojas/Crud/Crud.html"
    },
    {
        name: 'rincon',
        rutahj: "./Rincon/HojaVida/HojaDeVida.html",
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

