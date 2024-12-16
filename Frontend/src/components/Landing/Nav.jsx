import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <div className="w-full fixed top-0  px-10 flex justify-between items-center h-14 bg-gradient-to-r from-slate-100 via-zinc-200 to-orange-300">
            <div className="shadow-md shadow-orange-200 px-3">
                <h1 className="font-semibold text-2xl">JOB<span className="text-orange-600">Portal</span></h1>
            </div>
            <div className="flex gap-4">
                <button className="px-3 py-1 rounded-md bg-orange-500 text-white font-semibold">
                    <Link to={'/login'}>LOGIN</Link>
                </button>
                <button className="px-3 py-1 rounded-md bg-orange-500 text-white font-semibold">
                    <Link to={'/signup'}>SIGNUP</Link>
                </button>

            </div>
        </div>
    )
}

export default Nav