import Sheet from 'react-modal-sheet'
import { useState } from 'react'
import './Drawer.css'
import DrawerContent from './DrawerContent'

export default function Drawer({ isOpen, setIsOpen }) {
  const [connectors, setConnectors] = useState([])

  const getConnectors = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/driver/search`)
      const jsonData = await response.json()
      setConnectors(jsonData)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Sheet
      isOpen={isOpen}
      onOpenStart={() => getConnectors()}
      onClose={() => setIsOpen(false)}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <DrawerContent
            CPOName={'Ionity'}
            Address={'Via Gran Sasso, 1, Milano'}
            Connectors={connectors}
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  )
}
