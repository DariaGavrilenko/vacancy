import { useEffect, useState } from 'react';
import s from './Filters.module.css'
import { Select, TextInput } from '@mantine/core';
import { SearchParamsType } from '../../pages/HomePage';

type FiltersPropsType = {
    getSearchParams: (obj: SearchParamsType) => void
}

export type CatalogType = {
    title_rus: string,
    key: string
}

export const Filters = ({ getSearchParams }: FiltersPropsType) => {
    const [paymentFrom, setPaymentFrom] = useState('')
    const [paymentTo, setPaymentTo] = useState('')
    const [category, setCategory] = useState<string>('')
    const [catalogues, setCatalogues] = useState<CatalogType[]>([])
    const [selectItem, setSelectItem] = useState<string | null>(null)


    useEffect(() => {
        fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/`, {
            headers: {
                "x-secret-key": 'GEU4nvd3rej*jeh.eqp',
                "X-Api-App-Id": 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
            }
        })
            .then(response => response.json())
            .then(response => setCatalogues([...response]))
    }, [])

    const resetFilters = () => {
        setCategory('')
        setPaymentFrom('')
        setPaymentTo('')
        setSelectItem(null)
        getSearchParams({
            payment_from: '',
            payment_to: '',
            catalogues: ''
        })
    }

    const onAcceptClick = () => {
        getSearchParams({
            payment_from: paymentFrom,
            payment_to: paymentTo,
            catalogues: category
        })
    }

    return (
        <div className={s.filtersMainContainer}>
            <div className={s.filtersHeader}>
                <h1 className={s.filtersHeaderTitle}>Фильтры</h1>
                <button className={s.filtersHeaderButton} onClick={resetFilters}>Сбросить все x</button>
            </div>
            <h2 className={s.filtersTitle}>Отрасль</h2>
            <Select
                data-elem={'industry-select'}
                mt="md"
                value={selectItem}
                data={[...catalogues.map(el => ({ label: el.title_rus, value: el.title_rus }))]}
                placeholder="Выберете отрасль"
                className={s.select}
                onChange={(e) => {
                    const catalog = catalogues.find(el => el.title_rus === e)
                    if (catalog) {
                        setSelectItem(e)
                        setCategory(catalog.key)
                    }
                }}
            />
            <h2 className={s.filtersTitle}>Оклад</h2>
            <TextInput
                data-elem={'salary-from-input'}
                type="number"
                placeholder="От"
                className={s.input}
                value={paymentFrom}
                onChange={(e) => setPaymentFrom(e.currentTarget.value)}
            />
            <TextInput
              data-elem={'salary-to-input'}
                type="number"
                placeholder="До"
                className={s.input}
                value={paymentTo}
                onChange={(e) => setPaymentTo(e.currentTarget.value)}
            />
            <button className={s.filtersSubmitButton}
                onClick={onAcceptClick}
                data-elem = {'search-button'}
            >Применить
            </button>

        </div>
    )
}