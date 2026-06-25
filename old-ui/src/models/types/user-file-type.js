'use strict'

/**
 * @enum UserFileType
 */
let UserFileType;
(function (userFileType) {
  userFileType.None = 0
  userFileType[0] = 'None'
  userFileType.IdCard = 1
  userFileType[1] = 'IdCard'
  userFileType.Certificate = 2
  userFileType[2] = 'Certificate'  
  userFileType.License = 3
  userFileType[3] = 'License'
  userFileType.Request = 4
  userFileType[4] = 'Request'
  userFileType.PicPersonal = 5
  userFileType[5] = 'PicPersonal'
  userFileType.Assign = 6
  userFileType[6] = 'Assign'
})(UserFileType || (UserFileType = {}))

export { UserFileType }
