import { useState } from "react";
import TabSelectorDash from "../utilitycomponent/TabSelectorDash";

export default function RatesTab({evcpList}) {
  const [currentEvcp, setCurrentEvcp] = useState('evcp1')

  return <>
  <div>
    <TabSelectorDash
      tabs={evcpList}
      currentTab={currentEvcp}
      setCurrentTab={setCurrentEvcp}
    />
  </div>
  </>
}
