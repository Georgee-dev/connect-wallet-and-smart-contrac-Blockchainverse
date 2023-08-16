
import React, { useState } from 'react'
import walletIcon from '../img/walletIcon.png';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Inicio(props){

    const MySwal = withReactContent(Swal);

    const [inicialEstadoFormulario, setinicialEstadoFormulario] = useState({
        lugar: "",
        categoria: "",
        titulo: "",
        fechaInicio: "",
        fechaFin: ""
    });

    const [formulario, setFormulario] = useState(inicialEstadoFormulario);

    const ManejarFormulario = ({ target: { name, value } }) => {
        setFormulario({ ...formulario, [name]: value });
    };

    const registrarInformacion = async (e) =>{
        e.preventDefault();

        console.log(formulario);
    
        // llamamos a nuestro smart contract y utilizamos el metodo/Function para crear nuestra tarea "crearRegistro"
        try {
            const result = await props.contract.methods.crearRegistro(
                formulario.categoria,
                formulario.fechaInicio,
                formulario.fechaFin,
                formulario.lugar,
                formulario.titulo
            ).send({from:props.account});

            console.log(result);
            console.log(result.events.RegistroCreado.returnValues);
            console.log(result.status);

            if(result.status){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tu registro fue exito',
                    showConfirmButton: false,
                    timer: 2500
                  })

                  setFormulario(setinicialEstadoFormulario);
            }else{
                errorTransacion();
            };
    
            
        } catch (error) {
            console.error(error);
            errorTransacion();
        };

    
    };

    const errorTransacion = () =>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡La transacción no fue completa, vuelve a intentar más tarde!!'
          })
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">

                    <div class="p-4 lg:w-1/2">
                        <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                            <img alt="team" class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={walletIcon} />
                            <div class="flex-grow sm:pl-8">

                                <div className='mb-3'>
                                    <h2 class="title-font font-medium text-lg text-gray-900">Direccion:</h2>
                                    <span class="text-gray-500 mb-3">{props.account != null ? props.account : ""}</span>
                                </div>

                                <div>
                                    <h2 class="title-font font-medium text-lg text-gray-900">Saldo:</h2>
                                    <h3 class="text-gray-500 mb-3"> {props.balance != null ? Number(props.balance).toFixed(4) : ""} ETH</h3>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='p-4 lg:w-1/2'>
                        <div className=" bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">

                            <form onSubmit={registrarInformacion}>
                                <div className="relative mb-4">
                                    <label for="formacion" className="leading-7 text-sm text-gray-600">Lugar de formacion</label>
                                    <input
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        type="text"
                                        id="lugar"
                                        name="lugar"
                                        onChange={ManejarFormulario}
                                        value={formulario.lugar}
                                    />
                                </div>

                                <div className="relative mb-4">
                                    <label for="categoria" className="leading-7 text-sm text-gray-600">categoria</label>
                                    <input
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        type="text"
                                        id="categoria"
                                        name="categoria"
                                        onChange={ManejarFormulario}
                                        value={formulario.categoria}
                                    />
                                </div>

                                <div className="relative mb-4">
                                    <label for="titulo" className="leading-7 text-sm text-gray-600">Titulo</label>
                                    <input
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        type="text"
                                        id="titulo"
                                        name="titulo"
                                        onChange={ManejarFormulario}
                                        value={formulario.titulo}
                                    />
                                </div>

                                <div className="relative mb-4">
                                    <label for="fechaInicio" className="leading-7 text-sm text-gray-600">Fecha de inicio</label>
                                    <input
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        type="text"
                                        id="fechaInicio"
                                        name="fechaInicio"
                                        onChange={ManejarFormulario}
                                        value={formulario.fechaInicio}
                                    />
                                </div>

                                <div className="relative mb-4">
                                    <label for="fechaFin" className="leading-7 text-sm text-gray-600">Fecha de finalizacion</label>
                                    <input
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        type="text"
                                        id="fechaFin"
                                        name="fechaFin"
                                        onChange={ManejarFormulario}
                                        value={formulario.fechaFin}
                                    />
                                </div>

                                <button
                                    type='submit'
                                    className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                    Registrar
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Inicio