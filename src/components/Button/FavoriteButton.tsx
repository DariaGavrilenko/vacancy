import notFavorite from '../../assets/img/notFavorire.svg';
import favorite from '../../assets/img/favorite.png';
import { MouseEvent } from 'react'

type FavoriteButtonPropsType = {
    isFavorite: boolean
    setIsFavorite: (isFavorite: boolean) => void
    vacancyId: string
}

const FavoriteButton = ({ isFavorite, setIsFavorite, vacancyId }: FavoriteButtonPropsType) => {

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        setIsFavorite(!isFavorite)
    }

    return (
        <button onClick={onClickHandler}
            data-elem={`vacancy-${vacancyId}-shortlist-button`}
        >
            <img src={isFavorite ? favorite : notFavorite} alt="favorite" style={{width:'22px', height:'22px'}}/>
        </button>
    )
}

export default FavoriteButton