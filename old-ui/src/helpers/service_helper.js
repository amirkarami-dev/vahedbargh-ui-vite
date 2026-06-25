import jwt_decode from "jwt-decode"

export const getParsedDate = (strDate) => {
  let strSplitDate = String(strDate).split(' ');
  let date = new Date(strSplitDate[0]);

  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!

  let yyyy = date.getFullYear();
  if (dd < 10) {
      dd = '0' + dd;
  }
  if (mm < 10) {
      mm = '0' + mm;
  }
  date =  dd + "-" + mm + "-" + yyyy;
  return date.toString();

}

export function upsertArray(array, element) {
  // (1)
  const i = array.findIndex(_element => _element.id === element.id)
  if (i > -1) array[i] = element
  // (2)
  else array.push(element)

  return array
}

export function getRoleUser() {
  const obj = JSON.parse(localStorage.getItem("authUser"))
  let roles = []

  if (obj) {
    let object = jwt_decode(obj.accessToken)
    if (object.role.constructor == Array) {
      return object.role
    } else {
      roles.push(object.role)
    }
  }
  return roles
}

export function getCurrentUser() {
  const obj = JSON.parse(localStorage.getItem("authUser"))
  if (obj) {
    let object = jwt_decode(obj.accessToken)
    return object
  }
}

export const arrayToTree = (items, id = null, link = "parent_id") =>
  items
    .filter(item => item[link] === id && item["title"] !== "")
    .map(item => ({ ...item, children: arrayToTree(items, item.id) }))

export const mapArrayOmit = (array, omit) => {
  const result = _.map(
    array,
    object => _.omit(object, omit) // return from _.omit
  )

  return arrayToTree(result)
}

export function getValueEnum(item, key) {
  const result = item.find(x => {
    if (x.key === key) return x
  })
  return result
}

export const getUserMenu = allRoutes => {
  const allRolesUser = getRoleUser()
  const result = allRoutes
    .filter(item => {
      if(!item.hide)
      return item.roles.find(z => {
        return allRolesUser.find(y => y == z)
      })
    })
    .map(o => {
      o = Object.assign({}, o)
      o.children = o.children.filter(item => {
        if(item)
        return item.roles.find(z => {
          return allRolesUser.find(y => y == z)
        })
      })
      return o
    })
  return result
}

export function currencyFormat(num) {
  if(num) return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " ریال"
  return 0
}

export const enumToArray = enumType => {
  return Object.entries(enumType)
    .filter(([key, value]) => typeof value === 'string')
    .map(([key, name]) => ({
      id: parseInt(key, 10),
      name
    }));
}

export const enumToArrayWithoutSort = (enumType) => {
  const result = [];
  
  // حلقه بر روی تمام کلیدهای enum
  for (const key in enumType) {
    // اگر مقدار متناظر با کلید، عدد باشد (یعنی مقدار اصلی enum، نه معکوس آن)
    if (typeof enumType[key] === 'number') {
      const id = enumType[key];
      const name = enumType[id]; // نام متناظر با عدد
      
      result.push({
        id,
        name
      });
    }
  }
  
  return result;
};


export const enumToArrayAnt = enumType => {
  let list = []
  Object.values(enumType).forEach((val, i) => {
    if (i === enumType[val]) list.push({ value: enumType[val], label: val })
  })
  return list
}

export const enumToArrayWithTranslate = (enumType, t) => {
  let list = []
  Object.values(enumType).forEach((val, i) => {
    if (i === enumType[val])
      list.push({ id: enumType[val], name: t(`public.${val}`) })
  })
  return list
}
export const downloadImage = async (e, fileName) => {
  e.preventDefault()
  const disableCache = true
  const fetchUrl = `${e.target.href}${
    disableCache ? `&dummy=${Math.floor(Date.now())}` : ""
  }`

  fetch(fetchUrl)
    .then(response => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
      })
    })
    .catch(error => {
      console.log(error)
      return error
    })
}
export const isDigit = num => {
  if (num.match(/^-?\d+$/)) {
    return true
  } else if (num.match(/^\d+\.\d+$/)) {
    return true
  } else {
    return false
  }
}
// state.lstChannels.map((channel,index) =>{
//           const isExist = false;
//           if(channel.id === action.payload.id)
//           {
//               console.log("maaaaap",channel);
//               channel = {channel,...action.payload}
//               return channel;
//           }
//           else{
//             return channel;
//           }
//         })

export function initReport(StiReport, data, localizations) {
  console.log("window.Stimulsoft.Base", window.Stimulsoft)
  if (window.Stimulsoft) {
    window.Stimulsoft.Base.StiLicense.Key =
      "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHn0s4gy0Fr5YoUZ9V00Y0igCSFQzwEqYBh/N77k4f0fWXTHW5rqeBNLkaurJDenJ9o97TyqHs9HfvINK18Uwzsc/bG01Rq+x3H3Rf+g7AY92gvWmp7VA2Uxa30Q97f61siWz2dE5kdBVcCnSFzC6awE74JzDcJMj8OuxplqB1CYcpoPcOjKy1PiATlC3UsBaLEXsok1xxtRMQ283r282tkh8XQitsxtTczAJBxijuJNfziYhci2jResWXK51ygOOEbVAxmpflujkJ8oEVHkOA/CjX6bGx05pNZ6oSIu9H8deF94MyqIwcdeirCe60GbIQByQtLimfxbIZnO35X3fs/94av0ODfELqrQEpLrpU6FNeHttvlMc5UVrT4K+8lPbqR8Hq0PFWmFrbVIYSi7tAVFMMe2D1C59NWyLu3AkrD3No7YhLVh7LV0Tttr/8FrcZ8xirBPcMZCIGrRIesrHxOsZH2V8t/t0GXCnLLAWX+TNvdNXkB8cF2y9ZXf1enI064yE5dwMs2fQ0yOUG/xornE"
    window.Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile(
      localizations,
      true
    )
    let report = new window.Stimulsoft.Report.StiReport()

    report.loadFile(StiReport)
    let options = new window.Stimulsoft.Viewer.StiViewerOptions()
    let viewer = new window.Stimulsoft.Viewer.StiViewer(
      options,
      "StiViewer",
      false
    )

    let dataSet = new window.Stimulsoft.System.Data.DataSet("Demo")
    const Demo = {
      Demo: data,
    }

    dataSet.readJson(Demo)
    report.dictionary.databases.clear()

    report.regData("Demo", "Demo", dataSet)
    var VData = report.dictionary.variables.getByName("VData")
    // Set variable value
    VData.value = "test"
    viewer.report = report
    viewer.stiRightToLeftType = true
    viewer.renderHtml("viewer")
  }
}

export function serializeQuery(obj) {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export function removeDuplicateObjects(array, property) {
  const uniqueIds = [];

  const unique = array.filter(element => {
    const isDuplicate = uniqueIds.includes(element[property]);

    if (!isDuplicate) {
      uniqueIds.push(element[property]);

      return true;
    }

    return false;
  });

  return unique;
}
export function getInspectionStatusEnum(x) {
  let statusEnum = 0
  switch (true) {
    case x<= 6:
      statusEnum = 1
      break;
      case x<= 10:
        statusEnum = 2
        break;
        case x<= 16:
          statusEnum = 3
          break;
          case x<= 25:
            statusEnum = 4
            break;
            case x<= 40:
              statusEnum = 5
              break;
              case x<= 65:
                statusEnum = 6
                break;
                case x<= 100:
                  statusEnum = 7
                  break;
                  case x<= 160:
                    statusEnum = 8
                    break;
  }
  return statusEnum
}