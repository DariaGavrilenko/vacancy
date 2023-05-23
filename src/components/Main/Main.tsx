import s from './Main.module.css'
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { SearchParamsType } from '../../pages/HomePage';
import ReactPaginate from 'react-paginate';
import { VacancyCard } from './VacancyCard';
import { VacancyType } from '../../App';


type MainPropsType = {
    isLoading: boolean
    vacancies: VacancyType[]
    getSearchParams: (obj: SearchParamsType) => void
    changeFavoriteStatus: (id: string, isFavorite: boolean) => void
}

export const Main = ({ vacancies, getSearchParams, changeFavoriteStatus, isLoading }: MainPropsType) => {
    const [text, setText] = useState('')

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = vacancies.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(vacancies.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % vacancies.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const onSearchHeandler = () => {
        getSearchParams({ keyWorld: text })
    }

    return (
        <div className={s.mainContainer}>
            <TextInput
                data-elem="search-input"
                icon={<IconSearch size="1.1rem" stroke={1.5} />}
                size="md"
                placeholder="Введите название вакансии"
                rightSectionWidth={95}
                rightSection={
                    <button
                        data-elem="search-button"
                        className={s.searchButton}
                        onClick={onSearchHeandler}>
                        Поиск
                    </button>
                }
                className={s.searchInput}
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
            />
            {isLoading ? <div>Loading...</div> :
                <>
                    {vacancies.length !== 0 ?
                        <>
                            {currentItems.map((vacancy, index) => {
                                return <VacancyCard changeFavoriteStatus={changeFavoriteStatus} vacancy={vacancy} key={index} />
                            })}
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                                containerClassName={s.paginateContainer}
                                pageLinkClassName={s.pageLink}
                                pageClassName={s.page}
                                previousClassName={s.pageButton}
                                nextClassName={s.pageButton}
                                activeClassName={s.activePage}
                                disabledClassName={s.disable}
                            />
                        </>
                        :
                        <div>Упс! По Вашему запросу ничего не найдено.</div>}
                </>
            }
        </div>
    )
}

