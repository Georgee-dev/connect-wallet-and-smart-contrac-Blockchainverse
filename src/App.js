
import { useState, useEffect } from "react"

import logo from './img/blockchain.png';
import './App.css';
import Web3 from 'web3';
import Inicio from "./compoment/Inicio";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//smart contract

import smartContractRegistro from "./smartContract/registro.json";
import ListaRegistro from "./compoment/registroData";


function App() {

  const [web3, setWeb3] = useState(null);     //guardar instancia de web3
  const [account, setAccount] = useState(null); //guardar cuenta 
  const [balance, setBalance] = useState(null); //guardar el balance
  const [contract, setContract] = useState(null);
  const [verificacionWallet, setVerificacionWallet] = useState(false); //verificacion si tenemos una wallet en el navegador
  const [buttonWallet, setButtonWallet] = useState(false);

  const [listarInformacionEstudios, setListarInformacionEstudios] = useState([]);

  console.log("listarInformacionEstudios ==>", listarInformacionEstudios);

  const MySwal = withReactContent(Swal);

  //Funcion para conectae wallet
  const conectarWallet = async () => {

    if (typeof window.ethereum !== 'undefined') { // Verificamos si tenemos metamask

      const web3Instance = new Web3(window.ethereum); //guardamos el obj de eth
      setWeb3(web3Instance);

      try {
        await window.ethereum.enable(); //Solicitamos el acceso a la wallet

        // Obtener la dirección de la cuenta actual
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        // Obtener el saldo de la cuenta
        const balanceWei = await web3Instance.eth.getBalance(accounts[0]); // Representa el saldo de una cuenta en wei
        const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether'); // Convertir el saldo en wei a ethe
        setBalance(balanceEth);
        setButtonWallet(false);


        //smart contract
        const networkId = await web3Instance.eth.net.getId(); //obtener el ID de la red blockchain en la que estamos conectados
        
        const contractInstance = new web3Instance.eth.Contract( 
          smartContractRegistro, 
          smartContractRegistro && "0x34D44DBc2c73B0eCb4bC738bfB850f92AaB89ae2"
        ); //crear una instancia
        setContract(contractInstance);
        console.log("contractInstance ==>", contractInstance);

        // llamado de metodos
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Has rechazado la solicitud de conexión con tu wallet'
        });
      };

    } else {
      setVerificacionWallet(false);
    };

  };

  const ListarRegistros = async () =>{
    console.log("contract==>",contract);
    if (contract) {
      try{
        const contadorRegistros = await contract.methods.registroCounter().call();
        console.log("contadorRegistros ==>",contadorRegistros);

        let arrayEstudio = [];
        for (let i = 1; i <= contadorRegistros; i++) {
          const inforestudio = await contract.methods.estudios(i).call();
          // console.log(estudio);

          
          if(inforestudio.categoria !=" "){ 
            
            const estudio = {
              categoria: inforestudio.categoria,
              creatAtl: inforestudio.creatAtl,
              fechaFin: inforestudio.fechaFin,
              fechaInicio: inforestudio.fechaInicio,
              id:inforestudio.id,
              lugarDeFormacion:inforestudio.lugarDeFormacion,
              tituloEstudio: inforestudio.tituloEstudio,
              verificacion: inforestudio.verificacion
            };

            arrayEstudio.push(estudio);
          
          };

          // console.log(estudio);
        };

        setListarInformacionEstudios(arrayEstudio);

        // const dataListar = () => {
          // Array.from({ length: contadorRegistros }, async (_, index) => {
          //     console.log(index)
          //     const i = index +1;
          //     const estudio = await contract.methods.estudios(i).call();
          //   });
        // };

      } catch (error) {
        console.error('Error al actualizar el valor:', error);
      }
    }
  };

  useEffect(() => {

    async function Wallet() { //verificacion si tenemos una wallet disponible
      if (typeof window.ethereum !== 'undefined') {
        setVerificacionWallet(true);
        setButtonWallet(true);
      };
    };

    Wallet();
  }, []);

  useEffect(() => { ListarRegistros(); }, [contract]);
  

  return (
    <>
      <header className="text-gray-600 body-font bg-slate-600">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {verificacionWallet ? (
            <>
              <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <img src={logo} width="80" height="80" ></img><span className="ml-3 text-xl text-white">Blockchainverse</span>
              </a>
              <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <a className="mr-5 hover:text-white text-white">Inicio</a>
                <a className="mr-5 hover:text-white text-white">NTFs</a>
                <a className="mr-5 hover:text-white text-white">Servicios</a>
              </nav>

              {buttonWallet ? (
                <button onClick={conectarWallet} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 text-black">
                  
                  Connect wallet
                
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>

                </button>
              ):(
                <button onClick={conectarWallet} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 text-black">
                  wallet conectada
                </button>
              )}
            </>
          ) : (
            <h1 className="text-white text-center w-full text-lg">
              ¡Importante! Para comenzar en esta plataforma, es esencial que crees una billetera (wallet) antes de proceder. La billetera te permitirá gestionar y asegurar tus activos de manera segura. No olvides configurar una billetera antes de continuar para asegurarte de que todas tus transacciones estén protegidas. ¡Empieza tu viaje hacia un mundo de posibilidades asegurando tus activos con una billetera adecuada!
            </h1>
          )}
        </div>
      </header>

      <Inicio account={account} balance={balance} contract={contract} />

      <ListaRegistro listarInformacionEstudios={listarInformacionEstudios} />
      
    </>



  );
}

export default App;
