import '../../assets/styles/Auth.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../../components/BackButton/BackButton';
import BtnAuth from '../../components/BtnAuth/BtnAuth';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';


export default function RegisterPage () {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClickRegister = async (event) => {
        event.preventDefault(); 
        
        if (username.length < 5) {
            toast.info('O login deve ter no mínimo 5 caracteres.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.info('Por favor, insira um email válido.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }
        if (password.length < 8) {
            toast.info('A senha deve ter no mínimo 8 caracteres.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }
        if (password !== confirmPassword) {
            toast.info('As senhas não coincidem.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }
        try {
            const response = await Axios.post("http://localhost:5000/register", {
                username,
                email,
                password
            });
            if (response.data.success) {
                toast.success('Usuário cadastrado com sucesso', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate("/login");
            } else {
                toast.error('Erro ao realizar o cadastro', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.info('Ocorreu um erro, tente novamente mais tarde', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const handleClickHomeNavigate = () => {
        navigate('/')
    }

    return (

        <main className="auth_container">
            <section className="auth_content">
                <BackButton />
                <div className="auth_title">
                    <h1 onClick={handleClickHomeNavigate}>Registro</h1>
                </div>
                <form className="auth" method='post' onSubmit={handleClickRegister}>
                    <div className="input_box">
                        <input type="text" name='username' placeholder='Username' required onChange={(e) => setUsername(e.target.value)}/>
                        <i className='bx bxs-user'></i>
                    </div>

                    <div className="input_box">
                        <input type="text" name='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)}/>
                        <i className='bx bxs-envelope' ></i>
                    </div>

                    <div className="input_box">
                        <input type="password" name='password' placeholder='Senha' required onChange={(e) => setPassword(e.target.value)}/>
                        <i className='bx bxs-lock-alt' ></i>
                    </div>

                    <div className="input_box">
                        <input type="password" name='confirmPassword' placeholder='Confirme a senha' required onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <i className='bx bxs-lock-alt' ></i>
                    </div>

                    <BtnAuth title='Registro'/>

                </form>
            </section>
        </main>

    )
}