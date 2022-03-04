import { Link } from 'react-router-dom';
import logo from './../logo.sun.png';

function Home() {
    return (
        <>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                &gt; Se encontró archivo de configuración: <code>Kinich.Ahau.god</code>
            </p>
            <Link className='App-link' to="/play">
                {/* <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            > */}
                run báaxal.exe <small>Play</small>
                {/* </a> */}
            </Link>
        </>
    );
}

export default Home;

