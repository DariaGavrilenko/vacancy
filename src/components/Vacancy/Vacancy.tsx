import s from './Vacancy.module.css'

import location from '../../assets/img/location.svg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FavoriteButton from '../Button/FavoriteButton';
import { VacancyType } from '../../App';
import { getSalary } from '../../assets/helpers/helpersFunction';

type VacancyPropsType = {
    changeFavoriteStatus: (id: string, isFavorite: boolean) => void
}

type VacancyDetailType = {
    id: string
    isFavorite: boolean;
    profession: string;
    firm_name: string;
    town: {
        title: string;
    };
    type_of_work: {
        title: string;
    };
    payment_to: string;
    payment_from: string;
    currency: string;
    vacancyRichText: string
}

const Vacancy = ({ changeFavoriteStatus }: VacancyPropsType) => {

    const [vacancy, setVacancy] = useState<VacancyDetailType>({
        id: '',
        firm_name: '',
        profession: '',
        payment_from: '',
        payment_to: '',
        currency: '',
        type_of_work: {
            title: ''
        },
        town: {
            title: ''
        },
        isFavorite: false,
        vacancyRichText: '',
    })

    let { id } = useParams();

    const setIsFavorite = (isFavorite: boolean) => {
        setVacancy({ ...vacancy, isFavorite })
        changeFavoriteStatus(vacancy.id, isFavorite)
    }

    useEffect(() => {
        fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${id}`, {
            headers: {
                "x-secret-key": 'GEU4nvd3rej*jeh.eqp',
                "X-Api-App-Id": 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
            }
        })
            .then(response => response.json())
            .then(response => {
                const favorites = localStorage.getItem('favorite')
                const nextFavorites = favorites ? JSON.parse(favorites) : []
                const isFavorite = nextFavorites.some((item: VacancyType) => item.id === response.id)
                setVacancy({ ...response, isFavorite })
            })
    }, [])


    return (
        <div className={s.vacancyPageContainer}>
            <div className={s.vacancyContainer}>
                <div className={s.vacancyHeaderContainer}>
                    <h1 className={s.vacancy}>{vacancy.profession}</h1>
                    <FavoriteButton vacancyId={vacancy.id} isFavorite={vacancy.isFavorite} setIsFavorite={setIsFavorite} />
                </div>
                <span className={s.salary}>
                    {getSalary(+vacancy.payment_from, +vacancy.payment_to, vacancy.currency)}
                </span>
                <span className={s.schedule}> • {vacancy.type_of_work.title}</span>
                <span className={s.location}>
                    <img src={location} alt="location" className={s.icon} />
                    {vacancy.town.title}</span>
            </div>
            <div className={s.detailsContainer}
                dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }} ></div>
        </div>
    )
}

export default Vacancy