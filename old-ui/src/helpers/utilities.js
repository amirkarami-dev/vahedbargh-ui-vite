import InspectionDesEnum from "models/types/InspectionDesEnum"

export function getEnumByValue(obj, value) {
  if (obj instanceof Object) {
    const ent = Object.entries(obj).find(f => f[1].value === value)
    return { enum: ent[0], ...ent[1] }
  }

  return null
}

export function getEnumByEnum(obj, en) {
    if (obj instanceof Object) {
      const ent = Object.entries(obj).find(f => f[0] === en)
      return { enum: ent[0], ...ent[1] }
    }
  
    return null
  }

export function getEnums(obj) {
  if (obj instanceof Object) {
    return Object.entries(obj).map(ent => ({ enum: ent[0], ...ent[1] }))
  }
  return null
}

export function findEnumLabelWithValue(enumObj, value) {
  for (const key in enumObj) {
    if (enumObj.hasOwnProperty(key) && enumObj[key].value === value) {
      return enumObj[key].label;
    }
  }
  return null;
}

export function generateTreeChildren(data) {
  if(!(data && data.length > 0)) return []
  const treeChildren = {};

  // Group data by inspectionDesEnum
  data.forEach(item => {
      const { inspectionDesEnum, ...rest } = item;
      if (!treeChildren[inspectionDesEnum]) {
          treeChildren[inspectionDesEnum] = [];
      }
      
      treeChildren[inspectionDesEnum].push({inspectionDesEnum, ...rest});
  });

  // Convert the grouped data into tree structure
  const treeData = Object.keys(treeChildren).map(key => ({
      inspectionDesEnum: key + '-' + findEnumLabelWithValue(InspectionDesEnum,+key),
      key: +key,
      children: treeChildren[key].map(child => ({
          key: child.id.toString(),
          inspectionDesEnum: child.inspectionDesEnum,
          ...child
      }))
  }));

  return treeData;
}


export function generateTreeChildrenByGroupBy(data, groupBy,display) {
  if(!(data && data.length > 0)) return []
  const treeChildren = {};
  // Group data by inspectionDesEnum
  data.forEach(item => {
      const { [groupBy]:groupByValue, ...rest } = item;
      if (!treeChildren[groupByValue]) {
          treeChildren[groupByValue] = [];
      }
      
      treeChildren[groupByValue].push({groupByValue, ...rest});
  });

  // Convert the grouped data into tree structure
  const treeData = Object.keys(treeChildren).map(key => ({
      groupByValue: treeChildren[key][0][display],
      key: +key,
      children: treeChildren[key].map(child => ({
          key: child.id.toString(),
          groupByValue: child.groupByValue,
          ...child
      }))
  }));

  return treeData;
}

// تابع برای تبدیل اعداد فارسی به انگلیسی
export const persianToEnglishNumbers = (input) => {
  if (!input) return 0;
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let output = input;
  for (let i = 0; i < 10; i++) {
    output = output.replace(persianNumbers[i], englishNumbers[i]);
  }
  return +output;
};

// تابع برای تبدیل اعداد انگلیسی به فارسی
export const englishToPersianNumbers = (input) => {
  const englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  let output = input;
  for (let i = 0; i < 10; i++) {
    output = output.replace(englishNumbers[i], persianNumbers[i]);
  }
  return output;
};