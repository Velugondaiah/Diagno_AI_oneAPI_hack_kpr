import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';

import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import Services from "./components/Services";
import NotFound from "./components/NotFound";
import ProtestComp from "./components/ProtestComp"
import HomeContent from './components/HomeContent';
import AnalyseReports from './components/AnalyseReports';
import DoctorsList from './components/DoctorsList';
import Appointments from './components/Appointments';
import XrayReport from './components/XrayReport';
import FileUpload from './components/FileUpload';
import ReportAnalysis from './components/ReportAnalysis';




const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup"  component={SignUp}/>
      <ProtestComp exact path="/" component={Home} />
      <ProtestComp exact path="/about-us" component={Services} />
      <ProtestComp exact path="/services" component={AboutUs} />
      <ProtestComp exact path ="/home-content" component = {HomeContent} />
      <ProtestComp exact path = "/reports" component = {AnalyseReports} />
      <ProtestComp exact path = "/x-ray-reports" component = {XrayReport} />
      <ProtestComp exact path = "/doctors-details"  component = {DoctorsList} />
      <ProtestComp to ="/appointments" component={Appointments} />
      <ProtestComp path="/not-found" component={NotFound} />
      <Route path="/profile" component={Profile} />
      <FileUpload />
      <ReportAnalysis />
    </Switch>
  </BrowserRouter>
 

);

export default App;
