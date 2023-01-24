import { useState } from "react";
import TabSelectorDash from "../utilitycomponent/TabSelectorDash";

export default function EnergyTab({evcpList}) {
  const [currentEvcp, setCurrentEvcp] = useState('evcp1')

  return <>
  <TabSelectorDash 
    tabs={evcpList}
    currentTab={currentEvcp}
    setCurrentTab={setCurrentEvcp}
  />
  </>
}
