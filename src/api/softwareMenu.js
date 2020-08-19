import request from '@/utils/request'

export function fetchList(parentId, params) {
  return request({
    url: '/software/list/' + parentId,
    method: 'get',
    params: params
  })
}

//上传图标
export function uploadIcon(data) {
  return request({
    url: '/software/uploadIcon',
    method: 'post',
    headers: {"Content-Type": "multipart/form-data"},
    data
  })
}

//软件菜单创建
export function softwareCreateMenu(menuName,imageUrl) {
  return request({
    url: '/software/create',
    method: 'post',
    data:{
      menuName,
      imageUrl
    }
  })
}

//软件菜单创建
export function softwareUpdateMenu(id,menuName,imageUrl) {
  return request({
    url: '/software/update',
    method: 'post',
    data:{
      id,
      menuName,
      imageUrl
    }
  })
}
//软件上传
export function uploadSoftware(parentId,menuName,imageUrl,downloadUrl) {
  return request({
    url: '/software/uploadSoftware',
    method: 'post',
    data:{
      parentId,
      menuName,
      imageUrl,
      downloadUrl
    }
  })
}
//删除菜单
export function deleteMenu(id) {
  return request({
    url: '/software/deleteMenu/'+id,
    method: 'get',
  })
}


//修改软件
export function updateSoftware(id,menuName,menuIconUrl,downloadUrl) {
  return request({
    url: '/software/updateSoftware',
    method: 'post',
    data:{
      id,
      menuName,
      menuIconUrl,
      downloadUrl
    }
  })
}

//修改软件
export function software(id,menuName,menuIconUrl,downloadUrl) {
  return request({
    url: '/software/updateSoftware',
    method: 'post',
    data:{
      id,
      menuName,
      menuIconUrl,
      downloadUrl
    }
  })
}



