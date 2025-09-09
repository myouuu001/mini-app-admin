import request from '@/utils/request'

export function reqRoles(params) {
  return request({
    url: '/vadmin/auth/roles', // ?page=1&limit=10
    method: 'get',
    params
  })
}

export function deleteRole(data) {
  return request({
    url: '/vadmin/auth/roles',
    method: 'delete',
    data
  })
}

export function editRole(data) {
  return request({
    url: `/vadmin/auth/roles/${data.id}`,
    method: 'put',
    data
  })
}

export function reqEditRole(data) {
  return request({
    url: `/vadmin/auth/roles/${data.id}`,
    method: 'get',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/vadmin/auth/roles',
    method: 'post',
    data
  })
}

export function reqRoleTreeOptions() {
  return request({
    url: '/vadmin/auth/menus/role/tree/options',
    method: 'get'
  })
}

export function reqRoleUsers(params) {
  return request({
    url: 'vadmin/auth/users',
    method: 'get',
    params
  })
}

export function reqAuthUser(data) {
  return request({
    url: '/vadmin/auth/users',
    method: 'post',
    data
  })
}