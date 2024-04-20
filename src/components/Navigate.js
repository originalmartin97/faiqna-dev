import { useNavigate } from 'react-router-dom';

export const NavigateToDashboard = () => {
    const navigate = useNavigate();
    return () => {
        navigate('/dashboard');
    };
};