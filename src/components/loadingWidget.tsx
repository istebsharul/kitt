import { useState, useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import Image from "next/image";

const LoadingWidget = () => {
    const [loading, setLoading] = useState([true,true,true]);

    useEffect(() => {
        const timers = [
            setTimeout(() => setLoading([false, true, true]), 1000), // 1st spinner completes
            setTimeout(() => setLoading([false, false, true]), 3000), // 2nd spinner completes
            setTimeout(() => setLoading([false, false, false]), 4000), // 3rd spinner completes
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);


    return (
        <div className="2xl:w-1/6 md:w-1/5 h-min absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-xl text-center z-10">
            <div className="">
                <Image src="https://s3-alpha-sig.figma.com/img/df34/ff5d/de2e13b8b13ef90316e36338415b882b?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lbNdpXJEZpCLF~KVtFsGwnVHJMN7YiA8FtyMHNNmzvHa2N6JDdlV6rd20GV-MC3Sql~-zWshyEtecc6osLzrfiiWt89BNbycWeUx7kNLlF-T8cbbTG9AZ15keg6lMVcWkdugHKWUqtMxNklBbI561V0p0AVz1LzeLMwgEHiEB29C8s-pM-U6vNcQhRS-ipgLdwuEEioBwsJ8KXyPEY3NmZky6bwDvV6rQPDOQp1qxvQABzPKL9PHaz2xNrzEmMnBkwOgs8Tkp-WpzUalI3Rg58O13-OfVdLMMKeWKAt0iEUXbONUbgNQOUcT0qPQ~oXeQw5airpjlGDqNmKOOlRShA__" alt="loading icon" height="100" width="100" className="mx-auto" />
            </div>
            <ul className="space-y-4 px-8 py-4 mb-1">
                <li className="flex items-center space-x-4">
                    {loading[0] ? (
                        <div className="relative inline-flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-gray-200 rounded-full animate-spin border-t-gray-700"></div>
                        </div>
                    ) : (
                        <FaRegCheckCircle className="text-green-600" />
                    )}
                    <span className="ml-2 text-gray-500 text-lg">Searching 400+ flights</span>
                </li>
                <li className="flex items-center space-x-4">
                {loading[1] ? (
                        <div className="relative inline-flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-gray-200 rounded-full animate-spin border-t-gray-700"></div>
                        </div>
                    ) : (
                        <FaRegCheckCircle className="text-green-600" />
                    )}
                    <span className="ml-2 text-gray-500 text-lg">Attaching company rules</span>
                </li>
                <li className="flex items-center space-x-4">
                {loading[2] ? (
                        <div className="relative inline-flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-gray-200 rounded-full animate-spin border-t-gray-700"></div>
                        </div>
                    ) : (
                        <FaRegCheckCircle className="text-green-600" />
                    )}
                    <span className="ml-2 text-gray-500 text-lg">Serving best results</span>
                </li>
            </ul>
        </div>
    );
};

export default LoadingWidget;