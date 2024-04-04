import '../../assets/styles/Auth.css';
import Axios from 'axios';
import Footer from '../../components/Footer/Footer'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import BtnAuth from '../../components/BtnAuth/BtnAuth';



export default function RecoveryPage () {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleClickRecovery = async (event) => {
        event.preventDefault();

        try {
            const response = await Axios.post("https://lista-de-tarefas-backend.onrender.com/recovery", {
                email
            });
            
            if (response.status === 200) {
                toast.success('E-mail de recuperação enviado!', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                document.cookie = `token=${response.data.token}; path=/`;
                navigate("/");
            } else {
                toast.error('Erro ao recuperar e-mail', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        }
        catch (error) {
            toast.error('E-mail não encontrado', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    const handleClickHomeNavigate = () => {
        navigate('/')
    }

    return (
        <>
        <main className="auth_container">
            <section className="auth_content">
            <BackButton/>
                <div className="auth_title">
                    <h1 onClick={handleClickHomeNavigate}>Recovery</h1>
                </div>
                <form className="auth" method='post' onSubmit={handleClickRecovery}>
                    <div className="input_box">
                        <input type="text" name='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)}/>
                        <i className='bx bxs-envelope' ></i>
                    </div>

                    <BtnAuth title='Enviar'/>

                </form>
            </section>
        </main>
        <Footer />
        </>
    )
}