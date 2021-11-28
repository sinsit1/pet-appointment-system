import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/form";
import Cita from "./components/cita";


function App() {

  // recuperamos las citas guardadas en localSttorage, sino  citas igual a []
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) citasIniciales = [];

  const [citas, guardarCitas] = useState(citasIniciales);

  // use effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    // es como el antiguo componentDidMount y componentDidUpdate, deprecados

    // si hay citas iniciales, cuando hay un update del componente, guardo en local las citas, o sino array vacio
    localStorage.setItem( 'citas', JSON.stringify( citas ) );

  }, [citas, citasIniciales]);

  const crearCita = cita => {

    // copio las citas que hayan, y le añado la nueva
    guardarCitas([...citas, cita])
  }

  const eliminarCita = id => {
    console.log(id);
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    guardarCitas(citasFiltradas);
  }

  return (<Fragment>
    <h1>Administrador de pacientes</h1>

    <div className="container">
      <div className="row">
        <div className="one-half">
          <Form
              crearCita={crearCita}
          />
        </div>
        <div className="one-half">
          <h2> {!citas.length ? <div>No hay citas</div> : <div>Administra tus citas</div>}</h2>

          {citas.map(cita => (<Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
          />))}
        </div>
      </div>
    </div>
  </Fragment>);
}

export default App;
