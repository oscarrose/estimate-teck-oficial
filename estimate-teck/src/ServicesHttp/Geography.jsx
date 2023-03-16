import React, { useEffect, useState, useRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
import Geonames from 'geonames.js';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Spin, Button, message } from "antd";
const { Option } = Select;
const geonames = new Geonames({
  username: 'thalesandrade',
  lan: 'en',
  encoding: 'JSON',
});

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     minWidth: '100%',
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

export default function Geography(props) {
 // const classes = useStyles();
  const { locationTitle, geoId, onChange, isCountry } = props;
  const [options, setOptions] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    try {
      const data = async () => {
        (await isCountry)
          ? geonames.countryInfo({}).then((res) => {
              console.log(res);
              setOptions(res.geonames);
            })
          : geonames.children({ geonameId: geoId }).then((res) => {
              if (res.totalResultsCount) setOptions(res.geonames);
            });
      };
      data();
    } catch (err) {
      console.error(err);
    }
  }, [geoId, isCountry]);

  const inputLabel = useRef(null);

  const handleChange = (e) => {
    console.log(e)
    setCurrentItem(e)
    onChange(e)
    // setCurrentItem(e.target.value);
    // onChange(e.target.value);
  };

  return (
    <Form>
      <div className='flex flex-row '>
      <label id="demo-simple-select-outlined-label" ref={inputLabel}>
        {locationTitle}
      </label>
      
      <Select
      className='block appearance-none w-full bg-white border-none  hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={currentItem}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        <Option value="">
          <em>-</em>
        </Option>
        {options.map((v, index) => (
          <Option key={index} value={v.geonameId}>
            {isCountry ? v.countryName : v.name}
          </Option>
        ))}
      </Select>
      </div>
     
    </Form>
  );
}

Geography.propTypes = {
  locationTitle: PropTypes.string,
  geoId: PropTypes.node,
  isCountry: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

// Geography.defaultProps = {
//   onChange: undefined,
// };
