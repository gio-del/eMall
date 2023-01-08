import { useMap } from 'react-leaflet'

export default function LocateMeControl({
  setLatitude,
  setLongitude,
  setGPSok,
}) {
  const map = useMap()

  function handleLocation() {
    map
      .locate({
        setView: true,
        watch: true,
      }) /* This will return map so you can do chaining */
      .on('locationfound', function (e) {
        setLatitude(e.latitude)
        setLongitude(e.longitude)
        setGPSok(true)
        map.stopLocate()
      })
      .on('locationerror', function (e) {
        console.log(e)
        //alert('Location access denied.')
      })
  }

  return (
    <button
      onClick={() => handleLocation()}
      className="outline-none outline-offset-0 outline-[rgb(0,0,0,0.2)] p-0 w-10 h-10 bg-white rounded-full hover:bg-[f4f4f4] active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="50"
        width="50"
        viewBox="-4.5 15.5 70 30"
      >
        <path d="M22.5 45.9v-3.75q-6.85-.7-11.4-5.25-4.55-4.55-5.25-11.4H2.1v-3h3.75q.7-6.85 5.25-11.4 4.55-4.55 11.4-5.25V2.1h3v3.75q6.85.7 11.4 5.25 4.55 4.55 5.25 11.4h3.75v3h-3.75q-.7 6.85-5.25 11.4-4.55 4.55-11.4 5.25v3.75Zm1.5-6.7q6.25 0 10.725-4.475T39.2 24q0-6.25-4.475-10.725T24 8.8q-6.25 0-10.725 4.475T8.8 24q0 6.25 4.475 10.725T24 39.2Zm0-7.7q-3.15 0-5.325-2.175Q16.5 27.15 16.5 24q0-3.15 2.175-5.325Q20.85 16.5 24 16.5q3.15 0 5.325 2.175Q31.5 20.85 31.5 24q0 3.15-2.175 5.325Q27.15 31.5 24 31.5Zm0-3q1.9 0 3.2-1.3 1.3-1.3 1.3-3.2 0-1.9-1.3-3.2-1.3-1.3-3.2-1.3-1.9 0-3.2 1.3-1.3 1.3-1.3 3.2 0 1.9 1.3 3.2 1.3 1.3 3.2 1.3Zm0-4.5Z" />
      </svg>
    </button>
  )
}
