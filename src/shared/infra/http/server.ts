/* eslint-disable no-console */
import { app } from './app';

app.listen(process.env.PORT, () => {
  console.log(`🚀 server started on port ${process.env.PORT}`);
});
