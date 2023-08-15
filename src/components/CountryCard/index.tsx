import Image from "next/image";
import Link from "next/link";

export function CountryCard({ name, ptName, flag, flagAlt }: { name: string, ptName: string, flag: string, flagAlt: string }) {
    return (
        <Link href={`/country/${name}`}>
            <article className="h-64 min-w-full p-2 bg-white border-2 cursor-pointer rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl" key={name}>
                <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
                    <Image src={flag} alt={flagAlt} fill className="object-cover" />
                </div>
                <h1 className="mt-6 font-bold text-indigo-800">{ptName}</h1>
            </article>
        </Link>
    )
}