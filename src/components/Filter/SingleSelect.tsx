import React, { useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import { SingleSelectProps } from '../../interfaces/interface';
import {
  OptionTextDiv,
  OptionsDiv,
  SelectDiv,
  Text,
} from '../styled-components/SelectElements';
import useState from 'react-usestateref';

export const SingleSelect = ({
  options,
  styles,
  optionName,
  Framework,
  setFramework,
  Reset,
  FiltersArray,
  setFiltersArray,
}: SingleSelectProps) => {
  const [show, setshow] = useState(false);
  const [selected, setSelected, selectedRef] = useState<string>('');
  useEffect(() => {
    setSelected('');
    setFramework('');
    Framework;
  }, [Reset]);
  function ClickFunction(option: string) {
    if (selectedRef.current === option) {
      setSelected('');
      setFramework('');
      const newArr = FiltersArray?.filter(item => {
        return item.name !== optionName;
      });
      setFiltersArray(newArr);
    } else {
      setSelected(option);
      setFramework(option);
      const newArr = FiltersArray?.filter(item => {
        return item.name !== optionName;
      });
      setFiltersArray([...newArr, { name: optionName, value: [option] }]);
    }
  }

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
          filterarray={selected !== ''}
          style={styles?.select}
          onClick={() => setshow(!show)}
        >
          {selected === '' ? (
            'Select'
          ) : (
            <Text style={styles?.OptionStyle}>{selectedRef.current}</Text>
          )}
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
                key={idx + 1}
                selectedflag={selectedRef.current === option}
                onClick={() => {
                  ClickFunction(option);
                  setshow(false);
                }}
              >
                <Text style={{ cursor: 'pointer', ...styles?.OptionsItem }}>
                  {option}
                </Text>
                {selectedRef.current === option && (
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
