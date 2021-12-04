import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="http://www.alhay.mn" target="_blank" rel="noopener noreferrer">
          Walk With Me LLC
        </a>
        <span className="ml-1">&copy; 2020-{new Date().getFullYear()}</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Admin Web by</span>
        <a
          href="http://naranbat7.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          ᴺᵁᴹ| ռǟ ɮǟ
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
