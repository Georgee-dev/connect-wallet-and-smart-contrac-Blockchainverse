import React from 'react'

function ListaRegistro(props){

    // console.log(props.listarInformacionEstudios);

    const ListarEstudios = props.listarInformacionEstudios.map(item =>
            <div class="p-2 lg:w-1/4 md:w-1/2">
                        <div class="flex items-center border-gray-200 border p-4 rounded-lg">
                            {/* <img alt="team" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/84x84"/> */}
                            <div class="flex-grow">
                                
                                <h2 class="text-gray-900 title-font font-medium text-center text-lg mb-8"> 
                                    {item.lugarDeFormacion}
                                </h2>
                                
                                <div className='flex justify-around m-4'>
                                    <h2 class="text-gray-900 title-font font-medium">  {item.categoria} </h2>
                                    <h2 class="text-gray-900 title-font font-medium"> {item.tituloEstudio} </h2>
                                </div>

                                <div className='flex justify-around m-2'>
                                    <h2 class="text-gray-900 title-font font-medium"> {item.fechaInicio} </h2>
                                    <h2 class="text-gray-900 title-font font-medium"> {item.fechaFin} </h2>
                                </div>
                                
                                <h2 class="text-gray-900 title-font font-medium"> 
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore ipsam sed hic nemo facere laudantium, libero nisi doloremque autem natus ab voluptatum est.
                                </h2>
                                {/* <p class="text-gray-500">CTO</p> */}
                            </div>
                        </div>
                    </div>
      );



    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 mx-auto flex sm:flex-nowrap flex-wrap">
                <div class="flex flex-wrap -m-2">
                    {ListarEstudios}        
                </div>
            </div>
        </section>
    )
};

export default ListaRegistro;