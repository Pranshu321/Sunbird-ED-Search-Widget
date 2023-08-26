import React, { useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { SelectProps } from '../../interfaces/interface';
import {
  OptionTextDiv,
  OptionsDiv,
  SelectDiv,
  Text,
} from '../styled-components/SelectElements';

export const Select = ({
  options,
  styles,
  optionName,
  FiltersArray,
  setFiltersArray,
  Reset,
  ArrayNumber,
  setArrayNumber,
}: SelectProps) => {
  const [show, setshow] = useState(false);
  const [selected, setSelected] = useState<Array<string>>([]);

  const FilterAdd = (option: string) => {
    setSelected([...selected, option]);
    if (selected.indexOf(option) !== -1) {
      const newarr = selected.filter(item => {
        return item !== option;
      });
      setSelected(newarr);
    }
  };

  const FiltersArrayAddition = (optionname: string, option: string) => {
    if (CheckIfOptionPresentNew(optionname)) {
      FiltersArray?.map(item => {
        if (CheckIfOptionPresent(optionname, item)) {
          if (item.value.includes(option)) {
            const newarr = item.value;
            const indexofOption = item.value.indexOf(option);
            newarr.splice(indexofOption, 1);
            item.value = newarr;
            return;
          }
          if (!item.value.includes(option)) {
            let oldArr = item.value;
            oldArr.push(option);
            item.value = oldArr;
          }
        }
      });
    } else {
      setFiltersArray([...FiltersArray, { name: optionname, value: [option] }]);
    }
    setArrayNumber([...ArrayNumber, 2]);
  };

  function CheckIfOptionPresent(optionName: string, itemarg: any) {
    let flag = false;
    FiltersArray?.map(item => {
      if (item.name === optionName && item.name === itemarg.name) {
        flag = true;
      }
    });
    return flag;
  }
  function CheckIfOptionPresentNew(optionName: string) {
    let flag = false;
    FiltersArray?.map(item => {
      if (item.name === optionName) {
        flag = true;
      }
    });
    return flag;
  }

  useEffect(() => {
    setSelected([]);
  }, [Reset]);

  return (
    <div>
      <div style={styles?.container}>
        <h4
          style={{
            color: '#000000',
            marginBottom: '5px',
            fontWeight: '600',
            fontSize: '19px',
            ...styles?.OptionNameStyle,
          }}
        >
          {optionName}
        </h4>
        <SelectDiv
          filterarray={selected.length !== 0}
          style={styles?.select}
          onClick={() => setshow(!show)}
        >
          {selected.length === 0
            ? 'Select'
            : selected.map((item, idx) => (
                <Text style={styles?.OptionStyle} key={idx + 1}>
                  {item}
                </Text>
              ))}
        </SelectDiv>
        <div>
          <OptionsDiv
            style={{
              display: `${show ? 'flex' : 'none'}`,
              ...styles?.OptionDivStyle,
            }}
          >
            {options?.map((option, idx) => (
              <OptionTextDiv
                selectedflag={selected.indexOf(option) !== -1}
                key={idx + 1}
                onClick={() => {
                  FilterAdd(option);
                  FiltersArrayAddition(optionName, option);
                }}
              >
                <Text style={{ cursor: 'pointer', ...styles?.OptionsItem }}>
                  {option}
                </Text>
                {selected.indexOf(option) !== -1 && (
                  <TiTick color="green" size={25} />
                )}
              </OptionTextDiv>
            ))}
          </OptionsDiv>
        </div>
      </div>
    </div>
  );
};
