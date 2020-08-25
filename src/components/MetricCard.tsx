import React from 'react';
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
function MetricCard() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const { metricsSelected } = useSelector((state: IState) => state.metricsList);
  return (
    <div>
      {metricsSelected && <h3>{metricsSelected}</h3>}
      {!metricsSelected && <h3>Please select a metrics</h3>}
    </div>
  );
}

export default MetricCard;
