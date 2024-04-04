import '../../assets/styles/Auth.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';


export default function PassRecoveryPage () {

    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClickPassRecovery = async (event) => {
        event.preventDefault();

        if (password.length < 8) {
            toast.info('O senha deve conter no mínimo 8 caracteres.', {
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
            toast.info('As senhas não coincidem', {
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
            const response = await Axios.post('https://lista-de-tarefas-backend.onrender.com/password-recovery', {
                password,
                token: token
            })
            if (response.data.success) {
                toast.success('Senha redefinida com sucesso', {
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
                toast.error('Erro ao registrar nova senha', {
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
        }
        catch (error) {
            toast.error('Senha em uso, insira outra', {
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
    }

    return (

        <main className="auth_container">
            <section className="auth_content">
                <div className="auth_title">
                    <h1>Redefinição de senha</h1>
                </div>
                <form className="auth" method='post' onSubmit={handleClickPassRecovery}>
                    <div className="input_box">
                        <input type="password" name='password' placeholder='Senha' required onChange={(e) => setPassword(e.target.value)}/>
                        <i className='bx bxs-lock-alt' ></i>
                    </div>

                    <div className="input_box">
                        <input type="password" name='confirmPassword' placeholder='Confirme a senha' required onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <i className='bx bxs-lock-alt' ></i>
                    </div>

                    <button className="btn_login">Registro</button>

                </form>
            </section>
        </main>

    )
}