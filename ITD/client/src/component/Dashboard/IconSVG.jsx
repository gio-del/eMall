import { ReactSVG } from 'react-svg'

export default function IconSVG({ src, className }) {
  return (
    <ReactSVG
      src={src}
      afterInjection={(_err, svg) => {
        svg.classList.add(className)
        svg.style.width = '30px'
        svg.style.height = '30px'
      }}
    />
  )
}
