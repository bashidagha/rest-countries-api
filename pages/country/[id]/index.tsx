import { GetStaticPropsContext } from "next/types/index";
import Link from "next/link";
import styles from '../../../styles/Home.module.css'
import styles1 from '../../../styles/HomeDark.module.css'
import { useDark } from "../../../context/state";

const Country  = ({country}:any) => {

  const { dark, darkPage } = useDark();


    return(

      <div className={!dark?"all_background":"all_background_d"}>
      <div className={!dark?styles.back_button:styles1.back_button_black}>
      <Link href="/"><a> <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 13 13">
      <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>&nbsp; Back</a></Link>
      </div>

      <div className={!dark?styles.single_page:styles1.single_page_black}>
      <img src={country[0].flags.svg} alt=""/>

      <div>

      <h1>{country[0].name.common}</h1>
      <div style={{display:"flex"}}>
      <div style={{marginRight:"1rem"}}>
      {country[0].name.nativeName?<p><span>Native Name: </span>{country[0].name.nativeName[Object.keys(country[0].name.nativeName)[0]].common}</p>:<p/>}
      <p><span>Population: </span>{country[0].population.toLocaleString('en-US')}</p>
      <p><span>Region: </span>{country[0].region}</p>
      <p><span>Sub Region: </span>{country[0].subregion}</p>
      <p><span>Capital: </span>{country[0].capital}</p>
      </div>

      <div>
      <p><span>Top Level Domain: </span>{country[0].tld}</p>
      {country[0].currencies?<p><span>Currencies: </span>{country[0].currencies[Object.keys(country[0].currencies)[0]].name}</p>:<p/>}
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

  const paths = ids.map((id: any) => ({ params: { id: id } }));


  return {
    paths,
    fallback: false,
  };

};

export default Country;
