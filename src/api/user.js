import request from '@/utils/request'

export function reqUserInfo() {
  return request({
    url: '/vadmin/auth/user/admin/current/info',
    method: 'get',
  })
}

export function getUsers(params) {
  return request({
    url: 'vadmin/auth/users',
    method: 'get',
    params
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function reqValidatUserID(data) {
  return request({
    url: '/user/validatUserID',
    method: 'post',
    data
  })
}

