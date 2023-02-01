import IconSVG from './IconSVG'
import shop from '../../assets/dashboard/shop.svg'
import arrow from '../../assets/dashboard/right_arrow.svg'
import chart from '../../assets/dashboard/chart.svg'
import cps from '../../assets/dashboard/cps.svg'
import energy from '../../assets/dashboard/energy.svg'

function getSVGfromType(type) {
  switch (type) {
    case 'shop':
      return shop
    case 'cp':
      return cps
    case 'dso':
      return energy
    default:
      break
  }
}

export default function ActionButton({ background, data, content }) {
  return (
    <>
      <div
        className={`${
          background == 'bg-black'
            ? 'bg-gradient-to-b from-dk-secondary to-dk-nav'
            : 'bg-white'
        } relative  hover:shadow-lg rounded-2xl flex place-items-stretch justify-center h-full`}
      >
        <div className="flex flex-col content-between absolute left-0 top-0 w-full h-full p-4">
          <div className="flex grow justify-between items-center">
            <div
              className={`${data.colorBGsvg} grow-0 p-2 rounded-xl flex items-center`}
            >
              <IconSVG
                src={getSVGfromType(data.svgType)}
                className="fill-white"
              />
            </div>
            <div className="flex items-center">
              <div className="flex flex-col">
                <p
                  className={`${
                    background == 'bg-black'
                      ? 'text-dash-gray'
                      : 'text-dash-black'
                  } font-semibold text-sm`}
                >
                  {data.title}
                </p>
                <p
                  className={`${
                    background == 'bg-black'
                      ? 'text-dash-gray'
                      : 'text-dash-black'
                  } font-semibold text-sm italic`}
                >
                  {data.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <IconSVG
                src={arrow}
                className={`${
                  background == 'bg-black'
                    ? 'fill-dash-gray'
                    : 'fill-dash-black'
                }`}
              />
            </div>
          </div>
          <div className="flex grow items-center justify-center 2xl:mt-6">
            <p
              className={`${
                background == 'bg-black' ? 'text-dash-gray' : 'text-dash-black'
              } font-semibold text-xl`}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
