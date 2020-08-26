import React, { useEffect, useRef } from 'react';
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
  Grid,
  Paper,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const query = `
  query($input: MeasurementQuery) {
    getMeasurements(input: $input) {
      metric
      at
      value
      unit
    }
   }
  `;

export default () => {
  return (
    <Provider value={client}>
      <MetricCard />
    </Provider>
  );
};

const MetricCard = () => {
  const { metricsSelected, currentTime } = useSelector((state: IState) => state.metricsList);
  const dispatch = useDispatch();
  const metricQuery = { metricName: metricsSelected, after: currentTime }; //1800000 => 30min
  const [result] = useQuery({
    query,
    variables: {
      input: metricQuery,
    },
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    console.log(metricsSelected);
    console.log(currentTime);
    if (!metricsSelected) return;
    if (error) {
      console.log(error);
      // dispatch(actions.weatherApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMeasurements } = data;
    console.log(getMeasurements);
    dispatch(actions.storeSelectedMeasurements(getMeasurements));
  }, [data, error]);

  return (
    <Provider value={client}>
      <div>
        {metricsSelected && <h3>{metricsSelected}</h3>}
        {!metricsSelected && <h3>Please select a metrics</h3>}
      </div>
    </Provider>
  );
};
