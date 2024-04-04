import '../../assets/styles/Home.css';
import Footer from '../../components/Footer/Footer';
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function HomePage () {

    const navigate = useNavigate();

    const handleClickButtonLogin = () => {
        navigate('/login')
    }

    const handleClickButtonRegister = () => {
        navigate('/register')
    }
    
    return (
        <>
            <main className="main_content">
                <section className="welcome_container">
                    <div className="welcome_content">
                        <h1>Olá,</h1>
                        <h1>Seja bem-vindo</h1>
                    </div>
                    <div className="buttons_welcome">
                        <button className="btn_login_welcome" onClick={handleClickButtonLogin}>Entrar</button>
                        <button className="btn_register_welcome" onClick={handleClickButtonRegister}>Registre-se</button>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}