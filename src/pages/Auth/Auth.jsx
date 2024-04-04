import '../../assets/styles/Auth.css';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import BtnAuth from '../../components/BtnAuth/BtnAuth';
import BackButton from '../../components/BackButton/BackButton';
import Footer from '../../components/Footer/Footer'
import 'react-toastify/dist/ReactToastify.css';



export default function AuthPage () {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClickLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await Axios.post("http://localhost:5000/login", {
                username,
                password
            });

            if (response.data.success) {
                toast.success('Login realizado com sucesso!', {
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
                toast.error('Erro ao realizar o login', {
                    position: "top-right",
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
            toast.error('Usuário ou senha inválidos', {
                position: "top-right",
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
        <>
        <main className="auth_container">
            <section className="auth_content">
            <BackButton />
                <div className="auth_title">
                    <h1 onClick={handleClickHomeNavigate}>Login</h1>
                </div>
                <form className="auth" method='post' onSubmit={handleClickLogin}>
                    <div className="input_box">
                        <input type="text" name='username' placeholder='Username' required onChange={(e) => setUsername(e.target.value)}/>
                        <i className='bx bxs-user'></i>
                    </div>

                    <div className="input_box">
                        <input type="password" name='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)}/>
                        <i className='bx bxs-lock-alt' ></i>
                    </div>

                    <div className="remember">
                        <label><input type="checkbox" /><p>Lembre-se de mim</p></label>
                        <a href="./recovery">Esqueceu a senha?</a>
                    </div>

                    <BtnAuth title='Login' />

                    <div className="register_link">
                        <p>Não tem uma conta? <a href="/register">Registre-se</a></p>
                    </div>
                </form>
            </section>
        </main>
        <Footer />
        </>
    )
}