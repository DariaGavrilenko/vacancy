import React, { useEffect, useState } from 'react';

import './App.css';
import { Header } from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Vacancy from './components/Vacancy/Vacancy';
import FavoritePage from './pages/FavoritePage';

export type SearchParamsType = {
  keyWorld?: string
  payment_from?: string
  payment_to?: string
  catalogues?: string
}

export type ResponseType = {
  id:string
  profession:string
  firm_name:string
  town:{
    title: string
  }
  type_of_work:{
    title: string
  }
  payment_to: string
  payment_from:string
  currency:string
}

export type VacancyType = {
  id:string
  isFavorite: boolean
  profession:string
  firm_name:string
  town:{
    title: string
  }
  type_of_work:{
    title: string
  }
  payment_to: string
  payment_from:string
  currency:string
}

function App() {

  const [vacancies, setVacancies] = useState<VacancyType[]>([])
  const [favoriteVacancies, setFavoriteVacancies] = useState<VacancyType[]>([])
  const [searchParams, setSearchParams] = useState<SearchParamsType>({
      keyWorld: '',
      payment_from: '',
      payment_to: '',
      catalogues: ''
  })

  console.log('333',searchParams)

  useEffect(() => {

      fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?keyword=${searchParams.keyWorld}&payment_from=${Number(searchParams.payment_from)}&payment_to=${Number(searchParams.payment_to)}&catalogues=${Number(searchParams.catalogues)}`, {
          headers: {
              "x-secret-key": 'GEU4nvd3rej*jeh.eqp',
              "X-Api-App-Id": 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
          }
      })
          .then(response => response.json())
          .then(response => {
              setVacancies([...response.objects.map((el:ResponseType)=>({...el, isFavorite : false}))])
              console.log('vacancy', ...response.objects)
              console.log('from', Number(searchParams.payment_from) )
          })
  }, [searchParams])

  useEffect(()=>{
      const favoriteVacancies = vacancies.filter(vacancy=> vacancy.isFavorite === true)
      localStorage.setItem('favorite', JSON.stringify(favoriteVacancies))

      const favoritesVacanciesFromStore = localStorage.getItem('favorite')
      if (favoritesVacanciesFromStore) {
        setFavoriteVacancies([...JSON.parse(favoritesVacanciesFromStore)])
      }
  },[vacancies])


  const getSearchParams = (obj: SearchParamsType) => {
      setSearchParams({ ...searchParams, ...obj })
  }

  const changeFavoriteStatus = (id:string, isFavorite:boolean) =>{
      setVacancies(vacancies.map(vacancy => vacancy.id === id ? {...vacancy, isFavorite} : vacancy))
  }

  return (
    <div className="App">
      <Header />
      <Routes>

        <Route path='/' element={<HomePage
         getSearchParams={getSearchParams} 
         changeFavoriteStatus={changeFavoriteStatus}
         vacancies={vacancies} />} />
        <Route path='/favorite' element={<FavoritePage favoriteVacancies={favoriteVacancies} changeFavoriteStatus={changeFavoriteStatus} />} />
        <Route path='/vacancy/:id' element={<Vacancy changeFavoriteStatus={changeFavoriteStatus} />} />

      </Routes>
    </div>
  );
}

export default App;
