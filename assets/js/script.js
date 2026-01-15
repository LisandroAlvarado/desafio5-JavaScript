let tareas = [
    { id: 1, descripcion: "Estudiar JavaScript", completado: false },
    { id: 2, descripcion: "Estudiar HTML", completado: false },
    { id: 3, descripcion: "Estudiar CSS", completado: false },
]

const listaDeTareas = document.getElementById("listaDeTareas")
const tareaInput = document.getElementById("tareaInput")
const btnAgregarTarea = document.getElementById("agregarTarea")
const totalTareas = document.getElementById("total")
const realizadasTareas = document.getElementById("realizados")

function renderTareas() {
    let html = `<li><strong>ID</strong> - <strong>Tarea</strong></li>`

    for (let tarea of tareas) {
        html += `
            <li>
                ${tarea.id} - ${tarea.descripcion}
                <input type="checkbox" data-id="${tarea.id}" ${tarea.completado ? "checked" : ""}>
                <button class="eliminar" data-id="${tarea.id}">Eliminar</button>
            </li>
        `
    }

    listaDeTareas.innerHTML = html

    totalTareas.textContent = tareas.length
    realizadasTareas.textContent = tareas.filter(item => item.completado).length

    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", (eventoCheckbox) => {
            const id = Number(eventoCheckbox.target.dataset.id)
            for (let tarea of tareas) {
                if (tarea.id === id) {
                    tarea.completado = eventoCheckbox.target.checked
                }
            }
            renderTareas()
        })
    })

    const botonesEliminar = document.querySelectorAll('.eliminar')
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (eventoBoton) => {
            const id = Number(eventoBoton.target.dataset.id)
            tareas = tareas.filter(item => item.id !== id)
            renderTareas()
        })
    })
}

btnAgregarTarea.addEventListener("click", () => {
    const nuevaTarea = tareaInput.value

    let contador = 0
    for (let tarea of tareas) {
        if (tarea.id > contador) contador = tarea.id
    }

    tareas.push({
        id: contador + 1,
        descripcion: nuevaTarea,
        completado: false
    })
    renderTareas()
})

renderTareas()

