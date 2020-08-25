import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader, makeStyles } from "@material-ui/core";
import MetricSelector from "../../components/MetricSelector";

const useStyles = makeStyles({
  card: {
    margin: "5% 25%",
  },
});
function Dashboard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Please select metrics" />
      <CardContent>
        <MetricSelector />
      </CardContent>
    </Card>
  );
}

export default Dashboard;
