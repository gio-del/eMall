export default function DirectionButtonUtility({source,destination}) {
  return (
    <div class="inline-flex items-center justify-center">
      <a href={`https://www.google.com/maps/dir/${source.join(',')}/${destination.join(',')}`} target="_blank" rel="noopener"
        className="w-full inline-flex justify-between items-center px-4 h-11 rounded-full border-[1px] dark:border-tertiary border-dk-secondary font-light  dark:text-tertiary text-dk-secondary"
      >
        <div class="inline-flex justify-between items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            width="48"
            className="fill-dk-secondary dark:fill-tertiary"
            viewBox="10 -12 50 70"
          >
            <path d="M16 30h3v-6.5h9.2v4.25L34 22l-5.8-5.8v4.3H17.5q-.65 0-1.075.425Q16 21.35 16 22Zm8 14.15q-.6 0-1.175-.2-.575-.2-.975-.6l-17.2-17.2q-.4-.4-.6-.975-.2-.575-.2-1.175 0-.6.2-1.175.2-.575.6-.975l17.2-17.2q.4-.4.975-.6.575-.2 1.175-.2.6 0 1.175.2.575.2.975.6l17.2 17.2q.4.4.6.975.2.575.2 1.175 0 .6-.2 1.175-.2.575-.6.975l-17.2 17.2q-.4.4-.975.6-.575.2-1.175.2Z" />
          </svg>
          Directions
        </div>
      </a>
    </div>
  )
}
