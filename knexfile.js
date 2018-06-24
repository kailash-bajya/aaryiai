// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host:'ec2-54-163-229-212.compute-1.amazonaws.com',
      port:5432,
      database: 'd2vg6m8s06pq5a',
      user:     'gsvrushoseclob',
      password: 'd9823e9a5c3b7111912f46eefbe3b421ffb8ce674ca354d473ded6e9fa6e5d60'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host:'ec2-54-163-229-212.compute-1.amazonaws.com',
      port:5432,
      database: 'd2vg6m8s06pq5a',
      user:     'gsvrushoseclob',
      password: 'd9823e9a5c3b7111912f46eefbe3b421ffb8ce674ca354d473ded6e9fa6e5d60'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
