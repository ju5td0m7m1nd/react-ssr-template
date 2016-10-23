const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'

export default {
  development: {
    endpoint: "http://163.29.157.32:8080/api/3/action/datastore_search?resource_id=8f6fcb24-290b-461d-9d34-72ed1b3f51f0"
  },
  production: {
    endpoint: "http://163.29.157.32:8080/api/3/action/datastore_search?resource_id=8f6fcb24-290b-461d-9d34-72ed1b3f51f0"
  }
}[env]
