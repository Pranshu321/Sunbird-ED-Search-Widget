import { styled } from 'styled-components';

const size = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '2560px',
};

export const SelectDiv = styled.div<{ filterarray: boolean }>`
  display: flex;
  align-items: center;
  padding: ${(props: any) => (props?.filterarray ? '4px 4px' : '8px 8px')};
  border-radius: 15px;
  width: 15rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: white;
  cursor: pointer;
  color: darkblue;
  @media (max-width: ${size.mobile}) {
    width: 10rem;
  }
`;

export const OptionsDiv = styled.div`
  flex-direction: column;
  position: absolute;
  margin-top: 4px;
  min-width: 15rem;
  max-width: max-content;
  color: darkblue;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 10rem;
  min-height: fit-content;
  border-radius: 10px;
  background: white;
  padding: 10px 10px;
  z-index: 999;
  @media (max-width: ${size.mobile}) {
    width: 10rem;
  }
`;

export const Text = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: darkblue;
  margin: 5px 5px;
`;

export const OptionTextDiv = styled.div<{ selectedflag: boolean }>`
  background-color: ${(props: any) =>
    props?.selectedflag ? '#dddddd' : 'white'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 3px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #f3f3f3;
  }
`;
