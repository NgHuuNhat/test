
// # Server
// HOST=0.0.0.0
// PORT=1337

// # Secrets
// APP_KEYS=vZJMwvqLhoKZkpSsw+YEUw==,FCgEcN0syFSlLt8NQLk0pw==,Ob5uf8xtM+SyUK5BjY3uHA==,UzbDT4/OvP1a4M85qU58+A==
// API_TOKEN_SALT=Nxb7pEvREk34ZgI6OcUngQ==
// ADMIN_JWT_SECRET=2OjXWzwU4R6Nojh5Mieo3w==
// TRANSFER_TOKEN_SALT=zYU8U7MTpCuOGpNLxHqBLA==

// # Database
// # DATABASE_CLIENT=sqlite
// # DATABASE_HOST=
// # DATABASE_PORT=
// # DATABASE_NAME=
// # DATABASE_USERNAME=
// # DATABASE_PASSWORD=
// # DATABASE_SSL=false
// # DATABASE_FILENAME=.tmp/data.db
// # JWT_SECRET=d+OpnGMYPbvc42oksq1UyQ==
// # JWT_SECRET=oEDjGtVbo4vfIObxKLxU4Q==

// # Database
// DATABASE_CLIENT=postgres
// DATABASE_URL=postgresql://my_strapi_db_ew77_user:Q68bwpTzyOe7Hr90CScykbkZwv3fEHzy@dpg-cvl46pogjchc73fq4hj0-a/my_strapi_db_ew77
// USERS_PERMISSIONS_JWT_SECRET=node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
// DATABASE_HOST=dpg-cvl46pogjchc73fq4hj0-a
// DATABASE_PORT=5432
// DATABASE_NAME=my_strapi_db_ew77
// DATABASE_USERNAME=my_strapi_db_ew77_user
// DATABASE_PASSWORD=Q68bwpTzyOe7Hr90CScykbkZwv3fEHzy
// DATABASE_SSL=false
// JWT_SECRET=d+OpnGMYPbvc42oksq1UyQ==

// #acc count strapi
// #username: nhat200901@gmail.com
// #pass: hcmak1bc@




//





// import path from 'path';

// export default ({ env }) => {
//   const client = env('DATABASE_CLIENT', 'sqlite');

//   const connections = {
//     mysql: {
//       connection: {
//         host: env('DATABASE_HOST', 'localhost'),
//         port: env.int('DATABASE_PORT', 3306),
//         database: env('DATABASE_NAME', 'strapi'),
//         user: env('DATABASE_USERNAME', 'strapi'),
//         password: env('DATABASE_PASSWORD', 'strapi'),
//         ssl: env.bool('DATABASE_SSL', false) && {
//           key: env('DATABASE_SSL_KEY', undefined),
//           cert: env('DATABASE_SSL_CERT', undefined),
//           ca: env('DATABASE_SSL_CA', undefined),
//           capath: env('DATABASE_SSL_CAPATH', undefined),
//           cipher: env('DATABASE_SSL_CIPHER', undefined),
//           rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
//         },
//       },
//       pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
//     },
//     postgres: {
//       connection: {
//         connectionString: env('DATABASE_URL'),
//         host: env('DATABASE_HOST', 'localhost'),
//         port: env.int('DATABASE_PORT', 5432),
//         database: env('DATABASE_NAME', 'strapi'),
//         user: env('DATABASE_USERNAME', 'strapi'),
//         password: env('DATABASE_PASSWORD', 'strapi'),
//         ssl: env.bool('DATABASE_SSL', false) && {
//           key: env('DATABASE_SSL_KEY', undefined),
//           cert: env('DATABASE_SSL_CERT', undefined),
//           ca: env('DATABASE_SSL_CA', undefined),
//           capath: env('DATABASE_SSL_CAPATH', undefined),
//           cipher: env('DATABASE_SSL_CIPHER', undefined),
//           rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
//         },
//         schema: env('DATABASE_SCHEMA', 'public'),
//       },
//       pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
//     },
//     sqlite: {
//       connection: {
//         filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//       },
//       useNullAsDefault: true,
//     },
//   };

//   return {
//     connection: {
//       client,
//       ...connections[client],
//       acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
//     },
//   };
// };



import React from 'react'

export default function test() {
  return (
    <div>
      
    </div>
  )
}