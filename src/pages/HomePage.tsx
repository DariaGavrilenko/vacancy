import { VacancyType } from "../App"
import { Filters } from "../components/Filters/Filters"
import { Main } from "../components/Main/Main"


export type SearchParamsType = {
    keyWorld?: string
    payment_from?: string
    payment_to?: string
    catalogues?: string
}

type HomePagePropsType = {
    vacancies: VacancyType[]
    getSearchParams: (obj: SearchParamsType) => void
    changeFavoriteStatus: (id: string, isFavorite: boolean) => void
}

const HomePage = ({ vacancies, getSearchParams, changeFavoriteStatus }: HomePagePropsType) => {

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: '1116px',
            margin: '0 auto',
        }}>
            <Filters
                getSearchParams={getSearchParams}
            />
            <Main vacancies={vacancies}
                getSearchParams={getSearchParams}
                changeFavoriteStatus={changeFavoriteStatus}
            />
     
        </div>
    )
}

export default HomePage