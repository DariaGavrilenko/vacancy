import { Link } from 'react-router-dom'
import empty from '../../assets/img/Empty.svg'
import s from './EmptyPage.module.css'

export const EmptyPage = () =>{
    return (
        <div className={s.emptyPageContainer} >
            <img src={empty} alt="empty page" className={s.image}/>
            <h1 className={s.title}>Упс, здесь еще ничего нет!</h1>
            <Link to="/" className={s.button}>Поиск Вакансий</Link>
        </div>
    )
}