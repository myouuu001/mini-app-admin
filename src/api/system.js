import request from '@/utils/request'

// tags api
export function platformTags(params) {
  return request({
    url: '/vadmin/platform/tags',
    method: 'get',
    params
  })
}

export function delPlatformTags(data) {
  return request({
    url: '/vadmin/platform/tags',
    method: 'delete',
    data
  })
}

export function addPlatformTags(data) {
  return request({
    url: '/vadmin/platform/tags',
    method: 'post',
    data
  })
}

export function editPlatformTags(data) {
  return request({
    url: '/vadmin/platform/tags',
    method: 'put',
    data
  })
}

// channel api

export function platformChannel(params) {
  return request({
    url: '/vadmin/platform/channels',
    method: 'get',
    params
  })
}

export function delPlatformChannel(data) {
  return request({
    url: '/vadmin/platform/channels',
    method: 'delete',
    data
  })
}

export function addPlatformChannel(data) {
  return request({
    url: '/vadmin/platform/channels',
    method: 'post',
    data
  })
}

export function editPlatformChannel(data) {
  return request({
    url: '/vadmin/platform/tags',
    method: 'put',
    data
  })
}

// product api vadmin/platform/products

export function platformProducts(params) {
  return request({
    url: '/vadmin/platform/products',
    method: 'get',
    params
  })
}

export function delPlatformProducts(data) {
  return request({
    url: '/vadmin/platform/products',
    method: 'delete',
    data
  })
}

export function addPlatformProducts(data) {
  return request({
    url: '/vadmin/platform/products',
    method: 'post',
    data
  })
}

export function editPlatformProducts(data) {
  return request({
    url: '/vadmin/platform/products',
    method: 'put',
    data
  })
}