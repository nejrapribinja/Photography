import Home from './components/Home';
import { Route, Routes, Navigate } from "react-router-dom";
import AllImages from './components/AllImages';
import DateForm from './components/Form';
import Login from './components/Administrator/Login';
import AddAdmin from './components/Administrator/AddAdmin';
import AddPhoto from './components/Administrator/AddPhoto';
import EditEvents from './components/Administrator/EditEvents';
import ShowDates from './components/Administrator/ShowDates';
import PrivateRoutes from './components/utils/PrivateRoutes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allImages" element={<AllImages />} />
      <Route path="/dateForm" element={<DateForm />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/showDates" element={<ShowDates />} />
        <Route path="/addAdmin" element={<AddAdmin />} />
        <Route path="/addPhoto" element={<AddPhoto />} />
        <Route path="/editEvents" element={<EditEvents />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
