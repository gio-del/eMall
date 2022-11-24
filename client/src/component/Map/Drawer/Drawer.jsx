import Sheet from 'react-modal-sheet'
import { useRef } from 'react'
import './Drawer.css'
import DrawerContent from './DrawerContent'

export default function Drawer({ isOpen, setIsOpen }) {

  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      detent="content-height"
      
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <DrawerContent
            CPOName={'Ionity'}
            Address={'Via Gran Sasso, 1, Milano'}
            Connectors={[
              {
                type: 'CCS2',
                power: '110 kW',
                price: '1,50$/h + 0,92$/kW',
                totalSockets: 1,
                availableSockets: 1,
              },
              {
                type: 'Type2',
                power: '50 kW',
                price: '1,50$/h + 0,94$/kW',
                totalSockets: 2,
                availableSockets: 1,
              },
            ]}
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  )
}
