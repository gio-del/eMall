export default function SearchBar() {
  return (
    <div className="flex flex-col justify-start mx-2 border-2 border-searchInput drop-shadow-2xl bg-tertiary dark:bg-dk-secondary rounded-2xl mb-4 shadow-lg p-4">
      <div className="flex items-center justify-center mb-3">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md dark:bg-searchInput text-[15px] placeholder-gray-500 dark:placeholder-dk-secondary placeholder:font-semibold p-3 focus:outline-0"
        />
        <svg
          className="absolute right-7 dark:fill-dk-secondary fill-searchInput"
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          width="30"
          viewBox="0 0 60 40"
        >
          <path d="m26.35 42-5.7-14.65L6 21.65V19.5L42 6 28.5 42Zm.9-5.7 9.6-25.15-25.1 9.6 11.2 4.3Zm-4.3-11.25Z" />
        </svg>
      </div>
      <div className="flex flex-row">
        <svg
          className="fill-searchInput"
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          width="30"
          viewBox="0 0 60 50"
        >
          <path d="M21.35 42V30.75h3v4.15H42v3H24.35V42ZM6 37.9v-3h12.35v3Zm9.35-8.3v-4.1H6v-3h9.35v-4.2h3v11.3Zm6-4.1v-3H42v3Zm8.3-8.25V6h3v4.1H42v3h-9.35v4.15ZM6 13.1v-3h20.65v3Z" />
        </svg>
        <button className="dark:bg-tertiary bg-dk-primary border-1 rounded-md ml-2 px-6 font-semibold text-[14.5px] text-tertiary dark:text-dk-secondary">
          04 November
        </button>
        <button className="dark:bg-tertiary bg-dk-primary border-1 rounded-md ml-2 px-6 font-semibold text-[14.5px] text-tertiary dark:text-dk-secondary">
          CCS2
        </button>
      </div>
    </div>
  )
}
