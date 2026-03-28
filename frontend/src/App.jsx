import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;

// Student dashboard:
/* 
  Dashboard: Current gropus ( max 3 ,more routes to all groups) and current assignments( max 3, more routes to all assignments)
  Groups: All groups info ; create group function
  Group:id: group info, members info, assignments info, submission function
  Assignments: All assignments info

*/

//Admin dashboard:
/* 
  Dashboard: Groups(Total Groups> Links to group page, Total Assignments>Links to assignments page, Analytics of assignment submmistion: Submisstion rate(graph of total submission against total assignments that crossed due date))

  Groups: Displays all created groups and total members in that group,, date created 

  Assignments: Displays all created assignments and ther status: Active/Overdue, Submissions by groups and the link to view submission  

  */
