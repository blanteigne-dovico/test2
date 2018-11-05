import React from "react";
import MainWindow from "../views/windows/main";
import AboutWindow from "../views/windows/about";
import SpecialWindow from "../views/windows/special_window";
import SpecialLayout from "../views/layouts/special";
export default {
  "": <MainWindow />,
  about: <AboutWindow />,
  special: <SpecialWindow layout={SpecialLayout} />
};
