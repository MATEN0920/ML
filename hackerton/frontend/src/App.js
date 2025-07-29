import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstMain from "./pages/FirstMain";
import Login from "./pages/Login";
import LoginStep1 from "./pages/LoginStep1";
import LoginStep2 from "./pages/LoginStep2";
import Loading1 from "./pages/Loading1";
import Loading2 from "./pages/Loading2";
import HouseStep1 from "./pages/HouseStep1";
import HouseStep2 from "./pages/HouseStep2";
import HouseStep3 from "./pages/HouseStep3";
import HouseStep4 from "./pages/HouseStep4";
import HouseStep5 from "./pages/HouseStep5";
import HouseStep501 from "./pages/HouseStep501";
import SecondMain from "./pages/SecondMain";
import ThirdMain from "./pages/ThirdMain";
import Scenario01 from "./pages/Scenario01";
import Scenario02 from "./pages/Scenario02";
import Scenario0201 from "./pages/Scenario0201";
import Scenario0202 from "./pages/Scenario0202";
import Scenario0203 from "./pages/Scenario0203";
import Scenario03 from "./pages/Scenario03";
import Scenario04 from "./pages/Scenario04";
import Scenario05 from "./pages/Scenario05";
import Scenario06 from "./pages/Scenario06";
import Scenario07 from "./pages/Scenario07";
import Scenario08 from "./pages/Scenario08";
import Scenario09 from "./pages/Scenario09";
import Scenario10 from "./pages/Scenario10";
import Scenario11 from "./pages/Scenario11";
import Scenario12 from "./pages/Scenario12";
import Scenario13 from "./pages/Scenario13";
import Scenario14 from "./pages/Scenario14";
import Scenario1401 from "./pages/Scenario1401";
import Scenario1402 from "./pages/Scenario1402";
import Scenario1403 from "./pages/Scenario1403";
import Scenario1404 from "./pages/Scenario1404";
import Scenario15 from "./pages/Scenario15";
import Scenario16 from "./pages/Scenario16";
import Scenario17 from "./pages/Scenario17";
import Scenario18 from "./pages/Scenario18";
import Scenario19 from "./pages/Scenario19";
import Scenario20 from "./pages/Scenario20";
import Scenario21 from "./pages/Scenario21";
import Scenario22 from "./pages/Scenario22";
import Scenario23 from "./pages/Scenario23";
import Scenario24 from "./pages/Scenario24";
import CompleteScenario from "./pages/CompleteScenario";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginstep1" element={<LoginStep1 />} />
        <Route path="/loginstep2" element={<LoginStep2 />} />
        <Route path="/loading1" element={<Loading1 />} />
        <Route path="/loading2" element={<Loading2 />} />
        <Route path="/housestep1" element={<HouseStep1 />} />
        <Route path="/housestep2" element={<HouseStep2 />} />
        <Route path="/scenario0201" element={<Scenario0201 />} />
        <Route path="/scenario0202" element={<Scenario0202 />} />
        <Route path="/scenario0203" element={<Scenario0203 />} />
        <Route path="/housestep3" element={<HouseStep3 />} />
        <Route path="/housestep4" element={<HouseStep4 />} />
        <Route path="/housestep5" element={<HouseStep5 />} />
        <Route path="/housestep501" element={<HouseStep501 />} />
        <Route path="/main" element={<SecondMain />} />
        <Route path="/firemain" element={<ThirdMain />} />
        <Route path="/scenario01" element={<Scenario01 />} />
        <Route path="/scenario02" element={<Scenario02 />} />
        <Route path="/scenario03" element={<Scenario03 />} />
        <Route path="/scenario04" element={<Scenario04 />} />
        <Route path="/scenario05" element={<Scenario05 />} />
        <Route path="/scenario06" element={<Scenario06 />} />
        <Route path="/scenario07" element={<Scenario07 />} />
        <Route path="/scenario08" element={<Scenario08 />} />
        <Route path="/scenario09" element={<Scenario09 />} />
        <Route path="/scenario10" element={<Scenario10 />} />
        <Route path="/scenario11" element={<Scenario11 />} />
        <Route path="/scenario12" element={<Scenario12 />} />
        <Route path="/scenario13" element={<Scenario13 />} />
        <Route path="/scenario14" element={<Scenario14 />} />
        <Route path="/scenario1401" element={<Scenario1401 />} />
        <Route path="/scenario1402" element={<Scenario1402 />} />
        <Route path="/scenario1403" element={<Scenario1403 />} />
        <Route path="/scenario1404" element={<Scenario1404 />} />
        <Route path="/scenario15" element={<Scenario15 />} />
        <Route path="/scenario16" element={<Scenario16 />} />
        <Route path="/scenario17" element={<Scenario17 />} />
        <Route path="/scenario18" element={<Scenario18 />} />
        <Route path="/scenario19" element={<Scenario19 />} />
        <Route path="/scenario20" element={<Scenario20 />} />
        <Route path="/scenario21" element={<Scenario21 />} />
        <Route path="/scenario22" element={<Scenario22 />} />
        <Route path="/scenario23" element={<Scenario23 />} />
        <Route path="/scenario24" element={<Scenario24 />} />
        <Route path="/completescenario" element={<CompleteScenario />} />
      </Routes>
    </Router>
  );
}

export default App;
