import { Input, Tooltip } from 'antd';
const formatNumber = (value) => new Intl.NumberFormat().format(value);
export const NumericInput = (props) => {
  const { value,name, onChange , placeholder} = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
        onChange(e)
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (String(value).charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }

    onChange({ name, value: valueTemp.toString().replace(/0*(\d+)/, '$1') })

  };
  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
  ) : (
    'عدد قابل قبول است'
  );
  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input
        {...props}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={16}
        allowClear={true}
      />
    </Tooltip>
  );
};