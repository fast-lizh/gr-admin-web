import request from '@/utils/request'

export function fetchList(parentId) {
  return request({
    url: '/software/downloadList/' + parentId,
    method: 'get',
  })
}

export function getDownload(id) {
  return request({
    url: '/software/getDownload/' + id,
    method: 'get',
  })
}

