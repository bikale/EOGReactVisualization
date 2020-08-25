import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import MetricSelector from '../../components/MetricSelector';
import MetricCard from '../../components/MetricCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '90%',
    },
    card: {
      margin: '5% 25%',
    },
  }),
);

function Dashboard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Please select metrics" />
      <CardContent>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <MetricSelector />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <MetricCard />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <p>chart goes here</p>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
