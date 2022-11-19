export default function WelcomeView() {
  return (
    <div className="py-20 from-dk-primary bg-gradient-to-t to-dk-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl lg:text-5xl font-bold mb-2 text-white dark:text-gray-800">
          Electric Mobility For All!
        </h2>
        <h3 className="text-xl sm:text-3xl mb-8 text-gray-200 dark:text-dk-secondary dark:text-opacity-90">
          Make your charging processes easy, non plan-ruiner and fun
        </h3>

        <button className="bg-white hover:outline-dk-primary dark:hover:outline-dk-secondary outline-none outline-4 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
          Discover now
        </button>
      </div>
    </div>
  )
}
