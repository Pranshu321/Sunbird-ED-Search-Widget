import React from 'react';
import { styled } from 'styled-components';
import { FilterProps } from '../../interfaces/interface';

const MainDiv = styled.div`
  background: #e9e8d9;
  padding: 10px 20px;
  width: max-content;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const Filter = ({ children, stylesFilterDiv }: FilterProps) => {
  return <MainDiv style={stylesFilterDiv}>{children}</MainDiv>;
};
