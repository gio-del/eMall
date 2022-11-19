import previewImg from '../assets/details.png'

export default function WelcomeView() {
  return (
    <div className="py-10 dark:bg-dk-secondary bg-dk-primary">
      <h2 className="px-6 text-3xl lg:text-5xl font-bold mb-2 text-white">
        Electric Mobility For All!
      </h2>
      <div className="container mx-auto px-6 flex justify-between max-h-screen">
        <div className="w-2/3">
          <h3 className="text-xl sm:text-3xl mb-8 text-gray-200">
            Make your charging processes easy, non plan-ruiner and fun
          </h3>
          <button className="bg-white hover:outline-dk-primary outline-none outline-4 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
            Discover now
          </button>
        </div>
        <img className="w-1/3" src={previewImg}></img>
      </div>
    </div>
  )
}
