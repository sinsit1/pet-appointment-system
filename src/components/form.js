import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

// destructuring para sacar crear cita de las props
const Form = ({ crearCita }) => {

  // state de citas
  const [cita, actualizarCita] = useState({
    mascota: '', propietario: '', fecha: '', hora: '', sintomas: ''
  });
  // state de error del form, y su funcion de actualizarlo
  const [error, actualizarError] = useState(false);

  // funcion actualizacion de state
  const actualizarState = e => {
    actualizarCita({
      ...cita, [e.target.name]: e.target.value
    })
  }

  // extraer valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // enviar cita
  const enviarCita = e => {
    e.preventDefault();

    // validaciones
    if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
      console.log('hay un error');
      actualizarError(true);
      return;
    }

    // eliminar mensaje error
    actualizarError(false);

    // asignar el ID
    cita.id = uuidv4(); // libreria que genera ids

    // crear la cita
    crearCita(cita);

    // reiniciar el form

    actualizarCita({ mascota: '', propietario: '', fecha: '', hora: '', sintomas: '' });

  }

  return (<Fragment>
    <h2>Crear cita</h2>
    {error ? <p className="alerta-error">Todos los campos son obligatios</p> : null}
    <form
        onSubmit={enviarCita}>
      <label>Nombre mascota</label>
      <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="nombre de mascota"
          onChange={actualizarState}
          value={mascota}
      />

      <label>Nombre dueño</label>
      <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="nombre de dueño de la mascota"
          onChange={actualizarState}
          value={propietario}

      />

      <label>Fecha</label>
      <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}

      />

      <label>Hora</label>
      <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}

      />

      <label>Sintomas</label>
      <textarea
          type="text"
          name="sintomas"
          className="u-full-width"
          onChange={actualizarState}
          value={sintomas}
      ></textarea>


      <button type="submit" className="u-full-width button-primary">Agregar cita</button>

    </form>
  </Fragment>);
}

Form.propTypes = {
  crearCita: PropTypes.func.isRequired
}


export default Form;
