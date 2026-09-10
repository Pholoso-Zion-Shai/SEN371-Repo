import { useState } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { getSession, isSessionValid, registerUser, resetLocalAccount, signIn } from './api/auth';

export function AuthScreen({ register = false }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setError('');
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      if (register) {
        await registerUser({
          firstName: form.get('firstName'),
          lastName: form.get('lastName'),
          email: form.get('email'),
          password: form.get('password'),
          studentId: form.get('studentId'),
          department: form.get('department')
        });
      } else {
        await signIn(form.get('email'), form.get('password'));
      }
      navigate('/', { replace: true });
    } catch (authError) {
      setError(authError.message);
    } finally {
      setPending(false);
    }
  };

  return <div className="auth-page"><section className="auth-card"><Link to="/" className="brand auth-brand"><span className="brand-mark">C</span> CampusHub</Link><div className="auth-heading"><span className="eyebrow">{register ? 'Join your campus' : 'Welcome back'}</span><h1>{register ? <>Create your<br /><em>account.</em></> : <>Sign in to<br /><em>CampusHub.</em></>}</h1><p>{register ? 'One account for resources, bookings and campus essentials.' : 'Your campus, all in one place.'}</p></div><form onSubmit={submit}><div className={register ? 'form-grid' : ''}>{register && <><label className="field-label">First name<input name="firstName" required placeholder="James" /></label><label className="field-label">Last name<input name="lastName" required placeholder="Mensah" /></label></>}</div><label className="field-label">Email address<input name="email" required type="email" placeholder="james@ug.edu.gh" /></label>{register && <label className="field-label">Student ID<input name="studentId" required placeholder="UG123456" /></label>}<label className="field-label">Password<input name="password" required minLength="8" type="password" placeholder="At least 8 characters" /></label>{register && <label className="field-label">Department<select name="department" defaultValue="Computer Science"><option>Computer Science</option><option>Business Administration</option><option>Engineering</option><option>Media Studies</option></select></label>}{error && <p className="form-error" role="alert">{error}</p>}{!register && error && <button type="button" className="auth-reset" onClick={event => { const email = new FormData(event.currentTarget.form).get('email'); if (window.confirm('Remove this browser-local account and create it again?')) { resetLocalAccount(email); window.location.assign('/register'); } }}>Forgot the password? Reset this local account</button>}<button className="button full-button" disabled={pending}>{pending ? 'Please wait...' : register ? 'Create account' : 'Sign in'} <ArrowUpRight size={16} /></button></form><p className="auth-switch">{register ? 'Already have an account?' : 'New to CampusHub?'} <Link to={register ? '/login' : '/register'}>{register ? 'Sign in' : 'Create an account'}</Link></p></section></div>;
}

export function ProtectedRoute() {
  const location = useLocation();
  const session = getSession();
  if (!isSessionValid(session)) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

export function AdminRoute() {
  const session = getSession();
  if (!isSessionValid(session)) return <Navigate to="/login" replace />;
  return session.user.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
}

export function AuthSuccess() {
  return <div className="auth-page"><section className="auth-card auth-success"><span className="success-icon"><Check /></span><span className="eyebrow">Welcome back</span><h1>Your session is<br /><em>secure.</em></h1><p>You are authenticated and ready to use CampusHub.</p><Link to="/" className="button">Continue to CampusHub <ArrowUpRight size={16} /></Link></section></div>;
}
