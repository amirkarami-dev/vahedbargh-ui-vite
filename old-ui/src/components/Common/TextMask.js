import React from "react"
import PropTypes from "prop-types"
import { IMaskInput } from 'react-imask';

export const TextMaskPhone = React.forwardRef(function TextMaskPhone(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#~000000000"
        definitions={{
          '#': /[0-0]/,
          '~' : /[9-9]/
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  TextMaskPhone.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };