import logo from "../../asset/logo.svg";
import imgPortada from "../../asset/imgPortada.png";
import Waver from "../../asset/Waver";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-white p-6">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <img src={logo} />
        </div>
        <div className="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-black-200 border-black-400 hover:text-blue hover:border-blue">
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            {/*  <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block font-medium lg:mt-0 text-black-200 hover:text-blue mr-4"
            >
              Conctatos
            </a>
            <a
              href="#responsive-header"
              className="block mt-4 lg:inline-block font-medium lg:mt-0 text-black-200 hover:text-blue mr-4"
            >
              Acerca de
            </a> */}

            <Link
              to="/login"
              className="inline-block font-medium rounded py-1 px-3 bg-sky-400 text-black"
            >
              Iniciar sesión
              <span className="inline-flex items-baseline m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="9"
                  viewBox="0 0 21 9"
                >
                  <g id="thermostat" transform="translate(0 9) rotate(-90)">
                    <path
                      id="Path_1308"
                      data-name="Path 1308"
                      d="M12,19a1,1,0,1,0-1-1A1,1,0,0,0,12,19Z"
                      transform="translate(-7.5 -1.8)"
                    />
                    <path
                      id="Path_1309"
                      data-name="Path 1309"
                      d="M14.2,13.409A4.867,4.867,0,0,1,16,17.227,4.642,4.642,0,0,1,11.5,22,4.642,4.642,0,0,1,7,17.227a4.867,4.867,0,0,1,1.8-3.818V3.864A2.785,2.785,0,0,1,11.5,1a2.785,2.785,0,0,1,2.7,2.864ZM12.4,3.864V14.527a2.859,2.859,0,0,1,1.8,2.7,2.785,2.785,0,0,1-2.7,2.864,2.785,2.785,0,0,1-2.7-2.864,2.859,2.859,0,0,1,1.8-2.7V3.864a.9.9,0,1,1,1.8,0Z"
                      transform="translate(-7 -1)"
                      fill-rule="evenodd"
                    />
                  </g>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <img
        className="fixed right-0 top-0  w-6/12"
        src={imgPortada}
        alt="Portada estimacion de software"
      />

      <div className="container mx-auto pl-9 mt-20">
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

      <footer className="container mx-auto relative ">
        <Waver />
        <h4 className="text-white absolute left-0 right-0 bottom-0 text-center  ">
          2023 Nubeteck SRL | Politicas De Privacidad
        </h4>
      </footer>
    </>
  );
}

export default Landing;
