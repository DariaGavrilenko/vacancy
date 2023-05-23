import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import s from './Header.module.css'

export const Header = () => {
    return (
        <div className={s.headerMainContainer}>
            <div className={s.headerContainer}>
              <div className={s.logoContainer}>
                <img src={logo} alt="logo" />
              </div>
              <div>
                <Link to="/" className={s.headerLink}>Поиск Вакансий</Link>
                <Link to="/favorite" className={s.headerLink}>Избранное</Link>
              </div>
            </div>
          </div>
    )
}