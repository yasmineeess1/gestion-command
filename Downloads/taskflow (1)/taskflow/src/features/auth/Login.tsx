import { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import api from '../../api/axios'; 
import styles from './Login.module.css';
import { useSelector, useDispatch } from 'react-redux'; 
import type { RootState } from '../../store';
import { loginStart, loginSuccess, loginFailure } from './authSlice'; 

export default function Login() { 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  
  // Remplacement de useAuth par Redux
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  
  const from = (location.state as any)?.from || '/dashboard'; 
  
  // Redirection automatique si déjà connecté
  useEffect(() => { 
    if (user) navigate(from); 
  }, [user, navigate, from]); 
  
  async function handleSubmit(e: React.FormEvent) { 
    e.preventDefault(); 
    
    // Utilisation de l'action creator loginStart
    dispatch(loginStart()); 

    try { 
      const { data: users } = await api.get(`/users?email=${email}`); 
      
      if (users.length === 0 || users[0].password !== password) { 
        dispatch(loginFailure('Email ou mot de passe incorrect')); 
        return; 
      } 
      
      const { password: _, ...userData } = users[0];

      // Créer un faux JWT
      const fakeToken = btoa(
        JSON.stringify({
          userId: userData.id,
          email: userData.email,
          role: 'admin',
          exp: Date.now() + 3600000 
        })
      );

      // Utilisation de l'action creator loginSuccess
      dispatch(loginSuccess({ user: userData, token: fakeToken }));

    } catch { 
      dispatch(loginFailure('Erreur serveur')); 
    } 
  } 
  
  return ( 
    <div className={styles.container}> 
      <form className={styles.form} onSubmit={handleSubmit}> 
        <h1 className={styles.title}>TaskFlow</h1> 
        <p className={styles.subtitle}>Connectez-vous pour continuer</p> 
        
        {/* Affichage de l'erreur depuis le state Redux */}
        {error && <div className={styles.error}>{error}</div>} 
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className={styles.input} 
          required 
        /> 
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className={styles.input} 
          required 
        /> 
        <button type="submit" className={styles.button} disabled={loading}> 
          {loading ? 'Connexion...' : 'Se connecter'} 
        </button> 
      </form> 
    </div> 
  ); 
}