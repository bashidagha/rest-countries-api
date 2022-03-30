import { GetStaticPropsContext } from "next/types/index";
import Link from "next/link";
import styles from '../../../styles/Home.module.css'

const country  = ({country}:any) => {


    return(

      <div>
      <Link href="/"><a className={styles.back_button}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg> Back</a></Link>
      <div className={styles.single_page}>
      <img src={country[0].flags.svg} alt="" width="400" height="300"/>

      <div>

      <h1>{country[0].name.common}</h1>
      <div style={{display:"flex"}}>
      <div>
      <p><span>Native Name: </span>{country[0].name.nativeName[Object.keys(country[0].name.nativeName)[0]].common}</p>
      <p><span>Population: </span>{country[0].population.toLocaleString('en-US')}</p>
      <p><span>Region: </span>{country[0].region}</p>
      <p><span>Sub Region: </span>{country[0].subregion}</p>
      <p><span>Capital: </span>{country[0].capital}</p>
      </div>

      <div>
      <p><span>Top Level Domain: </span>{country[0].tld}</p>
      <p><span>Currencies: </span>{country[0].currencies[Object.keys(country[0].currencies)[0]].name}</p>
      <p><span>Languages: </span>{country[0].tld}</p>
      </div>

      </div>
      </div>
      </div>

      </div>
    );

}


export const getStaticProps = async (context: GetStaticPropsContext) => {

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${context.params?.id}`
  );

  const country = await res.json();

  return {
    props: {
      country,
    },
  };
};



export const getStaticPaths = async () => {

  const res = await fetch(`https://restcountries.com/v3.1/all`);

  const countries = await res.json();

  const ids = countries.map((country: any) => country.name.common);

  const paths = ids.map((id: any) => ({ params: { id: id.toString() } }));


  return {
    paths,
    fallback: false,
  };

};

export default country;
