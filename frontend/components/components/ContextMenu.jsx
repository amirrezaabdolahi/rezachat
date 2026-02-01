"use client";

import React from "react";
import { useSelector } from "react-redux";

const ContextMenu = () => {
    const messageForMenu = useSelector((s) => s.chat.optionMessage);

    if (!messageForMenu) {
        return;
    }

    

    return (
      <div>ContextMenu</div>
    );
};

export default ContextMenu;
