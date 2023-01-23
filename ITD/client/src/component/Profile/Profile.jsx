import useWindowDimensions from '../Car/useWindowDimensions'

export default function Profile() {
  const { height, width } = useWindowDimensions()

  return (
    <>
      <div
        className="flex flex-col"
        style={{ height: `calc(${height}px - 3.5rem` }}
      >
        <div className="flex justify-center items-center mt-5 mb-20">
          <p className="font-medium text-2xl dark:text-tertiary bg-dk-secondary">
            Profile
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center">
            <div className="flex flex-row justify-between items-center rounded-2xl mb-4 py-2 px-8  w-full md:w-[28%]">
              <div className="flex flex-row">
                <div className="mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-white"
                    height="48"
                    width="48"
                    viewBox="-12 -12 72 72"
                  >
                    <path d="M24 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM8 40v-4.7q0-1.9.95-3.25T11.4 30q3.35-1.5 6.425-2.25Q20.9 27 24 27q3.1 0 6.15.775 3.05.775 6.4 2.225 1.55.7 2.5 2.05.95 1.35.95 3.25V40Zm3-3h26v-1.7q0-.8-.475-1.525-.475-.725-1.175-1.075-3.2-1.55-5.85-2.125Q26.85 30 24 30t-5.55.575q-2.7.575-5.85 2.125-.7.35-1.15 1.075Q11 34.5 11 35.3Zm13-16.05q1.95 0 3.225-1.275Q28.5 18.4 28.5 16.45q0-1.95-1.275-3.225Q25.95 11.95 24 11.95q-1.95 0-3.225 1.275Q19.5 14.5 19.5 16.45q0 1.95 1.275 3.225Q22.05 20.95 24 20.95Zm0-4.5ZM24 37Z" />
                  </svg>
                </div>
                <div className="flex-col justify-center">
                  <div className="font-normal text-[22px] dark:text-tertiary">
                    Account
                  </div>
                  <div className="font-thin text-sm dark:text-tertiary">
                    Manage profile information
                  </div>
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                  height="48"
                  width="48"
                  viewBox="-12 -12 72 72"
                >
                  <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-row justify-between items-center rounded-2xl mb-4 py-2 px-8  w-full md:w-[28%]">
              <div className="flex flex-row">
                <div className="mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-white"
                    height="48"
                    width="48"
                    viewBox="-12 -12 72 72"
                  >
                    <path d="M44 11v26q0 1.2-.9 2.1-.9.9-2.1.9H7q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1ZM7 16.45h34V11H7Zm0 6.45V37h34V22.9ZM7 37V11v26Z" />
                  </svg>
                </div>
                <div className="flex-col justify-center">
                  <div className="font-normal text-[22px] dark:text-tertiary">
                    Payments
                  </div>
                  <div className="font-thin text-sm dark:text-tertiary">
                    Credit card
                  </div>
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                  height="48"
                  width="48"
                  viewBox="-12 -12 72 72"
                >
                  <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-row justify-between items-center rounded-2xl mb-4 py-2 px-8  w-full md:w-[28%]">
              <div className="flex flex-row">
                <div className="mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-white"
                    height="48"
                    width="48"
                    viewBox="-12 -12 72 72"
                  >
                    <path d="M44 11v26q0 1.2-.9 2.1-.9.9-2.1.9H7q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1ZM7 16.45h34V11H7Zm0 6.45V37h34V22.9ZM7 37V11v26Z" />
                  </svg>
                </div>
                <div className="flex-col justify-center">
                  <div className="font-normal text-[22px] dark:text-tertiary">
                    Settings
                  </div>
                  <div className="font-thin text-sm dark:text-tertiary">
                    Dark Mode,...
                  </div>
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                  height="48"
                  width="48"
                  viewBox="-12 -12 72 72"
                >
                  <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
