import React, { useEffect, useState } from 'react'
import CardAnalytics from './CardAnalytics'
import services from '../services/commonServices'

export default function Analytics() {
  const [departmentCount, setDepartmentCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("loggedAcademicTrackingAdmin"));

  useEffect(() => {
    services.setToken(user?.token);
    services.getDepartmentCount()
        .then((count) => {
          setDepartmentCount(count);
          console.log(count);
          console.log(typeof(count));
        })
        .catch(error => console.error("Error fetching programmes:", error));
  })

  return (
    <div>
      <CardAnalytics count = {departmentCount} />
      <CardAnalytics count = {departmentCount} />

    </div>
  )
}
