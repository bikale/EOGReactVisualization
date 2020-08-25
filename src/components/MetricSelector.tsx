import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Provider, createClient, useQuery } from 'urql';
import { actions } from '../Features/Dashboard/reducer';
import {
  CardHeader,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  Theme,
  createStyles,
  MenuItem,
  FormHelperText,
  LinearProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
  query{
    getMetrics
   }
  `;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default () => {
  return (
    <Provider value={client}>
      <MetricSelector />
    </Provider>
  );
};

const MetricSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { metrics } = useSelector((state: IState) => state.metricsList);
  console.log('whole store', metrics);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setMetrics(event.target.value as string);
  };
  const [result] = useQuery({
    query,
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      console.log(error);
      // dispatch(actions.weatherApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    console.log(getMetrics);
    dispatch(actions.storeMetrics(getMetrics));
  }, [data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="metricsselected">Metrics</InputLabel>
      <Select labelId="metricsselected" id="metricsselect" value={metrics} onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {metrics.map(list => (
          <MenuItem value={list}>{list}</MenuItem>
        ))}
      </Select>
      <FormHelperText>select one of the metrics</FormHelperText>
    </FormControl>
  );
};
