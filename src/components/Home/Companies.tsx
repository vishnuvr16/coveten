import { FaFirefox } from "react-icons/fa";




export default function Companies({ clients }: { clients: any[] }) {


    return (
        <div className="py-14 bg-bgLight">
            <div className="max-w-screen-2xl mx-auto px-2 lg:px-12">
                <section className="relative pt-28 pb-36 bg-blueGray-100 overflow-hidden">
                    <img className="absolute top-0 left-0" src="flaro-assets/images/logos/gradient3.svg" alt="" />
                    <div className="relative z-10 container px-4 mx-auto">
                        <p className="mb-14 text-base  text-center font-semibold uppercase tracking-px">Powering next-gen companies</p>
                        <div className="flex flex-wrap max-w-5xl mx-auto -m-3">
                            <div className="mt-6">
                                <ul className="flex gap-y-6 flex-wrap items-center justify-center [&>*]:px-12 lg:divide-x">

                                    {
                                        clients && clients.map((item, idx) =>
                                            <li key={item.id} className="flex-none mb-8">
                                                <img src={item?.logo} className="w-32 " alt="client image" />
                                            </li>
                                        )
                                    }

                                </ul>
                            </div>





                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}