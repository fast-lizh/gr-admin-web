import request from '@/utils/request'

export function addArticle(title, html) {
  return request({
    url: '/file/release',
    method: 'post',
    data: {
      title,
      html
    }
  })
}

export function getFile(searchName,parentId) {
  return request({
    url: '/file/getFile/'+parentId,
    method: 'get',
    data: {
      searchName
    }
  })
}

export function addFile(parentId,fileName,content) {
  return request({
    url: '/file/addFile/',
    method: 'post',
    data: {
      parentId,
      fileName,
      content
    }
  })
}

export function getFileContent(fileId) {
  return request({
    url: '/file/getFileContent/'+fileId,
    method: 'post',
  })
}
