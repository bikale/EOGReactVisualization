// const initialState = { metrics: [] };

// export const reducer = (state = initialState, action: { type: any; metrics: any }) => {
//   switch (action.type) {
//     case 'GETMETRICS':
//       return { ...state, metrics: action.metrics };
//   }
// };

// const storeMetrics = (metricsList: any) => {
//   return {
//     type: 'GETMETRICS',
//     metrics: metricsList,
//   };
// };

// export const actions = { storeMetrics };

import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricsList = [];

const initialState = { metrics: [''] };
const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    storeMetrics: (state, action: PayloadAction<MetricsList>) => {
      state.metrics = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
