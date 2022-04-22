citaOjb = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
  id: "",
};

miStorage = window.localStorage;

let editando = false;
addEventListener();

function addEventListener() {
  mascota.addEventListener("change", datosCita);
  propietario.addEventListener("change", datosCita);
  telefono.addEventListener("change", datosCita);
  fecha.addEventListener("change", datosCita);
  hora.addEventListener("change", datosCita);
  sintomas.addEventListener("change", datosCita);

  formulario.addEventListener("submit", nuevaCita);
}

function datosCita(e) {
  citaOjb[e.target.name] = e.target.value;
}

class UI {
  imprimirCitas(citas) {
    this.limpiarhtml();
    console.log(citas);
    if (citas != null) {
      citas.forEach((cita) => {
        const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
          cita;

        const divCita = document.createElement("div");
        divCita.classList.add("cita", "p-3");
        divCita.dataset.id = id;

        const mascotaParrafo = document.createElement("h2");
        mascotaParrafo.classList.add("card-title", "font-weight-bolder");
        mascotaParrafo.textContent = mascota;

        const propietarioParrafo = document.createElement("p");
        propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propieatario: </span> ${propietario}`;

        const telefonoParrafo = document.createElement("p");
        telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`;

        const fechaParrafo = document.createElement("p");
        fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

        const horaParrafo = document.createElement("p");
        horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`;

        const sintomasParrafo = document.createElement("p");
        sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "border-0", "btn-danger", "mr-2");
        btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>`;

        btnEliminar.onclick = () => eliminarCita(id);

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "border-0", "btn-info", "mr-2");
        btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>`;

        btnEditar.onclick = () => cargarEdicion(cita);

        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);

        contenedor_citas.appendChild(divCita);
      });
    }
  }

  limpiarhtml() {
    while (contenedor_citas.firstChild) {
      contenedor_citas.removeChild(contenedor_citas.firstChild);
    }
  }
}

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(nueva_cita) {
    console.log(this.citas);
    console.log(nueva_cita);
    this.citas = [...this.citas, nueva_cita];

    miStorage.setItem("Citas", JSON.stringify(this.citas));
  }

  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
    miStorage.setItem("Citas", JSON.stringify(this.citas));
  }

  editarCita(citaactualizada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaactualizada.id ? citaactualizada : cita
    );
    miStorage.setItem("Citas", JSON.stringify(this.citas));
  }
}

const administrarCitas = new Citas();
const ui = new UI();

function nuevaCita(e) {
  e.preventDefault();
  const { mascota, propietario, telefono, fecha, hora, sintoma } = citaOjb;

  if (!editando) {
    citaOjb.id = Date.now();
    administrarCitas.agregarCita({ ...citaOjb });

    Swal.fire({
      title: "Cita creada!",
      text: "Cita registrada",
      icon: "success",
    });
  } else {
    administrarCitas.editarCita({ ...citaOjb });
    Swal.fire("La cida ha sido editada", "", "success");

    btn_confirmar.textContent = "Crear cita";
    editando = false;
  }

  reiniciarObjeto();
  formulario.reset();
  ui.imprimirCitas(JSON.parse(miStorage.getItem("Citas")));
}

function reiniciarObjeto() {
  (citaOjb.mascota = ""),
    (citaOjb.propietario = ""),
    (citaOjb.telefono = ""),
    (citaOjb.fecha = ""),
    (citaOjb.hora = ""),
    (citaOjb.sintomas = "");
}

function eliminarCita(id) {
  administrarCitas.eliminarCita(id);

  Swal.fire("La cida ha sido eliminada", "", "success");

  ui.imprimirCitas(JSON.parse(miStorage.getItem("Citas")));
}

function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  this.mascota.value = mascota;
  this.propietario.value = propietario;
  this.telefono.value = telefono;
  this.fecha.value = fecha;
  this.hora.value = hora;
  this.sintomas.value = sintomas;

  citaOjb.mascota = mascota;
  citaOjb.propietario = propietario;
  citaOjb.telefono = telefono;
  citaOjb.fecha = fecha;
  citaOjb.hora = hora;
  citaOjb.sintomas = sintomas;
  citaOjb.id = id;

  btn_confirmar.textContent = "Guardar cambios";

  editando = true;
}

ui.imprimirCitas(JSON.parse(miStorage.getItem("Citas")));
