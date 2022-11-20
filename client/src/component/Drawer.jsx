import Sheet from 'react-modal-sheet';
import { useRef, useState } from 'react';

export default function Drawer() {
    const [isOpen, setOpen] = useState(false);

  return (
    <>
    <div className='w-40 h-8 bg-blue-800 flex rounded-md '>
        <button className='text-white m-auto'  onClick={() => setOpen(true)}>Open the drawer</button>
    </div>
      

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}
        snapPoints={[600]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <button onClick={() => setOpen(false)}>Drag or close here</button>
            
            </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
  