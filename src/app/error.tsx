"use client"
import Image from "next/image";
import Link from "next/link";

import arrow from "../assets/arrow-back.svg"


export default function Error() {
    return (
        <section className="flex flex-col container">
            <h1 className="text-5xl text-center font-bold text-gray-900 my-16">
                Ops, ocorreu um erro ao exibir esse país!
            </h1>
            <Link className="flex items-center py-2" href="/">
                <Image
                    src={arrow}
                    alt="Seta para voltar a página"
                    width={23}
                    height={23}
                />
                Voltar
            </Link>
        </section>
    )
}