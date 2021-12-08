import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { useGlobal } from "../context/GlobalContext/use-global";

const TheHeaderDropdown = (props) => {
  const { globalData, setGlobalAuthorization } = useGlobal();

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={true}>
        <CIcon src={globalData.url} height={30} />
        <CLabel className="pr-2">
          {globalData.name.toUpperCase()}{" "}
        </CLabel>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem divider />
        <CDropdownItem
          onClick={() =>
            setGlobalAuthorization({ isAuthorized: false, token: "" })
          }
        >
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Гарах
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
