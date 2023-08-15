import { CountryType } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

import arrow from "../../../assets/arrow-back.svg"
import { CountryCard } from "@/components/CountryCard";

async function getCountryByName(name: string): Promise<CountryType> {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)

    return (await response.json())[0]
}

// async function getCountryByName(name: string): Promise<CountryType> {
//     const response = await fetch("https://restcountries.com/v3.1/all")
//     const countries: CountryType[] = await response.json()

//     return countries.find(country => country.name.common === name)!
// }

async function getCountryBorderByName(name: string) {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const countries: CountryType[] = await response.json()

    const country = countries.find(country => country.name.common === name)!

    return country.borders?.map(border => {
        const borderCountry = countries.find(country => country.cca3 === border)!
        return {
            name: borderCountry.name.common,
            ptName: borderCountry.translations.por.common,
            flag: borderCountry.flags.svg,
            flagAlt: borderCountry.flags.alt
        }
    })
}

export default async function CountryPage({ params: { name } }: { params: { name: string } }) {

    const country = await getCountryByName(name)

    const countryBorder = await getCountryBorderByName(decodeURI(name))

    console.log(countryBorder)

    const formatter = Intl.NumberFormat("en", { notation: "compact" })

    return (
        <section className="flex flex-col container">
            <h1 className="text-5xl text-center font-bold text-gray-900 my-16">{country.translations.por.common}</h1>
            <Link className="flex items-center py-2 gap-2" href="/">
                <Image
                    src={arrow}
                    alt="Seta para voltar a página"
                    width={23}
                    height={23}
                />
                Voltar
            </Link>
            <article className="flex items-center gap-5 sm:justify-around md:justify-around lg:justify-around xl:justify-around flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row min-w-full p-10 bg-white rounded-xl">
                <section>
                    {
                        country.capital && (
                            <h2 className="text-xl text-gray-900 mt-3"><b className="mr-2">🏬 Capital:</b>{country.capital}</h2>
                        )
                    }
                    <h2 className="text-xl text-gray-900 mt-3"><b className="mr-2">🗾 Continente:</b>{country.region} {country.subregion && `- ${country.subregion}`}</h2>
                    <h2 className="text-xl text-gray-900 mt-3"><b className="mr-2">👨‍👩‍👧‍👧 População:</b>{formatter.format(country.population)}</h2>
                    {country.languages && (
                        <h2 className="text-xl text-gray-900 mt-3"><b className="mr-2">🗣 Línguas faladas:</b>
                            <br />
                            {Object.values(country.languages).map((language) => {
                                return (
                                    <span className="inline-block px-2 bg-indigo-900 rounded-xl text-sm text-white mx-2" key={language}>
                                        {language}
                                    </span>
                                )
                            })}</h2>
                    )}
                </section>
                <div className="relative h-64 w-96 shadow-xl md:order-last order-first">
                    <Image
                        src={country.flags.svg}
                        alt={country.flags.alt}
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>
            </article>
            <section>
                <h3 className="mt-12 text-2xl font-semibold text-gray-900">
                    Países que fazem fronteiras
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-5 my-3">
                    {countryBorder?.map((border) => {
                        return (
                            <div>
                                <CountryCard
                                    {...border}
                                />
                            </div>
                        )
                    })}
                </div>
            </section>
        </section>
    )
}
