/**
 * Types specific to the CUMTD API
 */

// parameterized by response data type
type CumtdApiResponse<T> =  {
  changeset_id: string;
  new_changeset?: boolean;
  time: string;
  status: {
    code: number;
    msg: string;
  };
  rqst: {
    method: string;
    params: object;
  };
} & {
  // This also contains the data. However, the shape of it is variable.
  [Key in keyof T]: T[Key];
}

export type { CumtdApiResponse };
