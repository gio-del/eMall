import { Link } from 'react-router-dom'

export default function BottomBar({ actualTab, setActualTab }) {
  return (
    <div className="absolute bottom-0 w-full">
      <ul className="inline-flex justify-around items-center w-full pt-1 bg-tertiary dark:bg-dk-secondary dark:text-tertiary text-sm">
        <li className="w-full">
          <Link
            onClick={() => setActualTab('map')}
            to="/main"
            className="w-full"
          >
            <div className="flex flex-col items-center dark:fill-tertiary w-full">
              <div
                class={`bg-${
                  actualTab == 'map' ? 'dk-primary' : 'transparent'
                } rounded-full flex w-1/2 justify-center items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="35"
                  width="35"
                  viewBox="-6 -6 60 60"
                >
                  <path d="M24 23.5q1.45 0 2.475-1.025Q27.5 21.45 27.5 20q0-1.45-1.025-2.475Q25.45 16.5 24 16.5q-1.45 0-2.475 1.025Q20.5 18.55 20.5 20q0 1.45 1.025 2.475Q22.55 23.5 24 23.5Zm0 16.55q6.65-6.05 9.825-10.975Q37 24.15 37 20.4q0-5.9-3.775-9.65T24 7q-5.45 0-9.225 3.75Q11 14.5 11 20.4q0 3.75 3.25 8.675Q17.5 34 24 40.05ZM24 44q-8.05-6.85-12.025-12.725Q8 25.4 8 20.4q0-7.5 4.825-11.95Q17.65 4 24 4q6.35 0 11.175 4.45Q40 12.9 40 20.4q0 5-3.975 10.875T24 44Zm0-23.6Z" />
                </svg>
              </div>
              Map
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link
            onClick={() => setActualTab('reservation')}
            to="./reservation"
            className="w-full"
          >
            <div className="flex flex-col items-center dark:fill-tertiary w-full">
              <div
                className={`bg-${
                  actualTab == 'reservation' ? 'dk-primary' : 'transparent'
                } rounded-full flex w-1/2 justify-center items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="35"
                  width="35"
                  viewBox="-6 -6 60 60"
                >
                  <path d="M7 40q-1.3 0-2.15-.85Q4 38.3 4 37v-7.65q1.85-.4 3.075-1.875T8.3 24q0-2-1.225-3.5T4 18.65V11q0-1.3.85-2.15Q5.7 8 7 8h34q1.3 0 2.15.85Q44 9.7 44 11v7.65q-1.85.35-3.075 1.85T39.7 24q0 2 1.225 3.475T44 29.35V37q0 1.3-.85 2.15Q42.3 40 41 40Zm0-3h34v-5.45q-1.9-1.3-3.1-3.25-1.2-1.95-1.2-4.3 0-2.35 1.2-4.3 1.2-1.95 3.1-3.25V11H7v5.45q1.95 1.3 3.125 3.25T11.3 24q0 2.35-1.175 4.3Q8.95 30.25 7 31.55Zm17-3.15q.6 0 1.05-.45.45-.45.45-1.05 0-.6-.45-1.05-.45-.45-1.05-.45-.6 0-1.05.45-.45.45-.45 1.05 0 .6.45 1.05.45.45 1.05.45Zm0-8.35q.6 0 1.05-.45.45-.45.45-1.05 0-.6-.45-1.05-.45-.45-1.05-.45-.6 0-1.05.45-.45.45-.45 1.05 0 .6.45 1.05.45.45 1.05.45Zm0-8.35q.6 0 1.05-.45.45-.45.45-1.05 0-.6-.45-1.05-.45-.45-1.05-.45-.6 0-1.05.45-.45.45-.45 1.05 0 .6.45 1.05.45.45 1.05.45ZM24 24Z" />
                </svg>
              </div>
              Reservation
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link
            onClick={() => setActualTab('car')}
            to="./car"
            className="w-full"
          >
            <div className="flex flex-col items-center dark:fill-tertiary w-full">
              <div
                className={`bg-${
                  actualTab == 'car' ? 'dk-primary' : 'transparent'
                } rounded-full flex w-1/2 justify-center items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="35"
                  width="35"
                  viewBox="-6 -8 60 60"
                >
                  <path d="M10 29.8v2.7q0 .65-.425 1.075Q9.15 34 8.5 34h-1q-.65 0-1.075-.425Q6 33.15 6 32.5V16.3l4.25-12.8q.15-.7.775-1.1Q11.65 2 12.4 2h23.2q.75 0 1.375.4t.775 1.1L42 16.3v16.2q0 .65-.425 1.075Q41.15 34 40.5 34h-1.05q-.65 0-1.075-.425-.425-.425-.425-1.075v-2.7Zm.15-16.5h27.7L35.1 5H12.9ZM9 16.3v10.5Zm5.3 8q1.15 0 1.925-.8.775-.8.775-1.9 0-1.15-.775-1.975-.775-.825-1.925-.825t-1.975.825q-.825.825-.825 1.975 0 1.15.825 1.925.825.775 1.975.775Zm19.45 0q1.15 0 1.975-.8.825-.8.825-1.9 0-1.15-.825-1.975-.825-.825-1.975-.825-1.15 0-1.925.825-.775.825-.775 1.975 0 1.15.8 1.925.8.775 1.9.775ZM25.8 46l-11.2-5.9H22v-3.8L33.4 42h-7.6ZM9 26.8h30V16.3H9Z" />
                </svg>
              </div>
              Car
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link
            onClick={() => setActualTab('profile')}
            to="./profile"
            className="w-full"
          >
            <div className="flex flex-col items-center dark:fill-tertiary w-full">
              <div
                className={`bg-${
                  actualTab == 'profile' ? 'dk-primary' : 'transparent'
                } rounded-full flex w-1/2 justify-center items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="35"
                  width="35"
                  viewBox="-6 -6 60 60"
                >
                  <path d="M24 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM8 40v-4.7q0-1.9.95-3.25T11.4 30q3.35-1.5 6.425-2.25Q20.9 27 24 27q3.1 0 6.15.775 3.05.775 6.4 2.225 1.55.7 2.5 2.05.95 1.35.95 3.25V40Zm3-3h26v-1.7q0-.8-.475-1.525-.475-.725-1.175-1.075-3.2-1.55-5.85-2.125Q26.85 30 24 30t-5.55.575q-2.7.575-5.85 2.125-.7.35-1.15 1.075Q11 34.5 11 35.3Zm13-16.05q1.95 0 3.225-1.275Q28.5 18.4 28.5 16.45q0-1.95-1.275-3.225Q25.95 11.95 24 11.95q-1.95 0-3.225 1.275Q19.5 14.5 19.5 16.45q0 1.95 1.275 3.225Q22.05 20.95 24 20.95Zm0-4.5ZM24 37Z" />
                </svg>
              </div>
              Profile
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}
