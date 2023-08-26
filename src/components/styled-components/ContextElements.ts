import { styled } from 'styled-components';

export const MainDiv = styled.div`
  display: flex;
  column-gap: 20px;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    justify-content: center;
    align-items: center;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 15px;
  background-color: #e9e8d9;
  color: black;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  position: absolute;
  left: 5px;
  top: 10px;
  width: 7rem;
  display: none;
  @media (max-width: 500px) {
    display: block;
  }
`;

export const FiltersDiv = styled.div<{ showfilter: boolean }>`
  height: max-content;
  position: relative;
  top: 10px;
  left: 10px;
  @media screen and (max-width: 500px) {
    display: ${(props: any) => (props?.showfilter ? 'none' : 'block')};
    position: absolute;
    top: 55px;
    left: 10px;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
`;

export const ResetButton = styled.button`
  border: none;
  color: black;
  font-size: 15px;
  font-weight: 700;
  position: relative;
  left: 104px;
  cursor: pointer;
  top: 10px;
  background: transparent;
`;
