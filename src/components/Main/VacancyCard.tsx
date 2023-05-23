import s from './Main.module.css'
import location from '../../assets/img/location.svg';
import { Link } from 'react-router-dom';
import FavoriteButton from '../Button/FavoriteButton';
import { VacancyType } from '../../App';
import { getSalary } from '../../assets/helpers/helpersFunction';

type VacancyCardPropsType = {
    vacancy: VacancyType
    changeFavoriteStatus: (id: string, isFavorite: boolean) => void
}

export const VacancyCard = ({ vacancy, changeFavoriteStatus }: VacancyCardPropsType) => {

    const setIsFavorite = (isFavorite: boolean) => {
        changeFavoriteStatus(vacancy.id, isFavorite)
    }
    return (
        <div className={s.vacancyContainer}
        data-elem={`vacancy-${vacancy.id}`}
        >
            <div className={s.vacancyHeaderContainer}>
                <Link to={`/vacancy/${vacancy.id}`} className={s.vacancy}>{vacancy.profession}</Link>
                <FavoriteButton vacancyId={vacancy.id} isFavorite={vacancy.isFavorite} setIsFavorite={setIsFavorite} />
            </div>
            <span className={s.salary}>{getSalary(+vacancy.payment_from, +vacancy.payment_to, vacancy.currency)}</span> <span className={s.schedule}>• {vacancy.type_of_work.title}</span>
            <span className={s.location}>
                <img src={location} alt="location" className={s.icon}/>
                {vacancy.town.title}</span>
        </div>
    )
} 