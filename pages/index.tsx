import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from "react";
import Link from "next/link";

const Home: NextPage = ({countries}:any) => {

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  return (
    <div className={styles.container}>
    <Head>
    <title>Rest Countries API</title>
    <meta name="description" content="Generated by create next app" />
    </Head>

    <div className={styles.search_box}>

    <div style={{position:"relative"}}>
    <span style={{position:"absolute", top: "7px",left:"7px"}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
    </svg>
    </span>
    <input type="text" placeholder="Search for a country..." value={search}  onChange={(e) => setSearch(e.target.value)}/>
    </div>

    <form>
    <select value={region} onChange={(e) => setRegion(e.target.value)}>
    <option value="All">Filter by region</option>
    <option value="Africa">Africa</option>
    <option value="Americas">America</option>
    <option value="Asia">Asia</option>
    <option value="Oceania">Oceania</option>
    <option value="Europe">Europe</option>
    </select>
    </form>
    </div>

    <main className={styles.main}>


    {
      countries?countries.filter((country:any)=>region!=="All"?country.region === region:country)
      .filter((country:any)=>country.name.common.toLowerCase().includes(search.toLowerCase())).map((country:any)=>(

        <Link href={`/country/${country.name.common}`}>
        <div className={styles.countryItem} key={country.name.common}>
        <img src={country.flags.png} width="220" height="130"/>
        <h1>{country.name.common}</h1>
        <p><span>Population: </span>{country.population.toLocaleString('en-US')}</p>
        <p><span>Region: </span>{country.region}</p>
        <p><span>Capital: </span>{country.capital}</p>
        </div>
        </Link>

      )):<div>Loading...</div>
    }
    </main>

    </div>
  )
}


// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://restcountries.com/v3.1/all')
  const countries = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      countries,
    },
  }
}

export default Home
