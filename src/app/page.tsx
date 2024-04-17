"use client";
import { UserRoundCog, UsersRound, BookUser } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import CountUp from "react-countup";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("api/allUserData");
      setData(res.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCountByRole = (role) => {
    return data.filter((user) => user.role === role).length.toString(); // Convert count to string
  };

  // Ensure data is loaded before rendering
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <PageTitle title="Dashboard" />
      <div className="grid grid-cols-4 gap-4 m-10">
        <Card
          icon={UserRoundCog}
          count={<CountUp start={0} end={getCountByRole("admin")}></CountUp>}
          title="Admin"
        />
        <Card
          icon={BookUser}
          count={<CountUp start={0} end={getCountByRole("teacher")}></CountUp>}
          title="Teacher"
        />
        <Card
          icon={UsersRound}
          count={<CountUp start={0} end={getCountByRole("student")}></CountUp>}
          title="Student"
        />
      </div>
    </div>
  );
}
