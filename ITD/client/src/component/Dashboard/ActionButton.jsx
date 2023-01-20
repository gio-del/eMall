import IconSVG from "./IconSVG";
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

export default function ActionButton ({background, data}) {
    return <>
        <div className={`${background == "bg-black" ? "bg-gradient-to-b from-dk-secondary to-dk-nav"  : "bg-white"} hover:shadow-lg rounded-2xl flex place-items-stretch justify-center xl:p-6 lg:p-4 h-full`}>
            <div className="flex flex-col w-full content-between">
                <div className="flex grow justify-between items-center">
                    <div className={`${data.colorBGsvg} grow-0 p-2 rounded-xl flex items-center`}>
                        <IconSVG src={getSVGfromType(data.svgType)} className="fill-white" />
                    </div>
                    <div className="flex items-center">
                        <div className="flex flex-col">
                            <p className={`${background == "bg-black" ? "text-dash-gray"  : "text-dash-black" } font-semibold text-sm`}>{data.title}</p>
                            <p className={`${background == "bg-black" ? "text-dash-gray"  : "text-dash-black" } font-semibold text-sm italic`}>{data.subtitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <IconSVG src={arrow} className={`${background == "bg-black" ? "fill-dash-gray"  : "fill-dash-black" }`} />
                    </div>
                </div>
                <div className="flex grow items-center justify-start">
                    <p className={`${background == "bg-black" ? "text-dash-gray"  : "text-dash-black" } font-semibold text-2xl`}>{data.content}</p>
                </div>
                <div className="flex grow items-center">
                    <IconSVG src={chart} className={`${background == "bg-black" ? "fill-dash-gray"  : "fill-dash-black" }`} />
                    <p className={`${background == "bg-black" ? "text-dash-gray"  : "text-dash-black" } font-normal text-sm ml-3`}>{data.bottomTitle}</p>
                </div>
            </div>
            
        </div>
    
    </>
}