import React from "react";
import logo from "../../asset/logo.svg";
import imgPortada from "../../asset/imgPortada.png";
import Waver from "../../asset/Waver";

function HomeApp() {
  return <>

    <div className="flex flex-wrap justify-between">
      <img className="pb-60"
        src={logo} />
      <img
        className="flex-initial w-2/4"
        src={imgPortada}
        alt="Portada estimacion de software"
      />

    </div>
    <div className="m-10 -mt-52">
      <h1 className="text-5xl font-bold text-back">
        Software de estimación
        <br /> de costos para tus proyectos
      </h1>
      <p className=" p-2 text-2xl mt-2">
        Aumente la colaboración del equipo y haga que las estimaciones de su
        <br />
        proyecto sean más precisas que las hojas de cálculo propensas a
        errores.
      </p>

    </div>

    <footer className="container mx-auto">
      <Waver />
      <h4 className="text-white -mt-10 text-center ">
        2023 Nubeteck SRL | Politicas De Privacidad
      </h4>
    </footer>
  </>
}

export default HomeApp;
