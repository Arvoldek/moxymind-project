// Response schema definitions for ReqRes API

export const USER_SCHEMA = {
  id: 'number',
  email: 'string',
  first_name: 'string',
  last_name: 'string',
  avatar: 'string',
};

export const USERS_LIST_SCHEMA = {
  page: 'number',
  per_page: 'number',
  total: 'number',
  total_pages: 'number',
  data: 'arrayOf',
  support: {
    url: 'string',
    text: 'string',
  },
};

export const CREATE_USER_RESPONSE_SCHEMA = {
  name: 'string',
  job: 'string',
  id: 'string',
  createdAt: 'string',
};

// Full nested schema for users list
export const FULL_USERS_SCHEMA = {
  page: 'number',
  per_page: 'number',
  total: 'number',
  total_pages: 'number',
  data: {
    arrayOf: USER_SCHEMA,
  },
  support: {
    url: 'string',
    text: 'string',
  },
};
