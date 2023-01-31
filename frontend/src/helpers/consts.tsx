export const ApiDomainUrl = process.env.REACT_APP_API_DOMAIN;
if (!ApiDomainUrl) { throw Error("API domain URL is not defined in the configuration"); }

export const ApiKey = process.env.REACT_APP_API_KEY;
if (!ApiKey) { throw Error("Unauthorized API request"); }

export const NEWS_FEED_DATE_FULL_FORMAT = 'YYYY-MM-DD HH:mm';
export const NEWS_FEED_DATE_COMPACT_FORMAT = 'YYYYMMDD';
export const NEWS_FEED_DATE_FORMAT = 'YYYY-MM-DD';

export const PLEASE_WAIT = 'Please wait. Fetching data...';


