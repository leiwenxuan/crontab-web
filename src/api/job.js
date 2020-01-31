import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
// const baseUrl = 'http://192.168.1.5:10110'
export function getJobList(params) {
  return request({
    url: '/v1/master/job/list',
    method: 'get',
    params
  })
}

export function getLogList(params) {
  return request({
    url: '/v1/master/job/log',
    method: 'get',
    params
  })
}

export function getJobSave(data) {
  return request({
    url: '/v1/master/job/save',
    method: 'post',
    data
  })
}

export function getJobDelete(data) {
  return request({
    url: '/v1/master/job/delete',
    method: 'post',
    data
  })
}

export function getJobKill(data) {
  return request({
    url: '/v1/master/job/kill',
    method: 'post',
    data
  })
}

export function getWorkList(params) {
  return request({
    url: '/v1/master/worker/list',
    method: 'get',
    params
  })
}
