import { VacancyType } from "../App"
import { EmptyPage } from "../components/Empty/EmptyPage"
import { VacancyCard } from "../components/Main/VacancyCard"


type FavoritePagePropsType = {
    changeFavoriteStatus: (id: string, isFavorite: boolean) => void
    favoriteVacancies:VacancyType[]
}

const FavoritePage = ({changeFavoriteStatus, favoriteVacancies}:FavoritePagePropsType) => {
 
    return (
        <div style={{margin: '0 auto', maxWidth:'773px'}}>
            {favoriteVacancies.length !== 0 ?
                favoriteVacancies.map((vacancy, index) => {
                    return <VacancyCard changeFavoriteStatus={changeFavoriteStatus} vacancy={vacancy} key={index} />
                })
                :
                <EmptyPage />
            }

        </div>
    )
}

export default FavoritePage;