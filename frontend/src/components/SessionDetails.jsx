import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import services from '../services/admin'
import CardAnalytics from './CardAnalytics';
import SideBar from './SideBar';

export default function SessionDetails() {
  const { id } = useParams();
  const [session, setSession] = useState([]);
  const [details, setDetails] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin") || localStorage.getItem("loggedAcademicTrackingUser"));

  useEffect(() => {
    services.setToken(user.token);
    services
        .getSession(id)
        .then((data) => {
            setSession(data);
            console.log(data);
        })
        .catch((error) => console.error("Error fetching session: ", error));
    services
      .getSessionDetails(id)
      .then((data) => {
        setDetails(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching details of Session:", error));
  }, []);

  

  return (
    <SideBar>
      <Typography variant="h4" component="h4" className='typography-detail'>
        {`Courses offered in ${session.season.toUpperCase()} ${session.start_year}`}
      </Typography>
      <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className="grid-container"
            >
                {details.map((detail) => (
                    <Grid item xs={2} sm={4} md={4} key={`${detail.course_id} ${detail.instructor_id}`} onClick={ () => handleClick(detail.id)}>
                        {/* <Item><CardAnalytics title={department.name}/></Item> */}
                        <CardAnalytics
                            title={`${detail.code} ${detail.title}`} subTitle={`${detail.name}`}
                            // image_src={Department}
                        />
                    </Grid>
                ))}
            </Grid>
    </SideBar>
  );
}
