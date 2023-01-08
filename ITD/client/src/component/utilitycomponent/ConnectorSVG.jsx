import type2 from './../../assets/socketType2.svg'
import type2dark from './../../assets/socketType2dark.svg'
import ccs2 from './../../assets/socketTypeCCS2.svg'
import ccs2dark from './../../assets/socketTypeCCS2dark.svg'

function getSVGfromType(type) {
  switch (type) {
    case 'Type2':
      return [type2, type2dark]
    case 'CCS2':
      return [ccs2, ccs2dark]
    default:
      break
  }
}

export default function ConnectorSVG({ type }) {
  return (
    <>
      <div className="flex items-center justify-center ">
        <img
          src={getSVGfromType(type)[0]}
          className="p-1 h-12 dark:hidden"
        ></img>
      </div>
      <div className="flex items-center justify-center ">
        <img
          src={getSVGfromType(type)[1]}
          className="p-1 h-12 hidden dark:inline"
        ></img>
      </div>
    </>
  )
}
