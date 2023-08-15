import { CountryCard } from "@/components/CountryCard";
import Image from "next/image";
import Link from "next/link";

export type CountryType = {
  name: {
    common: string;
  },
  translations: {
    por: {
      common: string;
    }
  },
  flags: {
    svg: string;
    alt: string;
  },
  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages: {
    [key: string]: string;
  },
  borders?: string[];
  cca3: string;
}

async function getCountries(): Promise<CountryType[]> {
  const response = await fetch("https://restcountries.com/v3.1/all")
  return response.json();
}

export default async function Home() {

  const countries = await getCountries()

  return (
    <section className="container w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-16">
      {countries.map(country => {
        return (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            ptName={country.translations.por.common}
            flag={country.flags.svg}
            flagAlt={country.flags.alt}
          />
        )
      })}
    </section>
  )
}
